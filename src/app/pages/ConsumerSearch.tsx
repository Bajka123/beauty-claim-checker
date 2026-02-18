import { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { PageTransition } from '../components/PageTransition';

export function ConsumerSearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sensitiveMode, setSensitiveMode] = useState(false);

  const demoSearches = [
    { name: 'rhode Peptide Lip Tint', key: 'rhode' },
    { name: 'Rare Beauty Soft Pinch Tinted Lip Oil', key: 'rare' },
    { name: 'Gisou Honey Infused Lip Oil', key: 'gisou' }
  ];

  const handleSearch = (productKey?: string) => {
    const searchKey = productKey || (searchTerm.toLowerCase().includes('rhode') ? 'rhode' : 'default');
    navigate('/consumer/results', { 
      state: { 
        productKey: searchKey,
        searchTerm: productKey 
          ? demoSearches.find(d => d.key === productKey)?.name 
          : searchTerm,
        sensitiveMode 
      } 
    });
  };

  return (
    <PageTransition>
    <div className="py-20 px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back to mode selection */}
        <button
          onClick={() => navigate('/choose-mode')}
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mode Selection
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium text-neutral-900 mb-4">
            Check a product in plain language.
          </h1>
          <p className="text-lg text-neutral-600">
            See what beauty claims really mean and what supports them.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search: brand + product name (e.g., rhode peptide lip tint)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-2 py-2 text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
            />
          </div>

          {/* Sensitive Skin Toggle */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={sensitiveMode}
                onChange={(e) => setSensitiveMode(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-300 text-[#C89A94]"
              />
              <span className="text-sm text-neutral-700">Sensitive skin view</span>
            </label>
            <button
              onClick={() => handleSearch()}
              className="px-6 py-2.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Demo Search Chips */}
        <div>
          <p className="text-sm text-neutral-600 mb-4 text-center">
            Try demo searches:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {demoSearches.map((demo) => (
              <button
                key={demo.key}
                onClick={() => handleSearch(demo.key)}
                className="px-5 py-2.5 bg-white text-neutral-700 rounded-full text-sm font-medium hover:bg-neutral-50 transition-all shadow-sm border border-neutral-200 hover:border-[#C89A94] hover:text-[#C89A94]"
              >
                {demo.name}
              </button>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 p-6 bg-gradient-to-br from-[#A8B5A0]/10 to-[#E8C5C0]/10 rounded-2xl border border-[#A8B5A0]/20">
          <h3 className="font-medium text-neutral-900 mb-2">
            What you'll learn:
          </h3>
          <ul className="space-y-2 text-sm text-neutral-700">
            <li className="flex items-start gap-2">
              <span className="text-[#85957C]">•</span>
              <span>What evidence supports each claim</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#85957C]">•</span>
              <span>Which ingredients are linked to the claim</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#85957C]">•</span>
              <span>Whether claims are exaggerated or realistic</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#85957C]">•</span>
              <span>Plain language explanations without jargon</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}