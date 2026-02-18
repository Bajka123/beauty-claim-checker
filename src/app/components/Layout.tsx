import { Outlet, Link } from "react-router";

export function Layout() {
  return (
    <div className="min-h-screen bg-[#F6F3EE]">
      {/* Top Nav */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-neutral-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-lg font-medium text-neutral-900">
            Beauty Claim Checker
          </Link>

          <nav className="flex items-center gap-8 text-sm">
            <Link to="/about" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              How it works
            </Link>
            <Link to="/about" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              About
            </Link>
            <Link to="/choose-mode" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              Demo
            </Link>
            <a href="#contact" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
