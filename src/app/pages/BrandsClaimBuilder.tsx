import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ChevronDown, X, Info, Check } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../components/ui/tooltip';
import { PageTransition } from '../components/PageTransition';

const DEFAULT_FORM_DATA = {
  category: '',
  productName: '',
  targetUser: '',
  region: 'EU',
  claimType: '',
  claimStatement: '',
  ingredients: [] as string[],
  noFragrance: false,
  fragrancePresent: false,
  evidence: {} as any,
  context: [] as string[]
};

export function BrandsClaimBuilder() {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize formData directly from navigation state — no useEffect needed.
  // This eliminates the race condition that caused the 42/100 bug.
  const [formData, setFormData] = useState<any>(() => {
    const prefilled = location.state?.prefilledData;
    if (prefilled) {
      return { ...DEFAULT_FORM_DATA, ...prefilled };
    }
    return { ...DEFAULT_FORM_DATA };
  });

  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Product basics' },
    { id: 2, title: 'Claim you want to make' },
    { id: 3, title: 'Ingredients' },
    { id: 4, title: 'Evidence you have' },
    { id: 5, title: 'Packaging / channel context' },
    { id: 6, title: 'Review & submit' }
  ];

  const [inputValue, setInputValue] = useState('');

  const handleAddIngredient = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, inputValue.trim()]
      });
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_: any, i: number) => i !== index)
    });
  };

  const toggleContext = (value: string) => {
    const current = formData.context || [];
    if (current.includes(value)) {
      setFormData({
        ...formData,
        context: current.filter((c: string) => c !== value)
      });
    } else {
      setFormData({
        ...formData,
        context: [...current, value]
      });
    }
  };

  const handleSubmit = () => {
    navigate('/brands/results', { 
      state: { 
        formData
      } 
    });
  };

  return (
    <PageTransition>
    <div className="py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-8">
          {/* Left Sidebar - Progress */}
          <div className="col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-medium text-neutral-900 mb-6">Progress</h3>
              <div className="space-y-3">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all ${
                      currentStep === step.id
                        ? 'bg-[#A8B5A0]/10 text-neutral-900'
                        : currentStep > step.id
                        ? 'text-neutral-600 hover:bg-neutral-50'
                        : 'text-neutral-400'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium ${
                        currentStep > step.id
                          ? 'bg-[#A8B5A0] text-white'
                          : currentStep === step.id
                          ? 'bg-[#A8B5A0]/20 text-[#85957C]'
                          : 'bg-neutral-100 text-neutral-400'
                      }`}
                    >
                      {currentStep > step.id ? <Check className="w-3 h-3" /> : step.id}
                    </div>
                    <span className="text-sm leading-tight mt-0.5">{step.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="col-span-3">
            <div className="bg-white rounded-2xl p-10 shadow-sm">
              {/* Step 1: Product Basics */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-medium text-neutral-900 mb-6">
                    Product Basics
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Product Category
                      </label>
                      <div className="relative">
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-3 bg-neutral-50 border-none rounded-xl text-neutral-900 appearance-none cursor-pointer"
                        >
                          <option value="">Select category</option>
                          <option value="Lip Tint">Lip Tint</option>
                          <option value="Lip Oil">Lip Oil</option>
                          <option value="Lip Balm">Lip Balm</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={formData.productName}
                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                        placeholder="e.g., Berry Glow Lip Tint"
                        className="w-full px-4 py-3 bg-neutral-50 border-none rounded-xl text-neutral-900 placeholder:text-neutral-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Target User
                      </label>
                      <input
                        type="text"
                        value={formData.targetUser}
                        onChange={(e) => setFormData({ ...formData, targetUser: e.target.value })}
                        placeholder="e.g., Everyday makeup users"
                        className="w-full px-4 py-3 bg-neutral-50 border-none rounded-xl text-neutral-900 placeholder:text-neutral-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Region
                      </label>
                      <div className="relative">
                        <select
                          value={formData.region}
                          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                          className="w-full px-4 py-3 bg-neutral-50 border-none rounded-xl text-neutral-900 appearance-none cursor-pointer"
                        >
                          <option value="EU">EU</option>
                          <option value="US">US</option>
                          <option value="UK">UK</option>
                          <option value="Global">Global</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Claim */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-medium text-neutral-900 mb-6">
                    Claim You Want to Make
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Claim Type
                      </label>
                      <div className="relative">
                        <select
                          value={formData.claimType}
                          onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
                          className="w-full px-4 py-3 bg-neutral-50 border-none rounded-xl text-neutral-900 appearance-none cursor-pointer"
                        >
                          <option value="">Select claim type</option>
                          <option value="Hydration">Hydration</option>
                          <option value="Plumping">Plumping</option>
                          <option value="Smoothing">Smoothing</option>
                          <option value="Sensitive skin">Sensitive skin</option>
                          <option value="Dermatologist tested">Dermatologist tested</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Claim Statement
                      </label>
                      <textarea
                        value={formData.claimStatement}
                        onChange={(e) => setFormData({ ...formData, claimStatement: e.target.value })}
                        placeholder="e.g., Hydrates lips for up to 8 hours and helps reduce dryness"
                        rows={4}
                        className="w-full px-4 py-3 bg-neutral-50 border-none rounded-xl text-neutral-900 placeholder:text-neutral-400 resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Ingredients */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-medium text-neutral-900 mb-6">
                    Ingredients
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <label className="text-sm font-medium text-neutral-700">
                          Add Ingredient Tags
                        </label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="text-neutral-400 hover:text-neutral-600">
                              <Info className="w-4 h-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-xs">Uses known ingredient function. Does not prove performance alone.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.ingredients.map((ingredient: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 px-3 py-1.5 bg-[#A8B5A0]/10 text-[#85957C] rounded-full text-sm font-medium"
                          >
                            {ingredient}
                            <button
                              onClick={() => handleRemoveIngredient(index)}
                              className="hover:bg-[#A8B5A0]/20 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Type ingredient and press Enter"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleAddIngredient}
                        className="w-full px-4 py-3 bg-neutral-50 border-none rounded-xl text-neutral-900 placeholder:text-neutral-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        Irritant Flags
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.fragrancePresent}
                            onChange={(e) => setFormData({ ...formData, fragrancePresent: e.target.checked })}
                            className="w-4 h-4 rounded border-neutral-300 text-[#85957C]"
                          />
                          <span className="text-sm text-neutral-700">Fragrance present</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.essentialOils}
                            onChange={(e) => setFormData({ ...formData, essentialOils: e.target.checked })}
                            className="w-4 h-4 rounded border-neutral-300 text-[#85957C]"
                          />
                          <span className="text-sm text-neutral-700">Essential oils</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-neutral-300 text-[#85957C]"
                          />
                          <span className="text-sm text-neutral-700">Common allergens</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Evidence */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-medium text-neutral-900 mb-6">
                    Evidence You Have
                  </h2>
                  <div className="space-y-6">
                    {/* Instrumental Test */}
                    <div className="p-6 bg-neutral-50 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-neutral-900">Instrumental Test</h3>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="text-neutral-400 hover:text-neutral-600">
                                <Info className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-xs">Objective measurement using a device on human participants.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.evidence?.instrumental}
                            onChange={(e) => setFormData({
                              ...formData,
                              evidence: { ...formData.evidence, instrumental: e.target.checked }
                            })}
                            className="w-4 h-4 rounded border-neutral-300 text-[#85957C]"
                          />
                          <span className="text-sm text-neutral-700">Yes</span>
                        </label>
                      </div>
                      {formData.evidence?.instrumental && (
                        <div className="space-y-3 mt-4 pt-4 border-t border-neutral-200">
                          <div>
                            <div className="relative">
                              <select
                                value={formData.evidence?.instrumentalMethod || ''}
                                onChange={(e) => setFormData({
                                  ...formData,
                                  evidence: { ...formData.evidence, instrumentalMethod: e.target.value }
                                })}
                                className="w-full px-4 py-2 bg-white border-none rounded-lg text-sm"
                              >
                                <option value="">Select method</option>
                                <option value="Corneometer hydration">Corneometer hydration</option>
                                <option value="TEWL">TEWL</option>
                                <option value="3D Imaging">3D Imaging</option>
                                <option value="Visioscan">Visioscan</option>
                                <option value="Other">Other</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                            </div>
                            {formData.evidence?.instrumentalMethod && formData.evidence.instrumentalMethod !== 'Other' && (
                              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                                {formData.evidence.instrumentalMethod === 'Corneometer hydration' && 
                                  '✓ Measures skin hydration levels using electrical capacitance.'}
                                {formData.evidence.instrumentalMethod === 'TEWL' && 
                                  '✓ Measures water loss from the skin to evaluate barrier function.'}
                                {formData.evidence.instrumentalMethod === '3D Imaging' && 
                                  '✓ Measures visible volume change in lips or skin.'}
                                {formData.evidence.instrumentalMethod === 'Visioscan' && 
                                  '✓ Analyzes skin surface texture and smoothness.'}
                              </p>
                            )}
                          </div>
                          <input
                            type="text"
                            placeholder="Duration (e.g., 8 hours)"
                            value={formData.evidence?.instrumentalDuration || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              evidence: { ...formData.evidence, instrumentalDuration: e.target.value }
                            })}
                            className="w-full px-4 py-2 bg-white border-none rounded-lg text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Sample size"
                            value={formData.evidence?.instrumentalSampleSize || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              evidence: { ...formData.evidence, instrumentalSampleSize: e.target.value }
                            })}
                            className="w-full px-4 py-2 bg-white border-none rounded-lg text-sm"
                          />
                        </div>
                      )}
                    </div>

                    {/* Consumer Perception Study */}
                    <div className="p-6 bg-neutral-50 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-neutral-900">Consumer Perception Study</h3>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="text-neutral-400 hover:text-neutral-600">
                                <Info className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-xs">Self-reported feedback from participants.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.evidence?.consumerStudy}
                            onChange={(e) => setFormData({
                              ...formData,
                              evidence: { ...formData.evidence, consumerStudy: e.target.checked }
                            })}
                            className="w-4 h-4 rounded border-neutral-300 text-[#85957C]"
                          />
                          <span className="text-sm text-neutral-700">Yes</span>
                        </label>
                      </div>
                      {formData.evidence?.consumerStudy && (
                        <div className="space-y-3 mt-4 pt-4 border-t border-neutral-200">
                          <input
                            type="text"
                            placeholder="Sample size"
                            value={formData.evidence?.consumerSampleSize || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              evidence: { ...formData.evidence, consumerSampleSize: e.target.value }
                            })}
                            className="w-full px-4 py-2 bg-white border-none rounded-lg text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Duration"
                            value={formData.evidence?.consumerDuration || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              evidence: { ...formData.evidence, consumerDuration: e.target.value }
                            })}
                            className="w-full px-4 py-2 bg-white border-none rounded-lg text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Question asked"
                            value={formData.evidence?.consumerQuestion || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              evidence: { ...formData.evidence, consumerQuestion: e.target.value }
                            })}
                            className="w-full px-4 py-2 bg-white border-none rounded-lg text-sm"
                          />
                        </div>
                      )}
                    </div>

                    {/* Dermatologist Tested */}
                    <div className="p-6 bg-neutral-50 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-neutral-900">Dermatologist Tested</h3>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="text-neutral-400 hover:text-neutral-600">
                                <Info className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-xs">Trust signals. These increase credibility but do not prove results.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.evidence?.dermatologistTested}
                            onChange={(e) => setFormData({
                              ...formData,
                              evidence: { ...formData.evidence, dermatologistTested: e.target.checked }
                            })}
                            className="w-4 h-4 rounded border-neutral-300 text-[#85957C]"
                          />
                          <span className="text-sm text-neutral-700">Yes</span>
                        </label>
                      </div>
                      {formData.evidence?.dermatologistTested && (
                        <div className="mt-4 pt-4 border-t border-neutral-200">
                          <div className="relative">
                            <select
                              value={formData.evidence?.dermatologistCovers || ''}
                              onChange={(e) => setFormData({
                                ...formData,
                                evidence: { ...formData.evidence, dermatologistCovers: e.target.value }
                              })}
                              className="w-full px-4 py-2 bg-white border-none rounded-lg text-sm"
                            >
                              <option value="">What it covers</option>
                              <option value="Irritation / safety">Irritation / safety</option>
                              <option value="Performance">Performance</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Before/After Photos */}
                    <div className="p-6 bg-neutral-50 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-neutral-900">Before/After Photos</h3>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.evidence?.beforeAfterPhotos}
                            onChange={(e) => setFormData({
                              ...formData,
                              evidence: { ...formData.evidence, beforeAfterPhotos: e.target.checked }
                            })}
                            className="w-4 h-4 rounded border-neutral-300 text-[#85957C]"
                          />
                          <span className="text-sm text-neutral-700">Yes</span>
                        </label>
                      </div>
                      {formData.evidence?.beforeAfterPhotos && (
                        <div className="mt-4 pt-4 border-t border-neutral-200">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.evidence?.photoDisclosure}
                              onChange={(e) => setFormData({
                                ...formData,
                                evidence: { ...formData.evidence, photoDisclosure: e.target.checked }
                              })}
                              className="w-4 h-4 rounded border-neutral-300 text-[#85957C]"
                            />
                            <span className="text-sm text-neutral-700">Disclosure provided</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Context */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-2xl font-medium text-neutral-900 mb-6">
                    Packaging / Channel Context
                  </h2>
                  <p className="text-sm text-neutral-600 mb-6">
                    Where will the claim appear?
                  </p>
                  <div className="space-y-3">
                    {['Packaging', 'Website PDP', 'Social ad', 'Influencer script', 'TikTok ad'].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                          formData.context?.includes(option)
                            ? 'bg-[#A8B5A0]/10 border-2 border-[#A8B5A0]/30'
                            : 'bg-neutral-50 border-2 border-transparent hover:border-neutral-200'
                        }`}
                        onClick={() => toggleContext(option)}
                      >
                        <input
                          type="checkbox"
                          checked={formData.context?.includes(option)}
                          onChange={() => {}}
                          className="w-4 h-4 rounded border-neutral-300 text-[#85957C]"
                        />
                        <span className="text-sm font-medium text-neutral-900">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Review */}
              {currentStep === 6 && (
                <div>
                  <h2 className="text-2xl font-medium text-neutral-900 mb-6">
                    Review & Submit
                  </h2>
                  <div className="space-y-6">
                    <div className="p-6 bg-neutral-50 rounded-xl">
                      <h3 className="font-medium text-neutral-900 mb-4">Summary</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Product:</span>
                          <span className="font-medium text-neutral-900">{formData.productName || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Category:</span>
                          <span className="font-medium text-neutral-900">{formData.category || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Claim Type:</span>
                          <span className="font-medium text-neutral-900">{formData.claimType || 'Not set'}</span>
                        </div>
                        <div className="pt-3 border-t border-neutral-200">
                          <span className="text-neutral-600 block mb-2">Claim Statement:</span>
                          <p className="font-medium text-neutral-900">{formData.claimStatement || 'Not set'}</p>
                        </div>
                        <div className="pt-3 border-t border-neutral-200">
                          <span className="text-neutral-600 block mb-2">Ingredients:</span>
                          <div className="flex flex-wrap gap-2">
                            {formData.ingredients.length > 0 ? (
                              formData.ingredients.map((ing: string, i: number) => (
                                <span key={i} className="px-2 py-1 bg-[#A8B5A0]/10 text-[#85957C] rounded text-xs">
                                  {ing}
                                </span>
                              ))
                            ) : (
                              <span className="text-neutral-500 text-sm">None added</span>
                            )}
                          </div>
                        </div>
                        <div className="pt-3 border-t border-neutral-200">
                          <span className="text-neutral-600 block mb-2">Evidence:</span>
                          <div className="space-y-1">
                            {formData.evidence?.instrumental && (
                              <div className="flex items-center gap-2 text-xs">
                                <Check className="w-3 h-3 text-[#85957C]" />
                                <span>Instrumental testing</span>
                              </div>
                            )}
                            {formData.evidence?.consumerStudy && (
                              <div className="flex items-center gap-2 text-xs">
                                <Check className="w-3 h-3 text-[#85957C]" />
                                <span>Consumer perception study</span>
                              </div>
                            )}
                            {formData.evidence?.dermatologistTested && (
                              <div className="flex items-center gap-2 text-xs">
                                <Check className="w-3 h-3 text-[#85957C]" />
                                <span>Dermatologist tested</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
                    >
                      Generate Results
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-neutral-200">
                {currentStep > 1 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-2 text-neutral-600 hover:text-neutral-900 font-medium"
                  >
                    ← Previous
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 6 && (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-2 bg-[#A8B5A0] text-white rounded-full font-medium hover:bg-[#85957C] transition-colors"
                  >
                    Next Step →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}