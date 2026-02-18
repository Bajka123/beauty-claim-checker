import { Link } from "react-router";
import { Gauge, FileText, Languages, Sparkles } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

export function Home() {
  const features = [
    {
      icon: Gauge,
      title: "Claim Strength Meter",
      description: "See how well your evidence supports the claim"
    },
    {
      icon: FileText,
      title: "Evidence-to-Wording Guidance",
      description: "Get safe, confident, and risky wording options"
    },
    {
      icon: Languages,
      title: "Ingredient + Claim Translation",
      description: "Plain language explanations for consumers"
    }
  ];

  return (
    <PageTransition>
      <div>
        {/* Demo Banner */}
        <div className="bg-gradient-to-r from-[#A8B5A0] to-[#85957C] text-white py-3">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <p className="text-sm font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Built for smarter beauty claims
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-medium text-neutral-900 mb-6 leading-tight">
              Make beauty claims clearer, stronger, and more responsible.
            </h1>
            <p className="text-xl text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              A decision-support tool for product teams and consumers. Check how a claim is built, 
              what supports it, and what wording fits your evidence.
            </p>

            <div className="flex items-center justify-center gap-4 mb-20">
              <Link to="/choose-mode">
                <button className="px-10 py-4 bg-neutral-900 text-white rounded-full font-medium text-lg hover:bg-neutral-800 transition-all duration-200 hover:shadow-lg">
                  Start
                </button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-[#A8B5A0]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#85957C]" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-medium text-neutral-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 px-8 bg-white/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-medium text-neutral-900 mb-4">
              Built for transparency
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Help brands communicate responsibly and empower consumers to understand 
              what's real and what's marketing.
            </p>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}