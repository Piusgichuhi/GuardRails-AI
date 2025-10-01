import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';
import { GoogleGenAI } from '@google/genai';
import { BoltIcon, SpinnerIcon, BugAntIcon, GavelIcon, DocumentTextIcon, CloudIcon, EnvelopeIcon, FingerPrintIcon } from './icons';
import { Finding, ScanTarget } from '../App';

type FilterType = 'All' | 'Web' | 'Cloud' | 'Email' | 'Data Leak';

const complianceData = [
  { name: 'Jan', score: 75 }, { name: 'Feb', score: 78 },
  { name: 'Mar', score: 85 }, { name: 'Apr', score: 82 },
  { name: 'May', score: 88 }, { name: 'Jun', score: 92 },
];

const severityStyles = {
  Critical: { border: 'border-red-500', text: 'text-red-500', bg: 'bg-red-500/10' },
  High: { border: 'border-orange-500', text: 'text-orange-500', bg: 'bg-orange-500/10' },
  Medium: { border: 'border-yellow-500', text: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  Low: { border: 'border-blue-500', text: 'text-blue-500', bg: 'bg-blue-500/10' },
  Informational: { border: 'border-gray-500', text: 'text-gray-500', bg: 'bg-gray-500/10' },
};

const frameworkColors: { [key: string]: string } = {
    'SOC 2': 'bg-sky-500/20 text-sky-300',
    'ISO 27001': 'bg-indigo-500/20 text-indigo-300',
    'HIPAA': 'bg-red-500/20 text-red-300',
    'PCI-DSS': 'bg-yellow-500/20 text-yellow-300',
    'NIST': 'bg-teal-500/20 text-teal-300',
    'GRC': 'bg-purple-500/20 text-purple-300',
};

const categoryIcons: { [key in FilterType]: React.ReactNode } = {
    All: null,
    Web: <BugAntIcon className="w-5 h-5" />,
    Cloud: <CloudIcon className="w-5 h-5" />,
    Email: <EnvelopeIcon className="w-5 h-5" />,
    'Data Leak': <FingerPrintIcon className="w-5 h-5" />,
};

const FindingCard: React.FC<{ finding: Finding }> = ({ finding }) => {
    const styles = severityStyles[finding.severity] || severityStyles.Informational;
    return (
        <div className={`border-l-4 ${styles.border} ${styles.bg} p-6 rounded-lg`}>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <span className="text-brand-gray">{categoryIcons[finding.category as FilterType]}</span>
                    <h3 className="text-xl font-bold text-white">{finding.vulnerabilityName}</h3>
                </div>
                <span className={`font-bold py-1 px-3 rounded-full text-sm ${styles.text} ${styles.bg}`}>{finding.severity}</span>
            </div>
            <div className="mt-4 space-y-4">
                <div>
                    <h4 className="font-semibold text-brand-secondary">Description</h4>
                    <p className="text-brand-gray">{finding.description}</p>
                </div>
                 <div>
                    <h4 className={`font-semibold ${styles.text}`}>Negative Side (Risk)</h4>
                    <p className="text-brand-gray">{finding.risk}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-green-400">How to Improve (Remediation)</h4>
                    <p className="text-brand-gray">{finding.remediation}</p>
                </div>
            </div>
             {finding.affectedFrameworks && finding.affectedFrameworks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-brand-primary/10">
                    <h4 className="font-semibold text-brand-secondary mb-2">Affected Frameworks</h4>
                    <div className="flex flex-wrap gap-2">
                        {finding.affectedFrameworks.map(fw => (
                            <span key={fw} className={`text-xs font-semibold px-2 py-1 rounded-full ${frameworkColors[fw] || 'bg-gray-500/20 text-gray-300'}`}>
                                {fw}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

const StatCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="bg-brand-dark/50 border border-brand-primary/20 p-6 rounded-xl">
        <h3 className="text-brand-gray text-sm font-medium uppercase">{title}</h3>
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
    </div>
);

// FIX: Changed children prop type from React.ReactNode to React.ReactElement.
// The `ResponsiveContainer` from recharts expects a single element as a child, not any ReactNode.
const ChartContainer: React.FC<{ title: string; children: React.ReactElement }> = ({ title, children }) => (
    <div className="bg-brand-dark/50 border border-brand-primary/20 p-6 rounded-xl min-h-[400px]">
        <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
            {children}
        </ResponsiveContainer>
    </div>
);

const AiRemediation: React.FC<{ response: string }> = ({ response }) => {
    const parts = response.split(/```bash|```shell/);
    const explanation = parts[0];
    const scriptWithEnding = parts[1] || '';
    const script = scriptWithEnding.split('```')[0] || '';
    
    return (
        <div className="mt-4 space-y-4 text-left animate-fade-in-up">
            <p className="text-brand-gray whitespace-pre-wrap">{explanation.trim()}</p>
            {script && (
                <div>
                    <h4 className="font-semibold text-brand-secondary mb-2">Remediation Script:</h4>
                    <div className="bg-brand-dark p-4 rounded-lg border border-brand-primary/20 relative">
                        <button 
                            onClick={() => navigator.clipboard.writeText(script.trim())}
                            className="absolute top-2 right-2 bg-brand-primary/20 text-brand-secondary text-xs px-2 py-1 rounded hover:bg-brand-primary/40 transition-colors"
                        >
                            Copy
                        </button>
                        <pre className="text-brand-light text-sm overflow-x-auto">
                            <code>{script.trim()}</code>
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
};

const ComplianceStatus: React.FC<{ findings: Finding[] }> = ({ findings }) => {
    const frameworks = ['SOC 2', 'ISO 27001', 'HIPAA', 'PCI-DSS', 'NIST'];
    const issuesByFramework: { [key: string]: number } = frameworks.reduce((acc, fw) => ({ ...acc, [fw]: 0 }), {});
    
    findings.forEach(vuln => {
        vuln.affectedFrameworks.forEach(fw => {
            if (issuesByFramework[fw] !== undefined) {
                issuesByFramework[fw]++;
            }
        });
    });

    return (
        <div className="bg-brand-dark/50 border border-brand-primary/20 p-6 rounded-xl mb-8">
             <div className="flex items-center mb-4">
                <GavelIcon className="w-6 h-6 text-brand-primary mr-3 flex-shrink-0" />
                <h3 className="text-xl font-bold text-white">Compliance Status</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {frameworks.map(fw => {
                    const issueCount = issuesByFramework[fw];
                    const isAtRisk = issueCount > 0;
                    return (
                        <div key={fw} className={`text-center p-4 rounded-lg ${isAtRisk ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                            <p className="font-bold text-white">{fw}</p>
                            {isAtRisk ? (
                                <p className="text-sm text-red-400">{issueCount} Issue(s)</p>
                            ) : (
                                <p className="text-sm text-green-400">Compliant</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


interface DashboardPageProps {
  findings: Finding[];
  scanTarget: ScanTarget | null;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ findings, scanTarget }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [error, setError] = useState('');
    const [filter, setFilter] = useState<FilterType>('All');

    if (findings.length === 0) {
        return (
            <div className="container mx-auto px-6 py-24 text-center animate-fade-in-up">
                <BugAntIcon className="w-20 h-20 text-brand-primary/50 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-white mb-4">No Scan Data Available</h1>
                <p className="text-lg text-brand-gray mb-8">Run a scan to see your security dashboard.</p>
                <Link
                    to="/scanner"
                    className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-brand-primary/30 hover:bg-opacity-90 transition-all duration-300"
                >
                    Go to Scanner
                </Link>
            </div>
        );
    }
    
    const filteredFindings = filter === 'All' ? findings : findings.filter(f => f.category === filter);

    const insightVulnerability = filteredFindings.find(v => v.severity === 'Critical') 
                                || filteredFindings.find(v => v.severity === 'High') 
                                || filteredFindings[0];

    const severityCounts = filteredFindings.reduce((acc, v) => {
        acc[v.severity] = (acc[v.severity] || 0) + 1;
        return acc;
    }, {} as Record<Finding['severity'], number>);

    const vulnerabilityChartData = [
        { name: 'Critical', count: severityCounts.Critical || 0, fill: '#ef4444' },
        { name: 'High', count: severityCounts.High || 0, fill: '#f97316' },
        { name: 'Medium', count: severityCounts.Medium || 0, fill: '#eab308' },
        { name: 'Low', count: severityCounts.Low || 0, fill: '#3b82f6' },
        { name: 'Info', count: severityCounts.Informational || 0, fill: '#6b7280' },
    ];
    
    const criticalCount = severityCounts.Critical || 0;
    const totalVulnerabilities = filteredFindings.length;

    const handleGenerateScript = async () => {
        if (!insightVulnerability) return;
        setIsLoading(true);
        setError('');
        setAiResponse('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const prompt = `You are a senior cybersecurity expert providing advice within a security dashboard. A ${insightVulnerability.severity.toLowerCase()} issue ("${insightVulnerability.vulnerabilityName}") has been detected related to a ${insightVulnerability.category} scan. 
The issue is described as: "${insightVulnerability.description}".
Your task is to:
1. Provide a brief, one-paragraph explanation of this specific issue and why it's a risk in the context of a ${insightVulnerability.category}.
2. Generate a generic bash script or code snippet that demonstrates how to fix or mitigate this type of issue. If a script is not applicable (e.g., for a data leak notification), provide clear, actionable steps.
Format your response clearly. Enclose any script/code within a single markdown code block (\`\`\`bash).`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            
            setAiResponse(response.text);

        } catch (e) {
            setError('Failed to get remediation script from AI. Please try again.');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };
    
    const filters: FilterType[] = ['All', 'Web', 'Cloud', 'Email', 'Data Leak'];

    return (
    <div className="container mx-auto px-6 py-12 animate-fade-in-up">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">Security Dashboard</h1>
                {scanTarget && <p className="text-brand-gray">Showing results for {scanTarget.type}: <span className="text-brand-primary break-all">{scanTarget.value}</span></p>}
            </div>
            <Link 
                to="/report" 
                className="flex-shrink-0 flex items-center gap-2 bg-brand-secondary/90 text-brand-dark font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105"
            >
                <DocumentTextIcon className="w-5 h-5" />
                View Pentest Report
            </Link>
        </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Compliance Score" value="92%" />
        <StatCard title="Critical Findings" value={criticalCount.toString()} />
        <StatCard title="Total Findings" value={totalVulnerabilities.toString()} />
        <StatCard title="Scan Target" value={scanTarget?.value.substring(0, 20) + (scanTarget && scanTarget.value.length > 20 ? '...' : '') || 'N/A'} />
      </div>
      
      <ComplianceStatus findings={filteredFindings} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartContainer title="Compliance Score Over Time">
            <LineChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="name" stroke="#87C4FF" />
                <YAxis stroke="#87C4FF" />
                <Tooltip contentStyle={{ backgroundColor: '#001524', border: '1px solid #00A9FF' }} />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#00A9FF" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
        </ChartContainer>
        <ChartContainer title="Findings by Severity">
             <BarChart data={vulnerabilityChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis type="number" stroke="#87C4FF" allowDecimals={false} />
                <YAxis type="category" dataKey="name" stroke="#87C4FF" width={80} />
                <Tooltip contentStyle={{ backgroundColor: '#001524', border: '1px solid #00A9FF' }} cursor={{fill: 'rgba(0, 169, 255, 0.1)'}} />
                <Bar dataKey="count" fill="#8884d8" background={{ fill: 'rgba(255,255,255,0.05)' }}>
                    {vulnerabilityChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Bar>
            </BarChart>
        </ChartContainer>
      </div>
      
       {insightVulnerability && <div className="bg-brand-dark/50 border border-brand-primary/20 p-6 rounded-xl mb-12">
            <div className="flex items-center mb-4">
                <BoltIcon className="w-6 h-6 text-brand-primary mr-3 flex-shrink-0" />
                <h3 className="text-xl font-bold text-white">AI Insight: Top Priority</h3>
            </div>
            <p className="text-brand-gray mb-4">We've detected a {insightVulnerability.severity.toLowerCase()} issue in the <strong className="text-white">{insightVulnerability.category}</strong> scan: <strong className="text-white">{insightVulnerability.vulnerabilityName}</strong>. This is a top priority to address.</p>
             
            {!aiResponse && (
                <button 
                    onClick={handleGenerateScript}
                    disabled={isLoading}
                    className="mt-auto flex items-center justify-center bg-brand-primary/80 text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <SpinnerIcon className="w-5 h-5 mr-2 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        'Generate Remediation Script →'
                    )}
                </button>
            )}

            {error && <p className="mt-4 text-red-400">{error}</p>}
            
            {aiResponse && <AiRemediation response={aiResponse} />}
        </div>}
        
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                 <h2 className="text-3xl font-bold text-white">Full Scan Results</h2>
                 <div className="flex items-center space-x-2 bg-brand-dark/50 border border-brand-primary/20 p-1 rounded-lg">
                    {filters.map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${filter === f ? 'bg-brand-primary text-white' : 'text-brand-gray hover:bg-brand-primary/20'}`}>
                            {f}
                        </button>
                    ))}
                 </div>
            </div>
            {filteredFindings.length > 0 ? (
                <div className="space-y-6">
                    {filteredFindings.map((finding, index) => (
                        <FindingCard key={index} finding={finding} />
                    ))}
                </div>
            ) : (
                 <div className="text-center py-12 text-brand-gray">
                    <p>No findings for the selected category.</p>
                </div>
            )}
        </div>

    </div>
    );
};

export default DashboardPage;