import React from 'react';
import { ShieldCheckIcon } from './icons';

const footerLinks = {
  solutions: ["Startup", "Mid-Market", "Enterprises", "Platforms", "Integration"],
  frameworks: ["SOC 2", "ISO 27001", "HIPAA", "GDPR", "NIST AI Risk", "FedRAMP"],
  resources: ["Blog", "Events", "Webinars", "SOC 2 Hub", "API Docs", "Glossary"],
  company: ["Auditors", "Partners", "Press", "Contact Us", "Legal"],
  trust: ["Security", "Trust Center", "System Status", "Accessibility"],
};

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-brand-dark border-t border-brand-primary/20 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
          <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-8 lg:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <ShieldCheckIcon className="w-8 h-8 text-brand-primary" />
              <span className="text-2xl font-bold text-white">GuardRails AI</span>
            </div>
            <p className="text-brand-gray text-sm">Automating security, simplifying compliance.</p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 tracking-wider uppercase">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link}><a href="#" className="text-brand-gray hover:text-brand-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4 tracking-wider uppercase">Frameworks</h3>
            <ul className="space-y-3">
              {footerLinks.frameworks.map((link) => (
                <li key={link}><a href="#" className="text-brand-gray hover:text-brand-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 tracking-wider uppercase">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link}><a href="#" className="text-brand-gray hover:text-brand-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 tracking-wider uppercase">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}><a href="#" className="text-brand-gray hover:text-brand-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          
        </div>
        <div className="mt-16 pt-8 border-t border-brand-primary/20 text-center text-brand-gray text-sm">
          <p>&copy; {new Date().getFullYear()} GuardRails AI, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;