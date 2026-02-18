import { FileSearch, Scale, FileText } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

export function About() {
  const steps = [
    {
      icon: FileSearch,
      title: 'Identify claim type',
      description: 'We categorize the claim (functional, sensory, scientific, or marketing) and identify what evidence would typically support it.'
    },
    {
      icon: Scale,
      title: 'Match evidence types',
      description: 'We compare the claim against available evidence: ingredient properties, consumer studies, clinical testing, or dermatologist validation.'
    },
    {
      icon: FileText,
      title: 'Suggest wording + highlight uncertainty',
      description: 'We provide safe, confident, and risky wording options based on the strength of the evidence, and flag areas of uncertainty.'
    }
  ];

  return (
    <PageTransition>
    <div className="py-20 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-medium text-neutral-900 mb-6">
            How It Works
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Beauty Claim Checker helps brands and consumers understand what supports product claims 
            and what's just marketing language.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#A8B5A0]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#85957C]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-6 h-6 bg-[#A8B5A0] text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-medium text-neutral-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-neutral-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Methodology Section */}
        <div className="bg-gradient-to-br from-[#A8B5A0]/10 to-[#E8C5C0]/10 rounded-2xl p-10 border border-[#A8B5A0]/20">
          <h2 className="text-2xl font-medium text-neutral-900 mb-6">
            Our Methodology
          </h2>
          <div className="space-y-4 text-neutral-700 leading-relaxed">
            <p>
              Our evaluation framework is based on industry standards, regulatory guidelines (including EU 
              cosmetics regulations), and scientific evidence levels.
            </p>
            <p>
              We assess claims across three dimensions:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <span className="text-[#85957C] mt-1">•</span>
                <span><span className="font-medium">Evidence Strength:</span> What type of testing or data supports the claim</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#85957C] mt-1">•</span>
                <span><span className="font-medium">Clarity:</span> How specific and measurable the claim language is</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#85957C] mt-1">•</span>
                <span><span className="font-medium">Risk Level:</span> Potential for regulatory challenges or consumer misunderstanding</span>
              </li>
            </ul>
            <p>
              This tool is designed for decision support and educational purposes. It does not replace 
              legal counsel or regulatory review.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-medium text-neutral-900 mb-4">
            About This Tool
          </h2>
          <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Beauty Claim Checker was created to bring more transparency to beauty marketing. 
            We believe brands should be able to communicate confidently and consumers should 
            understand what they're buying.
          </p>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}