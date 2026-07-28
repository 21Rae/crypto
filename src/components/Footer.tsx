import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-500 font-sans mt-20 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Links Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-gray-100 text-xs font-semibold text-gray-900">
          <div className="flex items-center gap-8">
            <span className="font-bold tracking-tight text-gray-900">Ondo © 2026</span>
            <a href="#terms" className="hover:text-gray-600 transition-colors">
              Terms of Service
            </a>
            <a href="#privacy" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </a>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            {/* Close / X icon */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 hover:text-black transition-colors"
              aria-label="X / Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* GitHub icon */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 hover:text-black transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Legal Disclaimer Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-[10.5px] leading-[1.65] text-gray-500 font-normal">
          {/* Main disclaimers (8 or 9 cols) */}
          <div className="lg:col-span-8 space-y-4 text-justify">
            <p>
              [1] The tokenized assets referenced herein (i.e. (i) the tokenized stocks, tokenized ETFs, and tokenized ADRs, now known as Ondo Stocks, and formerly known as Ondo Tokenized Stocks and ETFs, or as Ondo Global Markets Tokens, (collectively, the &quot;Ondo Stocks&quot;); and (ii) USDY tokens, (together with Ondo Stocks, the &quot;Tokens&quot;)) have not been registered under the US Securities Act of 1933, as amended (the &quot;Act&quot;) or the securities or financial instrument laws of any other jurisdiction. The Tokens may not be offered or sold in the United States or to US persons, unless registered under the Act or an exemption requirements thereunder is available. Tokens&apos; availability in certain jurisdictions, including the United Kingdom, Switzerland and (for certain Tokens) the European Economic Area (&quot;EEA&quot;), the Ondo Stocks, and USDY tokens are offered and sold only to qualified investors or institutional clients, as the case may be (or that jurisdiction&apos;s analogue thereof). Other jurisdiction-based restrictions apply. The issuer of the Tokens is not registered as an investment company under the US Investment Company Act of 1940, as amended, or as an Alternative Investment Fund or Undertaking for Collective Investment in Transferable Securities in the EEA, or under the securities or financial instrument laws of any other jurisdiction.
            </p>

            <p>
              Ondo Stocks provide their holders with economic exposure to the value of their underlying assets, including the value of dividends (less relevant withholding taxes), but do not confer voting rights on the underlying asset. Ondo Stocks do not provide their holders with rights to hold or receive their respective underlying assets. Similarly, USDY tokens provide their holders with economic exposure to short-term US treasuries, or related ETFs, but USDY tokens are not themselves US treasuries, and do not provide their holders with rights to hold US treasuries.
            </p>

            <p>
              In the EEA/UK, certain Tokens are offered to both Professional and Retail investors. A base prospectus relating to the Tokens, has been approved by the Financial Market Authority Liechtenstein (FMA) and notified, as the case may require, to certain EEA Member States (the &quot;Relevant EEA States&quot;). The prospectus is published at app.ondo.finance in respect of each applicable Token. The approval of the prospectus should not be understood as an endorsement of the Tokens. Prospective investors in the EEA/UK should read the prospectus, and the relevant final terms, and KID for each applicable Token, before making an investment decision in order to fully understand the potential risks and rewards associated with the decision to invest. This notice is a marketing communication and does not constitute a prospectus.
            </p>

            <p>
              Certain Ondo Stocks (referred to in the UAE as &apos;Digital Securities&apos;) have been admitted to trading on M2 Exchange Limited, a Multilateral Trading Facility for Digital Assets, regulated by Financial Services Regulatory Authority (&quot;FSRA&quot;) in the Abu Dhabi Global Market (&quot;ADGM&quot;), authorized by the Financial Services Regulatory Authority (the &quot;FSRA&quot;). Such Digital Securities are available for trading for those investors eligible for a Binance account. The ADGM FSRA has no responsibility for reviewing or verifying any documents in connection with the admission to trading of such Digital Securities on M2 Exchange Limited. The contents of the prospectus in connection with the admission to trading of the Digital Securities are the information set out in it and has no responsibility for it. No offer of securities is being made in ADGM. Prospective purchasers of such Digital Securities admitted to trading should conduct their own due diligence on such Digital Securities.
            </p>

            <p>
              In the United Kingdom, this communication herein may be deemed a financial promotion pursuant to Section 21 of the Financial Services and Markets Act 2000. To the extent this communication is made, the communications herein are only intended for, and directed at, investment professionals as defined in Article 19 of the Financial Services and Markets Act 2000 (Financial Promotion) Order 2005 (the &quot;FPO&quot;); high net worth companies, unincorporated associations etc. as defined in Article 49 of the FPO; or persons to whom it may otherwise lawfully be communicated (all such persons together being referred to as &quot;relevant persons&quot;). Any investment or investment activity to which this communication relates is available only to relevant persons and will be engaged in only with relevant persons. Any person who is not a relevant person should not act or rely on this communication or any of its contents. Ondo Global Markets (BVI) Limited does not enter into arrangements with such persons relative to Ondo Stocks and USDY tokens as a result of this or any other communication.
            </p>

            <p>
              The Tokens are issued by Ondo Global Markets (BVI) Limited, a British Virgin Islands business company. OUSG tokens are issued by Ondo I LP, a Delaware (USA) limited partnership (the &quot;Fund&quot;). Ondo Finance Inc, a Delaware (USA) corporation, provides administrative services to, and is an equity holder of, Ondo Global Markets (BVI) Limited.
            </p>

            <p>
              The Token issuers, their affiliates, their respective shareholders and members, and their respective directors, officers, employees, agents and representatives make no representation or warranty, express or implied, as to the accuracy or completeness of any information provided in connection with the Tokens or the platform, and express disclaim all liability. TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE TOKEN ISSUERS AND THE ONDO PERSONS SHALL NOT HAVE ANY LIABILITY WHATSOEVER WITH RESPECT TO ANYONE&apos;S USE OF, OR THIRD PARTY PRODUCTS, SERVICES OR SOFTWARE.
            </p>

            <p>
              Nothing herein constitutes an offer to sell, or any solicitation of an offer to buy, any Tokens. Nothing herein constitutes investment, legal, tax or financial advice. Acquiring the Tokens involves risks. A holder of the Tokens may incur losses, including total loss of their purchase price. Past performance is not an indication of future results. Investors are responsible for conducting their own research, investigation, analysis and evaluation of any decision to acquire Tokens.
            </p>

            <p>
              The communications herein may contain forward-looking statements, including, but not limited to, statements regarding future financial performance, business strategies, or expectations for the growth or development of Ondo Finance, Ondo Global Markets (BVI) Limited, or any of their respective affiliates (each, an &quot;Applicable Entity&quot;). These statements are based on management&apos;s current expectations, estimates, projections and assumptions, and are subject to risks, uncertainties and assumptions that could cause actual results to differ materially from those anticipated. Forward-looking statements can be identified by the use of terminology such as &quot;may&quot;, &quot;will&quot;, &quot;should&quot;, &quot;expects&quot;, &quot;plans&quot;, &quot;anticipates&quot;, &quot;believes&quot;, &quot;estimates&quot;, &quot;predicts&quot;, &quot;potential&quot;, &quot;continue&quot;, or the negative of these terms or other similar expressions.
            </p>

            <p>
              Additional terms and restrictions apply. See{' '}
              <a href="https://docs.ondo.finance" target="_blank" rel="noreferrer" className="underline hover:text-gray-800">
                https://docs.ondo.finance
              </a>{' '}
              and (as applicable) the Token offering documents for details.
            </p>

            <p>
              Brokerage services for the securities underlying the Tokens are provided to the Token issuer by Alpaca Securities LLC, member FINRA/SIPC, a wholly-owned subsidiary of AlpacaDB, Inc. Alpaca&apos;s disclosures can be found{' '}
              <a href="https://alpaca.markets" target="_blank" rel="noreferrer" className="underline hover:text-gray-800">
                here
              </a>.
            </p>
          </div>

          {/* Right Notice (4 cols) */}
          <div className="lg:col-span-4 pl-0 lg:pl-6 text-gray-500 font-normal text-justify leading-relaxed">
            <p>
              *The prices set forth herein are illustrative only and are not indicative of any buy or sell price that a person may pay or receive for any Ondo Stocks.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
