import { useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Lightbulb, FileText, XCircle } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { evaluateClaim, resolveFormData } from '../utils/claimEvaluation';

export function BrandsResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state || {};

  // Use formData from navigation state; fall back to demo data if missing
  const formData = resolveFormData(locationState);

  // Dynamically evaluate the claim based on form data
  const data = evaluateClaim(formData);
  
  const isStrongClaim = data.overallScore >= 75;

  // Animated meter values — start at 0 and animate to real values
  const [animatedOverall, setAnimatedOverall] = useState(0);
  const [animatedEvidence, setAnimatedEvidence] = useState(0);
  const [animatedClarity, setAnimatedClarity] = useState(0);
  const [animatedRisk, setAnimatedRisk] = useState(0);
  const [animatedScoreNum, setAnimatedScoreNum] = useState(0);

  useEffect(() => {
    // Small delay to ensure the page transition has started,
    // then animate meters from 0 to real values
    const timer = setTimeout(() => {
      setAnimatedOverall(data.overallScore);
      setAnimatedEvidence(data.evidenceStrength);
      setAnimatedClarity(data.clarity);
      setAnimatedRisk(data.riskLevel);
    }, 150);
    return () => clearTimeout(timer);
  }, [data.overallScore, data.evidenceStrength, data.clarity, data.riskLevel]);

  // Animate the numeric score counter
  useEffect(() => {
    if (animatedOverall === 0) return;
    const duration = 700;
    const startTime = performance.now();
    const target = data.overallScore;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScoreNum(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [animatedOverall, data.overallScore]);

  const handleExport = () => {
    navigate('/brands/export', { state: { formData, data } });
  };

  const handleEdit = () => {
    navigate('/brands/builder', { state: { prefilledData: formData } });
  };

  return (
    <PageTransition>
    <div className="py-12 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-medium text-neutral-900 mb-3">
            Claim Evaluation Results
          </h1>
          <p className="text-lg text-neutral-600">
            {formData?.productName || 'Your Product'}
          </p>
        </div>

        <div className="space-y-6">
          {/* Overall Claim Strength Meter */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-medium text-neutral-900 mb-6">
              Claim Strength Meter
            </h2>

            {/* Main Meter */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-neutral-500 mb-3">
                <span>Weak</span>
                <span>Moderate</span>
                <span>Strong</span>
              </div>
              <div className="h-4 bg-neutral-100 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full rounded-full"
                  style={{ 
                    width: `${animatedOverall}%`,
                    transition: 'width 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                    background: data.overallColor === 'green'
                      ? 'linear-gradient(to right, #5CB85C, #4A9E4A)'
                      : data.overallColor === 'red'
                      ? 'linear-gradient(to right, #D9534F, #C9302C)'
                      : 'linear-gradient(to right, #F0AD4E, #EC971F)'
                  }}
                />
              </div>
              <div className="flex items-center justify-center gap-3 py-4 px-6 bg-neutral-50 rounded-xl">
                <span className="text-3xl font-medium text-neutral-900">{animatedScoreNum}</span>
                <span className="text-lg text-neutral-600">/ 100</span>
                <span
                  className="ml-2 px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: data.overallColor === 'green'
                      ? '#d4edda'
                      : data.overallColor === 'red'
                      ? '#f8d7da'
                      : '#fff3cd',
                    color: data.overallColor === 'green'
                      ? '#155724'
                      : data.overallColor === 'red'
                      ? '#721c24'
                      : '#856404'
                  }}
                >
                  {data.overallLevel}
                </span>
              </div>
            </div>

            {/* Sub-meters */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-5 bg-neutral-50 rounded-xl">
                <p className="text-xs text-neutral-600 mb-2">Evidence Strength</p>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full"
                    style={{ 
                      width: `${animatedEvidence}%`,
                      transition: 'width 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                      backgroundColor: data.evidenceStrength > 70 ? '#5CB85C' : data.evidenceStrength > 40 ? '#F0AD4E' : '#D9534F'
                    }}
                  />
                </div>
                <p className="text-lg font-medium text-neutral-900">{data.evidenceStrength}%</p>
              </div>

              <div className="p-5 bg-neutral-50 rounded-xl">
                <p className="text-xs text-neutral-600 mb-2">Clarity</p>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full"
                    style={{ 
                      width: `${animatedClarity}%`,
                      transition: 'width 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                      backgroundColor: data.clarity > 70 ? '#5CB85C' : data.clarity > 40 ? '#F0AD4E' : '#D9534F'
                    }}
                  />
                </div>
                <p className="text-lg font-medium text-neutral-900">{data.clarity}%</p>
              </div>

              <div className="p-5 bg-neutral-50 rounded-xl">
                <p className="text-xs text-neutral-600 mb-2">Risk Level</p>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full"
                    style={{ 
                      width: `${animatedRisk}%`,
                      transition: 'width 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                      backgroundColor: data.riskLevel < 30 ? '#5CB85C' : data.riskLevel < 60 ? '#F0AD4E' : '#D9534F'
                    }}
                  />
                </div>
                <p className="text-lg font-medium text-neutral-900">{data.riskLevel}%</p>
              </div>
            </div>
          </div>

          {/* Suggested Wording */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-medium text-neutral-900 mb-6">
              Suggested Wording
            </h2>

            <div className="space-y-4">
              {/* Safe Wording */}
              <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-700 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-green-900 mb-1">Safe Wording</h3>
                    <p className="text-sm text-green-700 leading-relaxed">
                      {data.safeWording}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-green-600 ml-8">
                  ✓ Lowest risk, aligns with current evidence
                </p>
              </div>

              {/* Confident Wording */}
              <div className={`p-6 rounded-xl border-2 ${
                isStrongClaim ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'
              }`}>
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    isStrongClaim ? 'text-blue-700' : 'text-amber-700'
                  }`} />
                  <div className="flex-1">
                    <h3 className={`font-medium mb-1 ${
                      isStrongClaim ? 'text-blue-900' : 'text-amber-900'
                    }`}>
                      Confident Wording
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      isStrongClaim ? 'text-blue-700' : 'text-amber-700'
                    }`}>
                      {data.confidentWording}
                    </p>
                  </div>
                </div>
                <p className={`text-xs ml-8 ${
                  isStrongClaim ? 'text-blue-600' : 'text-amber-600'
                }`}>
                  {isStrongClaim 
                    ? '✓ Use only if you have instrumental testing' 
                    : '⚠ Requires more evidence for full confidence'
                  }
                </p>
              </div>

              {/* Risky Wording */}
              <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200 opacity-60">
                <div className="flex items-start gap-3 mb-3">
                  <XCircle className="w-5 h-5 text-red-700 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-red-900 mb-1">Risky Wording</h3>
                    <p className="text-sm text-red-700 leading-relaxed line-through">
                      {data.riskyWording}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-red-600 ml-8">
                  ✗ Not recommended without additional clinical evidence
                </p>
              </div>
            </div>
          </div>

          {/* Why This Score */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-[#85957C]" />
              <h2 className="text-xl font-medium text-neutral-900">
                Why This Score
              </h2>
            </div>
            <ul className="space-y-3">
              {data.whyScore.map((reason, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2" />
                  <p className="text-sm text-neutral-700 leading-relaxed">{reason}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* What to Add */}
          <div className="bg-gradient-to-br from-[#A8B5A0]/10 to-[#E8C5C0]/10 rounded-2xl p-8 border border-[#A8B5A0]/20">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-5 h-5 text-[#85957C]" />
              <h2 className="text-xl font-medium text-neutral-900">
                What to Add to Strengthen the Claim
              </h2>
            </div>
            <ul className="space-y-3">
              {data.whatToAdd.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-[#85957C]">{index + 1}</span>
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* EU Compliance Note */}
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
            <p className="text-sm text-blue-900">
              <span className="font-medium">EU Claim Compliance Reminder:</span> This evaluation is based on general 
              best practices. Always verify compliance with specific EU cosmetics regulations for your market.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleExport}
              className="flex-1 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
            >
              Export Summary
            </button>
            <button
              onClick={handleEdit}
              className="flex-1 py-4 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-50 transition-colors border-2 border-neutral-200"
            >
              Edit Claim
            </button>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}