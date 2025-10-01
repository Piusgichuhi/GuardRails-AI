import React from 'react';
import { Link } from 'react-router-dom';
import { CodeBracketIcon, CpuChipIcon, DocumentCheckIcon, BugAntIcon, GavelIcon, DocumentTextIcon, CloudIcon, EnvelopeIcon, FingerPrintIcon, ShieldCheckIcon } from './icons';
import ComplianceExplained from './ComplianceExplained';
import { Finding, ScanTarget } from '../App';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-brand-dark/50 border border-brand-primary/20 rounded-xl p-8 transform hover:-translate-y-2 transition-transform duration-300 animate-fade-in-up shadow-lg">
    <div className="flex items-center justify-center h-16 w-16 bg-brand-primary/10 rounded-full mb-6 border-2 border-brand-primary/30">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-brand-gray">{children}</p>
  </div>
);

const UserDashboard: React.FC<{ findings: Finding[], scanTarget: ScanTarget | null }> = ({ findings, scanTarget }) => {
  const hasScanData = findings.length > 0;
  
  const DashboardActionCard: React.FC<{ icon: React.ReactNode; title: string; description: string; link: string; }> = ({ icon, title, description, link }) => (
    <Link to={link} className="block group">
      <div className="bg-brand-dark/50 border border-brand-primary/20 rounded-xl p-8 h-full flex flex-col transform group-hover:-translate-y-2 transition-transform duration-300 shadow-lg group-hover:shadow-brand-primary/20">
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 bg-brand-primary/10 rounded-full mb-4 border-2 border-brand-primary/30">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-brand-gray flex-grow text-sm">{description}</p>
        <span className="mt-4 font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors text-sm">Start Scan →</span>
      </div>
    </Link>
  );

  return (
    <div className="container mx-auto px-6 py-16 animate-fade-in-up">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          Command Center
        </h1>
        <p className="text-lg md:text-xl text-brand-gray max-w-3xl">
          Your unified security and compliance hub.
        </p>
      </div>

      {hasScanData && scanTarget && (
        <div className="bg-brand-dark/50 border border-brand-primary/20 rounded-xl p-8 mb-12 shadow-lg animate-fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-2">Latest Scan Summary</h2>
          <p className="text-brand-gray">
            {scanTarget.type} scan for <span className="font-semibold text-brand-secondary break-all">{scanTarget.value}</span> found <span className="font-semibold text-brand-primary">{findings.length}</span> potential issues.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link to="/dashboard" className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
              View Full Analytics →
            </Link>
            <Link to="/report" className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
              View Pentest Report →
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <DashboardActionCard 
          icon={<BugAntIcon className="w-7 h-7 text-brand-secondary" />}
          title="Scan Website"
          description="Analyze a public URL for common web vulnerabilities."
          link="/scanner"
        />
        <DashboardActionCard 
          icon={<CloudIcon className="w-7 h-7 text-brand-secondary" />}
          title="Audit Cloud Config"
          description="Check cloud configuration snippets for misconfigurations."
          link="/scanner"
        />
        <DashboardActionCard 
          icon={<EnvelopeIcon className="w-7 h-7 text-brand-secondary" />}
          title="Analyze Email"
          description="Inspect email content for phishing or malware indicators."
          link="/scanner"
        />
        <DashboardActionCard 
          icon={<FingerPrintIcon className="w-7 h-7 text-brand-secondary" />}
          title="Check for Data Leaks"
          description="See if an email has appeared in known data breaches."
          link="/scanner"
        />
      </div>
    </div>
  );
};


interface HomePageProps {
  isLoggedIn: boolean;
  findings: Finding[];
  scanTarget: ScanTarget | null;
}

const HomePage: React.FC<HomePageProps> = ({ isLoggedIn, findings, scanTarget }) => {
  if (isLoggedIn) {
    return <UserDashboard findings={findings} scanTarget={scanTarget} />;
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-grid-pattern">
         <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/80 to-brand-dark"></div>
         <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/1600/900?random=1')"}}></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Automate Security. <span className="text-brand-primary">Simplify Compliance.</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto mb-10">
              Leverage the power of Generative AI to transform your security posture. GuardRails AI makes enterprise-grade compliance and security accessible to everyone.
            </p>
            <Link
              to="/signin"
              className="bg-brand-primary text-white font-bold py-4 px-10 rounded-lg shadow-lg shadow-brand-primary/40 hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 animate-subtle-glow"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-brand-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white">A Unified AI Security Platform</h2>
            <p className="text-brand-gray mt-4 max-w-2xl mx-auto">Our platform integrates AI at every step to provide unparalleled clarity and automation across your digital footprint.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<CodeBracketIcon className="w-8 h-8 text-brand-secondary" />} title="Web App Security">
              Translate complex compliance rules into automated tests for your websites. Find and fix web vulnerabilities with AI-generated code.
            </FeatureCard>
            <FeatureCard icon={<CloudIcon className="w-8 h-8 text-brand-secondary" />} title="Cloud Security">
             Analyze cloud configurations (like Terraform or IAM policies) to find misconfigurations before they become a breach.
            </FeatureCard>
            <FeatureCard icon={<EnvelopeIcon className="w-8 h-8 text-brand-secondary" />} title="Threat Intelligence">
              Detect phishing attempts by analyzing email content and headers. Check for your data in known third-party breaches.
            </FeatureCard>
            <FeatureCard icon={<DocumentCheckIcon className="w-8 h-8 text-brand-secondary" />} title="Automated Governance">
              Automatically generate policy templates, evidence documentation, and audit-ready reports from your scan results.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Explanation Section */}
      <section className="py-24 bg-brand-dark">
        <div className="container mx-auto px-6">
          <ComplianceExplained />
        </div>
      </section>

      {/* Image Section */}
       <section className="py-20">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Visualize Your Security Posture</h2>
            <p className="text-brand-gray mb-8">From a high-level overview to deep-dive analytics.</p>
            <div className="rounded-xl overflow-hidden shadow-2xl animate-subtle-glow border-2 border-brand-primary/30">
                <img src="https://picsum.photos/1200/600?random=2" alt="Dashboard Preview" className="w-full h-auto" />
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;