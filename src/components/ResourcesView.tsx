import React from 'react';
import { BookOpen, FileText, Shield, Globe, ExternalLink, Download } from 'lucide-react';

export const ResourcesView: React.FC = () => {
  const resources = [
    {
      title: 'Ondo Finance Whitepaper & Documentation',
      desc: 'Technical architecture, tokenomics, and smart contract specs for USDY, OUSG, and Ondo Stocks.',
      category: 'Documentation',
      icon: BookOpen,
      link: 'https://docs.ondo.finance',
    },
    {
      title: 'Smart Contract Security Audits',
      desc: 'Comprehensive security audits performed by leading Web3 security firms including OpenZeppelin and Cyfrin.',
      category: 'Security',
      icon: Shield,
      link: 'https://ondo.finance/audits',
    },
    {
      title: 'USDY Proof of Reserves & Attestations',
      desc: 'Daily independent auditing reports confirming short-term US Treasury backing.',
      category: 'Attestations',
      icon: FileText,
      link: 'https://ondo.finance/usdy',
    },
    {
      title: 'Ondo Tokenized Stocks Prospectus',
      desc: 'Legal framework and regulatory compliance details for tokenized equity products.',
      category: 'Legal',
      icon: Globe,
      link: 'https://ondo.finance/legal',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
          Ondo Resources & Documentation
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Explore whitepapers, security audit reports, daily reserve attestations, and developer guides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-gray-100 text-gray-900 flex items-center justify-center font-bold group-hover:bg-black group-hover:text-white transition-colors">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-gray-900 hover:text-blue-600 flex items-center gap-1.5"
                >
                  <span>View Documentation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
