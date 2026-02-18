import { Link } from "react-router";
import { Building2, ShoppingBag } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

export function ChooseMode() {
  return (
    <PageTransition>
    <div className="py-20 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium text-neutral-900 mb-4">
            Choose Your Mode
          </h1>
          <p className="text-lg text-neutral-600">
            Select how you'd like to use the Beauty Claim Checker
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* For Brands */}
          <Link to="/brands/start">
            <div className="group bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-[#A8B5A0]/30">
              <div className="w-16 h-16 bg-[#A8B5A0]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#A8B5A0]/20 transition-colors">
                <Building2 className="w-8 h-8 text-[#85957C]" strokeWidth={1.5} />
              </div>
              
              <h2 className="text-2xl font-medium text-neutral-900 mb-3">
                For Brands
              </h2>
              
              <p className="text-sm text-neutral-500 mb-4">
                For founders, product teams, marketing, designers
              </p>
              
              <p className="text-neutral-700 mb-6 leading-relaxed">
                Build claims from evidence, get safe wording, and see what's missing.
              </p>
              
              <div className="inline-flex items-center text-[#85957C] font-medium">
                Get Started →
              </div>
            </div>
          </Link>

          {/* For Consumers */}
          <Link to="/consumer/search">
            <div className="group bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-[#E8C5C0]/30">
              <div className="w-16 h-16 bg-[#E8C5C0]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#E8C5C0]/30 transition-colors">
                <ShoppingBag className="w-8 h-8 text-[#C89A94]" strokeWidth={1.5} />
              </div>
              
              <h2 className="text-2xl font-medium text-neutral-900 mb-3">
                For Consumers
              </h2>
              
              <p className="text-sm text-neutral-500 mb-4">
                For anyone shopping beauty products
              </p>
              
              <p className="text-neutral-700 mb-6 leading-relaxed">
                Search a product and see what claims mean in plain language.
              </p>
              
              <div className="inline-flex items-center text-[#C89A94] font-medium">
                Search Products →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}