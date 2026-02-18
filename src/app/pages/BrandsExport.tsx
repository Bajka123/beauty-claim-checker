import { useLocation, useNavigate } from 'react-router';
import { Download, Copy, Check, ArrowLeft, Beaker, Users, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { evaluateClaim, resolveFormData } from '../utils/claimEvaluation';

export function BrandsExport() {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state || {};
  const [copied, setCopied] = useState(false);

  // Self-generate data: resolve formData (with demo fallback), then evaluate
  const formData = resolveFormData(locationState);
  const data = evaluateClaim(formData);

  const isStrongClaim = data.overallScore >= 75;

  const meterColor = (value: number, invert = false) => {
    if (invert) return value < 30 ? '#5CB85C' : value < 60 ? '#F0AD4E' : '#D9534F';
    return value > 70 ? '#5CB85C' : value > 40 ? '#F0AD4E' : '#D9534F';
  };

  const badgeStyle = {
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
  };

  const handleCopy = () => {
    const text = buildPlainTextReport();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  function buildPlainTextReport(): string {
    const lines: string[] = [];
    lines.push('CLAIM SUMMARY REPORT');
    lines.push('====================');
    lines.push('');
    lines.push('PRODUCT INFORMATION');
    lines.push(`Product Name: ${formData.productName}`);
    lines.push(`Category: ${formData.category}`);
    lines.push(`Target User: ${formData.targetUser}`);
    lines.push(`Region: ${formData.region}`);
    lines.push('');
    lines.push('CLAIM CHECKED');
    lines.push(`Claim Type: ${formData.claimType}`);
    lines.push(`Claim Statement: "${formData.claimStatement}"`);
    lines.push('');
    lines.push('STRENGTH ASSESSMENT');
    lines.push(`Overall Score: ${data.overallScore} / 100 — ${data.overallLevel}`);
    lines.push(`Evidence Strength: ${data.evidenceStrength}%`);
    lines.push(`Clarity: ${data.clarity}%`);
    lines.push(`Risk Level: ${data.riskLevel}%`);
    lines.push('');
    lines.push('EVIDENCE USED');
    if (formData.evidence?.instrumental) {
      lines.push(`• Instrumental Testing: ${formData.evidence.instrumentalMethod}`);
      lines.push(`  Duration: ${formData.evidence.instrumentalDuration}`);
      lines.push(`  Sample Size: ${formData.evidence.instrumentalSampleSize} participants`);
      if (formData.evidence.instrumentalResult) {
        lines.push(`  Result: ${formData.evidence.instrumentalResult}`);
      }
    }
    if (formData.evidence?.consumerStudy) {
      lines.push(`• Consumer Perception Study: ${formData.evidence.consumerSampleSize} participants`);
      if (formData.evidence.consumerQuestion) {
        lines.push(`  Finding: ${formData.evidence.consumerQuestion}`);
      }
    }
    if (formData.evidence?.dermatologistTested) {
      lines.push(`• Dermatologist Tested: ${formData.evidence.dermatologistCovers}`);
    }
    lines.push('');
    lines.push('INGREDIENTS');
    (formData.ingredients || []).forEach((ing: string) => lines.push(`• ${ing}`));
    lines.push('');
    lines.push('RISK & UNCERTAINTIES');
    data.whyScore.forEach((r) => lines.push(`• ${r}`));
    lines.push('');
    lines.push('RECOMMENDED NEXT STEPS');
    data.whatToAdd.forEach((s, i) => lines.push(`${i + 1}. ${s}`));
    lines.push('');
    lines.push(`Generated on ${new Date().toLocaleDateString()} — Beauty Claim Checker`);
    return lines.join('\n');
  }

  return (
    <PageTransition>
    <div className="py-12 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back link (hidden in print) */}
        <button
          onClick={() => navigate('/brands/results', { state: { formData } })}
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 transition-colors mb-6 print:hidden"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Results
        </button>

        {/* ─── Report Card ─── */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden print:shadow-none print:rounded-none">

          {/* Report Header */}
          <div className="px-10 pt-10 pb-8 border-b border-neutral-200">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-xs tracking-widest text-neutral-400 mb-3">CLAIM SUMMARY REPORT</p>
                <h1 className="text-3xl font-medium text-neutral-900 mb-1">
                  {formData.productName}
                </h1>
                <p className="text-neutral-500">{formData.category}</p>
              </div>
              <span
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={badgeStyle}
              >
                {data.overallLevel} Claim
              </span>
            </div>
            <div className="flex items-center gap-4 mt-4 text-sm text-neutral-500">
              <span>Target: {formData.targetUser}</span>
              <span className="text-neutral-300">|</span>
              <span>Region: {formData.region}</span>
              <span className="text-neutral-300">|</span>
              <span>Generated {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* ─── Section: Claim Checked ─── */}
          <div className="px-10 py-8 border-b border-neutral-100">
            <h2 className="text-xs tracking-widest text-neutral-400 mb-4">CLAIM CHECKED</h2>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-[#A8B5A0]/10 text-[#85957C] text-xs font-medium rounded-full">
                {formData.claimType}
              </span>
            </div>
            <div className="p-5 bg-neutral-50 rounded-xl">
              <p className="text-neutral-800 leading-relaxed italic">
                "{formData.claimStatement}"
              </p>
            </div>
          </div>

          {/* ─── Section: Strength Assessment ─── */}
          <div className="px-10 py-8 border-b border-neutral-100">
            <h2 className="text-xs tracking-widest text-neutral-400 mb-6">STRENGTH ASSESSMENT</h2>

            {/* Overall score */}
            <div className="flex items-center gap-5 mb-6 p-5 bg-neutral-50 rounded-xl">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-medium text-neutral-900">{data.overallScore}</span>
                <span className="text-lg text-neutral-500">/ 100</span>
              </div>
              <span
                className="px-4 py-1.5 rounded-full text-sm font-medium"
                style={badgeStyle}
              >
                {data.overallLevel}
              </span>
            </div>

            {/* Sub-meters */}
            <div className="grid grid-cols-3 gap-4">
              {/* Evidence Strength */}
              <div className="p-5 bg-neutral-50 rounded-xl">
                <p className="text-xs text-neutral-500 mb-2">Evidence Strength</p>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${data.evidenceStrength}%`, backgroundColor: meterColor(data.evidenceStrength) }}
                  />
                </div>
                <p className="text-lg font-medium text-neutral-900">{data.evidenceStrength}%</p>
              </div>

              {/* Clarity */}
              <div className="p-5 bg-neutral-50 rounded-xl">
                <p className="text-xs text-neutral-500 mb-2">Clarity</p>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${data.clarity}%`, backgroundColor: meterColor(data.clarity) }}
                  />
                </div>
                <p className="text-lg font-medium text-neutral-900">{data.clarity}%</p>
              </div>

              {/* Risk Level */}
              <div className="p-5 bg-neutral-50 rounded-xl">
                <p className="text-xs text-neutral-500 mb-2">Risk Level</p>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${data.riskLevel}%`, backgroundColor: meterColor(data.riskLevel, true) }}
                  />
                </div>
                <p className="text-lg font-medium text-neutral-900">{data.riskLevel}%</p>
              </div>
            </div>

            {/* Reasoning */}
            {data.reasoning && (
              <div className="mt-5 p-5 bg-neutral-50 rounded-xl">
                <p className="text-sm text-neutral-700 leading-relaxed">{data.reasoning}</p>
              </div>
            )}
          </div>

          {/* ─── Section: Evidence Used ─── */}
          <div className="px-10 py-8 border-b border-neutral-100">
            <h2 className="text-xs tracking-widest text-neutral-400 mb-5">EVIDENCE USED</h2>

            {(!formData.evidence?.instrumental && !formData.evidence?.consumerStudy && !formData.evidence?.dermatologistTested) ? (
              <div className="p-5 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm text-amber-900">No evidence provided. Claims without evidence are high risk.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Instrumental Testing */}
                {formData.evidence?.instrumental && (
                  <div className="p-5 bg-neutral-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-[#A8B5A0]/15 rounded-lg flex items-center justify-center">
                        <Beaker className="w-4 h-4 text-[#85957C]" />
                      </div>
                      <h3 className="font-medium text-neutral-900">Instrumental Testing</h3>
                      <Check className="w-4 h-4 text-[#85957C] ml-auto" />
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 ml-11 text-sm">
                      <div>
                        <span className="text-neutral-500">Method:</span>{' '}
                        <span className="text-neutral-800">{formData.evidence.instrumentalMethod}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500">Duration:</span>{' '}
                        <span className="text-neutral-800">{formData.evidence.instrumentalDuration}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500">Sample Size:</span>{' '}
                        <span className="text-neutral-800">{formData.evidence.instrumentalSampleSize} participants</span>
                      </div>
                      {formData.evidence.instrumentalResult && (
                        <div>
                          <span className="text-neutral-500">Result:</span>{' '}
                          <span className="text-neutral-800">{formData.evidence.instrumentalResult}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Consumer Perception Study */}
                {formData.evidence?.consumerStudy && (
                  <div className="p-5 bg-neutral-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-[#A8B5A0]/15 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-[#85957C]" />
                      </div>
                      <h3 className="font-medium text-neutral-900">Consumer Perception Study</h3>
                      <Check className="w-4 h-4 text-[#85957C] ml-auto" />
                    </div>
                    <div className="ml-11 text-sm space-y-1">
                      <div>
                        <span className="text-neutral-500">Sample Size:</span>{' '}
                        <span className="text-neutral-800">{formData.evidence.consumerSampleSize} participants</span>
                      </div>
                      {formData.evidence.consumerQuestion && (
                        <div>
                          <span className="text-neutral-500">Finding:</span>{' '}
                          <span className="text-neutral-800">{formData.evidence.consumerQuestion}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Dermatologist Tested */}
                {formData.evidence?.dermatologistTested && (
                  <div className="p-5 bg-neutral-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-[#A8B5A0]/15 rounded-lg flex items-center justify-center">
                        <Stethoscope className="w-4 h-4 text-[#85957C]" />
                      </div>
                      <h3 className="font-medium text-neutral-900">Dermatologist Tested</h3>
                      <Check className="w-4 h-4 text-[#85957C] ml-auto" />
                    </div>
                    <div className="ml-11 text-sm">
                      <span className="text-neutral-500">Covers:</span>{' '}
                      <span className="text-neutral-800">{formData.evidence.dermatologistCovers}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ─── Section: Ingredients ─── */}
          {formData.ingredients && formData.ingredients.length > 0 && (
            <div className="px-10 py-8 border-b border-neutral-100">
              <h2 className="text-xs tracking-widest text-neutral-400 mb-4">INGREDIENTS</h2>
              <div className="flex flex-wrap gap-2">
                {formData.ingredients.map((ingredient: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-neutral-50 text-neutral-700 rounded-full text-sm border border-neutral-200"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ─── Section: Usage Context ─── */}
          {formData.context && formData.context.length > 0 && (
            <div className="px-10 py-8 border-b border-neutral-100">
              <h2 className="text-xs tracking-widest text-neutral-400 mb-4">USAGE CONTEXT</h2>
              <div className="flex flex-wrap gap-2">
                {formData.context.map((ctx: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-neutral-50 text-neutral-700 rounded-full text-sm border border-neutral-200"
                  >
                    {ctx}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ─── Section: Risk & Uncertainties ─── */}
          <div className="px-10 py-8 border-b border-neutral-100">
            <h2 className="text-xs tracking-widest text-neutral-400 mb-5">RISK & UNCERTAINTIES</h2>
            <div className="space-y-2">
              {isStrongClaim ? (
                // Strong claims: show positive assessment instead of generic warnings
                <div className="space-y-2">
                  {data.whyScore.map((reason, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-green-900 leading-relaxed">{reason}</p>
                    </div>
                  ))}
                </div>
              ) : (
                data.whyScore.map((reason, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <p className="text-sm text-red-900 leading-relaxed">{reason}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ─── Section: Recommended Next Steps ─── */}
          <div className="px-10 py-8">
            <h2 className="text-xs tracking-widest text-neutral-400 mb-5">RECOMMENDED NEXT STEPS</h2>
            <div className="space-y-2">
              {data.whatToAdd.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-5 h-5 bg-blue-200 text-blue-900 rounded flex items-center justify-center flex-shrink-0 text-xs font-medium">
                    {index + 1}
                  </div>
                  <p className="text-sm text-blue-900 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer disclaimer */}
        <div className="mt-6 px-4 text-center">
          <p className="text-xs text-neutral-400 leading-relaxed">
            This report is generated by Beauty Claim Checker for decision-support purposes.
            It does not replace legal counsel or regulatory review. Always verify compliance with applicable regulations.
          </p>
        </div>

        {/* Action Buttons (hidden in print) */}
        <div className="flex items-center gap-4 mt-8 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            Print / Save PDF
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-50 transition-colors border-2 border-neutral-200"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Summary
              </>
            )}
          </button>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}