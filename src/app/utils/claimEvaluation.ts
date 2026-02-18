// Shared claim evaluation logic used by BrandsResults, BrandsExport, and BrandsStart

export const HYDRAFULL_DEMO_DATA = {
  category: 'Lip Tint',
  productName: 'HydraFull Lip Tint',
  targetUser: 'Everyday makeup users',
  region: 'EU',
  claimType: 'Hydration',
  claimStatement: 'Hydrates lips for up to 8 hours and helps reduce dryness.',
  ingredients: ['Glycerin', 'Shea Butter', 'Palmitoyl Tripeptide-1'],
  noFragrance: false,
  fragrancePresent: false,
  evidence: {
    instrumental: true,
    instrumentalMethod: 'Corneometer hydration',
    instrumentalDuration: '8 hours',
    instrumentalSampleSize: '32',
    instrumentalResult: '+28% hydration increase vs baseline',
    consumerStudy: true,
    consumerSampleSize: '60',
    consumerQuestion: '84% agreed lips felt hydrated after 8 hours',
    dermatologistTested: true,
    dermatologistCovers: 'Irritation / safety'
  },
  context: ['Website PDP', 'Packaging']
};

export interface EvaluationResult {
  overallScore: number;
  overallLevel: string;
  overallColor: string;
  evidenceStrength: number;
  clarity: number;
  riskLevel: number;
  reasoning: string;
  whyScore: string[];
  whatToAdd: string[];
  safeWording: string;
  confidentWording: string;
  riskyWording: string;
}

