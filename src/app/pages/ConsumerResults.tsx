import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { Shield, Droplet, BarChart3, Lightbulb, AlertCircle, Check, X, ArrowLeft } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

export function ConsumerResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { productKey, searchTerm, sensitiveMode } = location.state || {};
  const [activeTab, setActiveTab] = useState<'claims' | 'ingredients' | 'marketing'>('claims');

  // Rhode Peptide Lip Tint Data
  const productData = {
    name: searchTerm || 'rhode Peptide Lip Tint',
    brand: 'rhode',
    claims: ['Hydration', 'Plumping', 'Fine line smoothing', 'Gloss finish', 'Dermatologist tested'],
    transparencyScore: 60,
    transparencyLevel: 'Medium',
    claimEvaluations: [
      {
        claim: 'Hydration',
        level: 'Moderate to Strong',
        color: 'green',
        score: 75,
        explanation: 'Likely supported by ingredient properties and consumer feedback'
      },
      {
        claim: 'Plumping over time',
        level: 'Low to Moderate',
        color: 'amber',
        score: 45,
        explanation: 'Limited visible study details available'
      },
      {
        claim: 'Fine line smoothing',
        level: 'Moderate (cosmetic)',
        color: 'amber',
        score: 50,
        explanation: 'Temporary cosmetic effect, not structural change'
      },
      {
        claim: 'Dermatologist tested',
        level: 'Safety only',
        color: 'blue',
        score: 60,
        explanation: 'Testing focused on irritation/safety, not performance claims'
      }
    ],
    ingredients: [
      {
        name: 'Palmitoyl Tripeptide-1',
        category: 'Peptide',
        supports: 'Plumping',
        useful: true,
        description: 'A real cosmetic peptide used for conditioning and smoothing.',
        detail: 'It can support a smoother look, but dramatic volume changes are not guaranteed without disclosed performance testing.'
      },
      {
        name: 'Hyaluronic Acid',
        category: 'Humectant',
        supports: 'Hydration',
        useful: true,
        description: 'Clinically proven to retain moisture.',
        detail: 'Helps keep lips hydrated and plump-looking by attracting water.'
      }
    ],
    evidenceTypes: [
      { type: 'Ingredient-based', present: true },
      { type: 'Consumer perception study', present: true },
      { type: 'Clinical study', present: false }
    ]
  };

  return (
    <PageTransition>
    <div className="py-12 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back to search */}
        <button
          onClick={() => navigate('/consumer/search')}
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </button>

        {/* Product Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <div className="mb-6">
            <p className="text-sm text-neutral-500 mb-1">Product</p>
            <h1 className="text-3xl font-medium text-neutral-900 mb-1">
              {productData.name}
            </h1>
            <p className="text-neutral-600">by {productData.brand}</p>
          </div>

          {/* Claim Overview Chips */}
          <div className="flex flex-wrap gap-2">
            {productData.claims.map((claim, index) => (
              <span
                key={index}
                className="px-4 py-1.5 bg-[#E8C5C0]/20 text-[#C89A94] rounded-full text-sm font-medium"
              >
                {claim}
              </span>
            ))}
          </div>
        </div>

        {/* Overall Transparency Score */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#A8B5A0]/10 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#85957C]" />
            </div>
            <h2 className="text-xl font-medium text-neutral-900">
              Overall Transparency Score
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-4 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#E8C5C0] to-[#A8B5A0] rounded-full"
                  style={{ width: `${productData.transparencyScore}%` }}
                />
              </div>
              <span className="text-2xl font-medium text-[#85957C] min-w-[100px] text-right">
                {productData.transparencyLevel}
              </span>
            </div>
            <div className="flex gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-[#E8C5C0] rounded" />
                <span className="text-neutral-600">Low</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-[#D4B896] rounded" />
                <span className="text-neutral-600">Medium</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-[#A8B5A0] rounded" />
                <span className="text-neutral-600">High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl shadow-sm">
          <div className="flex border-b border-neutral-200">
            <button
              onClick={() => setActiveTab('claims')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'claims'
                  ? 'text-neutral-900 border-b-2 border-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Claim Check
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'ingredients'
                  ? 'text-neutral-900 border-b-2 border-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Ingredient Insights
            </button>
            <button
              onClick={() => setActiveTab('marketing')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'marketing'
                  ? 'text-neutral-900 border-b-2 border-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Marketing vs Measurable
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-2xl p-8 shadow-sm mb-6">
          {/* Claim Check Tab */}
          {activeTab === 'claims' && (
            <div className="space-y-6">
              {/* Claim Meters */}
              {productData.claimEvaluations.map((evaluation, index) => (
                <div key={index} className="p-6 bg-neutral-50 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-medium text-neutral-900">{evaluation.claim}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        evaluation.color === 'green'
                          ? 'bg-green-100 text-green-900'
                          : evaluation.color === 'amber'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {evaluation.level}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          evaluation.color === 'green'
                            ? 'bg-green-500'
                            : evaluation.color === 'amber'
                            ? 'bg-amber-500'
                            : 'bg-blue-500'
                        }`}
                        style={{ width: `${evaluation.score}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {evaluation.explanation}
                  </p>
                </div>
              ))}

              {/* Type of Evidence */}
              <div className="mt-8 p-6 bg-white rounded-xl border border-neutral-200">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-5 h-5 text-[#85957C]" />
                  <h3 className="font-medium text-neutral-900">Type of Evidence Used</h3>
                </div>
                <div className="space-y-3">
                  {productData.evidenceTypes.map((evidence, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-xl ${
                        evidence.present
                          ? 'bg-[#A8B5A0]/5 border border-[#A8B5A0]/20'
                          : 'bg-neutral-50'
                      }`}
                    >
                      <span className="text-sm font-medium text-neutral-700">{evidence.type}</span>
                      <div className="flex items-center gap-2">
                        {evidence.present ? (
                          <>
                            <Check className="w-4 h-4 text-[#85957C]" />
                            <span className="text-sm font-medium text-[#85957C]">Present</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 text-neutral-400" />
                            <span className="text-sm font-medium text-neutral-500">Not disclosed</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Ingredient Insights Tab */}
          {activeTab === 'ingredients' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Droplet className="w-5 h-5 text-[#85957C]" />
                <h3 className="text-lg font-medium text-neutral-900">
                  Ingredients Linked to Claims
                </h3>
              </div>

              {productData.ingredients.map((ingredient, index) => (
                <div key={index} className="p-6 bg-neutral-50 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-1">{ingredient.name}</h4>
                      <p className="text-xs text-neutral-500">{ingredient.category}</p>
                    </div>
                    <span className="px-3 py-1 bg-[#A8B5A0]/10 text-[#85957C] text-xs font-medium rounded-full">
                      {ingredient.supports}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-700 mb-2 leading-relaxed">
                    {ingredient.description}
                  </p>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {ingredient.detail}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Marketing vs Measurable Tab */}
          {activeTab === 'marketing' && (
            <div className="space-y-6">
              {/* Is this claim exaggerated? */}
              <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-700 mt-0.5" />
                  <h3 className="font-medium text-red-900">Is this claim exaggerated?</h3>
                </div>
                <p className="text-sm text-red-800 leading-relaxed">
                  Hydration and nourishment sound realistic for a buttery lip formula.
                  <br /><br />
                  "Visibly plumps over time" is a stronger promise, but no visible study details are shown, 
                  so it's less supported.
                </p>
              </div>

              {/* Is this ingredient actually useful? */}
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3 mb-3">
                  <Droplet className="w-5 h-5 text-blue-700 mt-0.5" />
                  <h3 className="font-medium text-blue-900">Is this ingredient actually useful?</h3>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Palmitoyl Tripeptide-1 is a real cosmetic peptide used for conditioning and smoothing.
                  <br /><br />
                  It can support a smoother look, but dramatic volume changes are not guaranteed without 
                  disclosed performance testing.
                </p>
              </div>

              {/* Is this just marketing wording? */}
              <div className="p-6 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-start gap-3 mb-3">
                  <Lightbulb className="w-5 h-5 text-amber-700 mt-0.5" />
                  <h3 className="font-medium text-amber-900">Is this just marketing wording?</h3>
                </div>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Phrases like "nourishing glaze," "pillowy-soft," and "jam-like look" are sensory language.
                  <br /><br />
                  They describe feel and finish, not measured results.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Plain Language Summary */}
        <div className="bg-gradient-to-br from-[#A8B5A0]/10 to-[#E8C5C0]/10 rounded-2xl p-8 border border-[#A8B5A0]/20">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-[#85957C]" />
            <h3 className="text-lg font-medium text-neutral-900">
              Plain Language Summary
            </h3>
          </div>
          <div className="space-y-3 text-sm text-neutral-700 leading-relaxed">
            <p>
              This product likely moisturizes well and feels glossy.
            </p>
            <p>
              The "plumping over time" promise is harder to verify because the site does not show 
              clear performance testing details.
            </p>
            <div className="pt-4 mt-4 border-t border-neutral-200">
              <p className="text-xs text-neutral-600">
                <span className="font-medium">Note:</span> This evaluation is based on publicly available 
                information. Brands may have additional internal testing data not disclosed in marketing materials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}