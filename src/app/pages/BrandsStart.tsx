import { Link, useNavigate } from "react-router";
import { Plus, Play } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { HYDRAFULL_DEMO_DATA } from '../utils/claimEvaluation';

export function BrandsStart() {
  const navigate = useNavigate();

  const handleRunDemo = () => {
    navigate('/brands/builder', {
      state: {
        prefilledData: HYDRAFULL_DEMO_DATA
      }
    });
  };

  return (
    <PageTransition>
    <div className="py-20 px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-medium text-neutral-900 mb-4">
            Build or check a claim.
          </h1>
          <p className="text-lg text-neutral-600">
            Start fresh or explore our example demo
          </p>
        </div>

        <div className="space-y-6">
          {/* Start New */}
          <Link to="/brands/builder">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-[#A8B5A0]/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#A8B5A0]/10 rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-[#85957C]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-medium text-neutral-900 mb-1">
                    Start a new claim check
                  </h2>
                  <p className="text-sm text-neutral-600">
                    Build your claim from scratch with our guided form
                  </p>
                </div>
                <div className="text-[#85957C] font-medium">
                  Start →
                </div>
              </div>
            </div>
          </Link>

          {/* Single Demo Scenario */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="font-medium text-neutral-900 mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-[#85957C]" />
              Example demo
            </h3>

            <button
              onClick={handleRunDemo}
              className="w-full text-left p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors border border-green-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-green-200 text-green-900 text-xs font-medium rounded">
                      Demo
                    </span>
                    <span className="text-xs text-green-700">Strong Claim</span>
                  </div>
                  <h4 className="font-medium text-neutral-900 mb-1">
                    HydraFull Lip Tint
                  </h4>
                  <p className="text-sm text-neutral-600 mb-2">
                    Clinically Measured Hydration
                  </p>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Corneometer testing, 32 participants, 8-hour duration, consumer study n=60, dermatologist tested
                  </p>
                </div>
                <div className="text-green-700 font-medium text-sm whitespace-nowrap ml-4">
                  Run Demo →
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}