export function evaluateClaim(formData: any): EvaluationResult {
  let evidenceScore = 0;
  let clarityScore = 0;
  let riskScore = 0;
  
  // Extract data
  const hasInstrumental = formData?.evidence?.instrumental || false;
  const instrumentalMethod = formData?.evidence?.instrumentalMethod || '';
  const sampleSize = parseInt(formData?.evidence?.instrumentalSampleSize || '0');
  const duration = formData?.evidence?.instrumentalDuration || '';
  const hasConsumerStudy = formData?.evidence?.consumerStudy || false;
  const consumerSampleSize = parseInt(formData?.evidence?.consumerSampleSize || '0');
  const hasDermatologist = formData?.evidence?.dermatologistTested || false;
  const claimStatement = formData?.claimStatement?.toLowerCase() || '';
  const claimType = formData?.claimType?.toLowerCase() || '';
  
  // EVIDENCE STRENGTH CALCULATION (0-100)
  
  if (hasInstrumental) {
    evidenceScore += 50;
    
    if (sampleSize >= 30) {
      evidenceScore += 20;
    } else if (sampleSize >= 20) {
      evidenceScore += 15;
    } else if (sampleSize >= 10) {
      evidenceScore += 8;
    }
    
    if (duration.includes('8') || duration.includes('hour')) {
      evidenceScore += 10;
    }
  } else {
    if (claimType === 'plumping' || claimType === 'smoothing' || claimStatement.includes('reduce')) {
      evidenceScore = 10;
    } else {
      evidenceScore = 25;
    }
  }
  
  if (hasConsumerStudy) {
    if (consumerSampleSize >= 50) {
      evidenceScore += 10;
    } else if (consumerSampleSize >= 30) {
      evidenceScore += 7;
    } else if (consumerSampleSize >= 20) {
      evidenceScore += 4;
    } else {
      evidenceScore += 2;
    }
  }
  
  if (hasDermatologist) {
    evidenceScore += 5;
  }
  
  evidenceScore = Math.min(evidenceScore, 100);
  
  // CLARITY SCORE (0-100)
  
  clarityScore = 50;
  
  if (duration.includes('hour') || claimStatement.includes('up to')) {
    clarityScore += 20;
  }
  
  if ((claimType === 'hydration' && instrumentalMethod.includes('Corneometer')) ||
      (claimType === 'plumping' && instrumentalMethod.includes('3D Imaging'))) {
    clarityScore += 15;
  }
  
  if (claimStatement.includes('may') || claimStatement.includes('helps')) {
    clarityScore += 10;
  }
  
  clarityScore = Math.min(clarityScore, 100);
  
  // RISK LEVEL CALCULATION (0-100, higher = more risky)
  
  riskScore = 30;
  
  const exaggeratedWords = ['dramatically', 'instantly', 'guaranteed', 'eliminates', 'removes', 'erases'];
  const hasExaggeration = exaggeratedWords.some(word => claimStatement.includes(word));
  
  if (hasExaggeration) {
    riskScore += 30;
  }
  
  if ((claimStatement.includes('reduce') || claimStatement.includes('plump') || 
       claimStatement.includes('fine lines') || claimStatement.includes('volume')) && !hasInstrumental) {
    riskScore += 35;
  }
  
  if (hasInstrumental && sampleSize < 20) {
    riskScore += 15;
  }
  
  if (!hasInstrumental && (claimType === 'plumping' || claimType === 'smoothing')) {
    riskScore += 20;
  }
  
  if (hasInstrumental && sampleSize >= 30) {
    riskScore -= 25;
  }
  
  if (hasDermatologist) {
    riskScore -= 10;
  }
  
  if (claimStatement.includes('helps') || claimStatement.includes('may')) {
    riskScore -= 15;
  }
  
  riskScore = Math.max(0, Math.min(riskScore, 100));
  
  // OVERALL SCORE (weighted average)
  const overallScore = Math.round(
    (evidenceScore * 0.5) + 
    (clarityScore * 0.3) + 
    ((100 - riskScore) * 0.2)
  );
  
  // Determine color and level
  let overallColor = 'red';
  let overallLevel = 'Weak / Risky';
  
  if (overallScore >= 75) {
    overallColor = 'green';
    overallLevel = 'Strong';
  } else if (overallScore >= 50) {
    overallColor = 'amber';
    overallLevel = 'Moderate';
  }
  
  // Generate reasoning
  let reasoning = '';
  let whyScore: string[] = [];
  let whatToAdd: string[] = [];
  let safeWording = '';
  let confidentWording = '';
  let riskyWording = '';
  
  if (overallScore >= 75) {
    reasoning = `This claim is supported by instrumental ${instrumentalMethod.toLowerCase()} testing on ${sampleSize} participants over ${duration}. The study includes a defined sample size and measurable outcome. ${hasDermatologist ? 'Dermatologist testing adds credibility for safety.' : ''} ${hasConsumerStudy ? 'Consumer perception data strengthens user experience validation.' : ''} The wording matches the available evidence.`;
    
    whyScore = [
      `Instrumental testing (${instrumentalMethod}) with ${sampleSize} participants confirms the ${claimType} claim`,
      `Duration clearly defined (${duration}) and supported by objective measurement data`,
      `Ingredients align with ${claimType} function`,
      hasDermatologist ? 'Dermatologist testing confirms safety—correctly positioned as safety evidence, not performance proof' : 'Well-structured evidence hierarchy'
    ];
    
    whatToAdd = [
      'Optional: Add specific test conditions or methodology in fine print for full transparency'
    ];
    
    safeWording = `Helps keep lips feeling ${claimType === 'hydration' ? 'hydrated' : 'fuller'} for up to ${duration}.`;
    confidentWording = `Clinically measured ${claimType} for up to ${duration}.`;
    riskyWording = `Guarantees ${duration} ${claimType} for all skin types.`;
    
  } else {
    const issues: string[] = [];
    
    if (!hasInstrumental) {
      issues.push('no instrumental measurement');
    }
    if (hasExaggeration) {
      issues.push('strong wording such as "dramatically" or "reduces fine lines"');
    }
    if (consumerSampleSize < 20) {
      issues.push(`small consumer study sample size (${consumerSampleSize} participants)`);
    }
    
    reasoning = `This claim uses ${issues.join(', but there is ')}. ${!hasInstrumental ? 'There is no objective proof of volume change or performance metrics.' : 'The evidence base is limited.'} The claim wording ${hasExaggeration ? 'overstates' : 'exceeds'} the available evidence.`;
    
    whyScore = [
      hasExaggeration ? 'This claim uses strong wording such as "dramatically" and "reduces fine lines", but there is no instrumental volume measurement.' : 'Performance claim with no objective measurement',
      consumerSampleSize < 20 ? `The consumer study sample size is small (only ${consumerSampleSize} participants) and only reflects perception, not measurable change.` : 'Consumer perception alone is insufficient for performance claims',
      'There is no objective proof of volume change or wrinkle reduction.',
      'The claim wording overstates the available evidence.'
    ];
    
    whatToAdd = [
      !hasInstrumental ? `Add instrumental ${claimType === 'plumping' ? 'volume' : claimType} measurement (e.g., ${claimType === 'plumping' ? '3D imaging' : 'corneometer'})` : '',
      consumerSampleSize < 30 ? 'Increase consumer study sample size to at least 30 participants' : '',
      hasExaggeration ? 'Remove absolute language like "dramatically" and "reduces fine lines" without clinical proof' : '',
      claimStatement.includes('fine lines') ? 'Consider testing wrinkle depth if claiming anti-aging benefits' : 'Match wording strength to evidence strength'
    ].filter(Boolean);
    
    safeWording = claimType === 'plumping' 
      ? 'Provides a tingling sensation that may create a temporary fuller appearance.'
      : `Helps moisturize lips.`;
    
    confidentWording = claimType === 'plumping'
      ? 'Creates a plumping sensation with a refreshing tingle.'
      : `Leaves lips feeling hydrated.`;
    
    riskyWording = formData?.claimStatement || 'Performance claims without measurement';
  }
  
  return {
    overallScore,
    overallLevel,
    overallColor,
    evidenceStrength: evidenceScore,
    clarity: clarityScore,
    riskLevel: riskScore,
    reasoning,
    whyScore,
    whatToAdd,
    safeWording,
    confidentWording,
    riskyWording
  };
}

/** Helper to resolve formData: use navigation state if valid, otherwise fall back to demo */
export function resolveFormData(locationState: any): any {
  return (locationState?.formData && locationState.formData.productName)
    ? locationState.formData
    : HYDRAFULL_DEMO_DATA;
}
