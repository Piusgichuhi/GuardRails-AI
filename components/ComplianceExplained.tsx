import React from 'react';
import { HouseIcon, RobotIcon, ClipboardIcon } from './icons';

const InfoBlock: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
            {icon}
        </div>
        <div>
            <h4 className="text-xl font-bold text-brand-secondary">{title}</h4>
            <p className="text-brand-gray mt-1">{children}</p>
        </div>
    </div>
);

const ComplianceExplained: React.FC = () => {
    return (
        <section className="bg-brand-dark/50 border border-brand-primary/20 rounded-xl p-8 md:p-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white">The GuardRails AI Method</h2>
                <p className="text-brand-gray mt-4 max-w-3xl mx-auto">Understanding "Compliance as Code" and our ethical scanning process.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                <InfoBlock 
                    icon={<HouseIcon className="w-10 h-10 text-brand-primary" />}
                    title="1. Your Company is a House"
                >
                    Imagine your company's digital infrastructure (servers, apps, data) is a house. To keep it safe, you have security rules: lock the front door, close windows at night, and don't leave the stove on.
                </InfoBlock>
                <InfoBlock 
                    icon={<ClipboardIcon className="w-10 h-10 text-brand-primary" />}
                    title="2. Compliance is the Rulebook"
                >
                    "Compliance Frameworks" (like SOC 2 or GDPR) are just official rulebooks. An inspector might check if you're following these rules. Traditionally, this means walking around with a clipboard, manually checking every lock and window. It's slow and prone to error.
                </InfoBlock>
                <InfoBlock 
                    icon={<RobotIcon className="w-10 h-10 text-brand-primary" />}
                    title="3. 'As Code' is the Smart Robot"
                >
                    "Compliance as Code" turns that paper rulebook into a smart robot. Instead of you checking locks, the robot does it automatically, 24/7. It can instantly tell you if a window is open and, in many cases, can even close it for you. This robot is fast, tireless, and never makes a mistake.
                </InfoBlock>
            </div>
            
            <div className="mt-12 pt-8 border-t border-brand-primary/20">
                <h3 className="text-2xl font-bold text-white text-center">How Our Scan Works (And Why It's Safe)</h3>
                 <p className="text-brand-gray mt-3 max-w-3xl mx-auto text-center">
                    When you enter a URL, our AI acts as an ethical security consultant, not a hacker. It performs a <strong className="text-brand-secondary">simulated analysis</strong> based on its vast knowledge of web technologies and common vulnerabilities for applications like yours.
                </p>
                <p className="text-brand-gray mt-3 max-w-3xl mx-auto text-center">
                    It <strong className="text-brand-secondary">does not</strong> actively probe, attack, or attempt to breach your website. This means you get an expert-level security and compliance review that is completely safe, legal, and respects all security policies. It's about switching from security as a chore to security as an automatic, built-in feature.
                </p>
            </div>
        </section>
    );
};

export default ComplianceExplained;