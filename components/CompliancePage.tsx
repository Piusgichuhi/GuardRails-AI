import React from 'react';
import { Link } from 'react-router-dom';
import { GavelIcon } from './icons';

const frameworks = [
    {
        name: "GRC",
        title: "Governance, Risk & Compliance",
        description: "The umbrella strategy for managing an organization's overall governance, enterprise risk management, and compliance with regulations."
    },
    {
        name: "PCI-DSS",
        title: "Payment Card Industry Data Security Standard",
        description: "A set of security standards designed to ensure that all companies that accept, process, store or transmit credit card information maintain a secure environment."
    },
    {
        name: "SOC 2",
        title: "System and Organization Controls 2",
        description: "A compliance standard for service organizations, specifying how organizations should manage customer data based on five 'trust service principles'—security, availability, processing integrity, confidentiality, and privacy."
    },
    {
        name: "ISO 27001",
        title: "International Organization for Standardization 27001",
        description: "An international standard on how to manage information security. It details requirements for establishing, implementing, maintaining, and continually improving an Information Security Management System (ISMS)."
    },
    {
        name: "HIPAA",
        title: "Health Insurance Portability and Accountability Act",
        description: "A US federal law that required the creation of national standards to protect sensitive patient health information from being disclosed without the patient's consent or knowledge."
    },
    {
        name: "NIST AI Risk",
        title: "NIST AI Risk Management Framework",
        description: "Provides guidance for managing risks related to artificial intelligence. It helps organizations address the trustworthiness of AI systems, including aspects of fairness, accountability, and transparency."
    },
];

const FrameworkCard: React.FC<{ framework: typeof frameworks[0] }> = ({ framework }) => (
    <div className="bg-brand-dark/50 border border-brand-primary/20 rounded-xl p-8 transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-2">{framework.name}</h3>
        <p className="text-brand-secondary text-sm mb-4">{framework.title}</p>
        <p className="text-brand-gray">{framework.description}</p>
    </div>
);

const CompliancePage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in-up">
            <div className="text-center max-w-3xl mx-auto">
                <GavelIcon className="w-16 h-16 text-brand-primary mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-white mb-4">Understanding Compliance Frameworks</h1>
                <p className="text-lg text-brand-gray mb-10">
                    Compliance isn't just about rules; it's about building trust. Our AI-powered scanner helps you align with key industry standards to protect your data and your customers.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {frameworks.map(fw => (
                    <FrameworkCard key={fw.name} framework={fw} />
                ))}
            </div>

            <div className="mt-16 text-center">
                 <h2 className="text-3xl font-bold text-white mb-4">Ready to Check Your Compliance Posture?</h2>
                <p className="text-lg text-brand-gray mb-8">Run a free, AI-powered scan to see where you stand.</p>
                <Link
                    to="/scanner"
                    className="bg-brand-primary text-white font-bold py-4 px-10 rounded-lg shadow-lg shadow-brand-primary/40 hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
                >
                    Scan Your Website Now
                </Link>
            </div>
        </div>
    );
};

export default CompliancePage;