import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2 text-foreground">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-8">M/S THEUNOiA LLP — Last Edited: 31.12.2025</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. Introduction & Legal Scope</h2>
            <p className="text-muted-foreground">
              These Terms & Conditions ("Terms") govern access to and use of the THEUNOiA platform ("Platform"), operated by M/S THEUNOiA LLP, a limited liability partnership incorporated under Indian law.
            </p>
            <p className="text-muted-foreground">
              By accessing, registering, or using the Platform, you agree to be legally bound by these Terms, the Privacy Policy, and all applicable laws including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Digital Personal Data Protection Act, 2023</li>
              <li>Information Technology Act, 2000</li>
              <li>Consumer Protection Act, 2019</li>
              <li>Copyright Act, 1957</li>
              <li>Arbitration and Conciliation Act, 1996</li>
            </ul>
            <p className="text-muted-foreground">
              If you do not agree, you must discontinue use of the Platform.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Definitions</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li><strong>Platform</strong> – THEUNOiA web and mobile application</li>
              <li><strong>User</strong> – Any registered individual or entity</li>
              <li><strong>Buyer / Business Owner</strong> – User purchasing services</li>
              <li><strong>Seller / Student Freelancer</strong> – User providing services</li>
              <li><strong>Contract</strong> – Fixed-price service agreement accepted on the Platform</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. Platform Role (Marketplace Disclaimer)</h2>
            <p className="text-muted-foreground">
              THEUNOiA acts solely as a technology intermediary and marketplace facilitator.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>THEUNOiA is not an employer, agent, partner, or guarantor</li>
              <li>THEUNOiA is not a party to contracts between Buyers and Freelancers</li>
              <li>All obligations, deliverables, and liabilities rest solely between users</li>
            </ul>
            <p className="text-muted-foreground text-sm italic">
              This clause mirrors globally accepted marketplace standards (e.g., Fiverr, Upwork).
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Eligibility & Account Responsibility</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Users must be 18 years or older</li>
              <li>Users under 18 require verifiable parental consent as per DPDP Act, 2023</li>
              <li>Users must provide accurate, current information</li>
              <li>Users are responsible for maintaining account security</li>
            </ul>
            <p className="text-muted-foreground">
              Fraud, chargebacks, or misrepresentation may result in suspension or termination.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">5. Contract Model</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Only fixed-price contracts are supported</li>
              <li>Hourly billing and time tracking are not supported</li>
              <li>Contracts become binding upon Buyer acceptance and payment</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">6. Payment Structure & Platform Fees</h2>
            
            <h3 className="text-xl font-medium text-foreground mt-4">6.1 Buyer Payment on Acceptance</h3>
            <p className="text-muted-foreground">
              Upon accepting a Freelancer's proposal, the Buyer must pay 100% of the contract value.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-4">6.2 Platform-Held Funds (Escrow-Style)</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>All payments are held securely by the Platform</li>
              <li>THEUNOiA is not a bank</li>
              <li>Funds are held only to facilitate secure transactions</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-4">6.3 Freelancer Payout & Commission</h3>
            <p className="text-muted-foreground">
              Upon successful completion and approval, payouts are processed with applicable platform commission.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-4">6.4 Payout Timeline</h3>
            <p className="text-muted-foreground">
              Payouts are released 2–5 working days after:
            </p>
            <ol className="list-decimal pl-6 text-muted-foreground space-y-1">
              <li>Work completion confirmation, and</li>
              <li>Successful Buyer payment</li>
            </ol>
            <p className="text-muted-foreground">
              Delays due to banks, gateways, holidays, or disputes are not attributable to THEUNOiA.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">7. Payment Gateway & Processing</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Payments are processed exclusively via Razorpay</li>
              <li>Supported methods include UPI, cards, wallets, net banking</li>
              <li>THEUNOiA does not store sensitive payment data</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">8. Non-Circumvention & Off-Platform Engagement</h2>
            <p className="text-muted-foreground">
              Users shall not bypass the Platform. Buyers and Freelancers must not:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Engage off-platform with the same party introduced via THEUNOiA</li>
              <li>Exchange contact details for external work</li>
              <li>Avoid platform fees</li>
            </ul>
            <p className="text-muted-foreground">
              This restriction applies during the engagement and for 12 months thereafter.
            </p>
            <p className="text-muted-foreground">Violations may result in:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Account termination</li>
              <li>Forfeiture of pending payouts</li>
              <li>Recovery of fees</li>
              <li>Legal action</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">9. Refund Policy & Dispute Resolution</h2>
            
            <h3 className="text-xl font-medium text-foreground mt-4">9.1 Grounds for Refund</h3>
            <p className="text-muted-foreground">Refunds may be requested if:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Work is incomplete</li>
              <li>Deliverables do not meet agreed scope</li>
              <li>Deadlines are missed without approval</li>
              <li>Quality is materially deficient</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-4">9.2 Dispute Resolution Committee (DRC)</h3>
            <p className="text-muted-foreground">
              All disputes are reviewed by THEUNOiA's internal Dispute Resolution Committee.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-4">9.3 Refund Rules</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Valid Buyer claims → partial or full refund</li>
              <li>Unreasonable Buyer rejection → payout may be released to Freelancer</li>
              <li>Platform fees may be refundable at DRC discretion</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-4">9.4 Refund Time Window</h3>
            <p className="text-muted-foreground">
              Disputes must be raised within 15 days of final delivery or contract end.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">10. Taxes, GST & TDS</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>All transactions are in INR</li>
              <li>GST applies to Platform commission fees</li>
              <li>Buyers may be responsible for TDS compliance</li>
              <li>THEUNOiA is not liable for user tax obligations</li>
            </ul>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">11. Intellectual Property</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Users retain ownership of their content</li>
              <li>Users grant THEUNOiA a worldwide, royalty-free license to host, display, and promote content</li>
              <li>Plagiarism or infringement may result in termination and legal action</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">12. Community Guidelines</h2>
            <p className="text-muted-foreground">Users must:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Communicate respectfully</li>
              <li>Avoid harassment, hate speech, or abuse</li>
              <li>Follow Indian IT laws</li>
            </ul>
            <p className="text-muted-foreground">
              Violations may lead to warnings, suspension, or termination.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">13. Service Availability</h2>
            <p className="text-muted-foreground">
              THEUNOiA does not guarantee uninterrupted availability. Downtime may occur due to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Maintenance</li>
              <li>Technical failures</li>
              <li>Force majeure events</li>
            </ul>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">14. Limitation of Liability</h2>
            <p className="text-muted-foreground">To the maximum extent permitted by law:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>THEUNOiA is not liable for indirect or consequential damages</li>
              <li>Total liability shall not exceed Platform fees paid in the last 6 months</li>
            </ul>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">15. Indemnification</h2>
            <p className="text-muted-foreground">
              Users agree to indemnify and hold harmless THEUNOiA against:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Contract breaches</li>
              <li>User disputes</li>
            </ul>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">16. Arbitration & Governing Law</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Parties agree to mediation → arbitration before litigation</li>
              <li>Arbitration under Arbitration and Conciliation Act, 1996</li>
              <li>Seat: Maharashtra</li>
              <li>Governing law: Indian Law</li>
            </ul>
          </section>

          {/* Section 17 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">17. Amendments & Final Provisions</h2>
            <p className="text-muted-foreground">
              THEUNOiA may update these Terms at any time. Continued use of the Platform constitutes acceptance of revised Terms.
            </p>
          </section>

          {/* Section 18 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">18. Contact Details</h2>
            <address className="not-italic text-muted-foreground">
              <p className="font-medium">M/S THEUNOiA LLP</p>
              <p>C/O Nilkanth, Laxmi Nagar</p>
              <p>Chandrapur, Maharashtra – 442403</p>
              <p>India</p>
              <p className="mt-2">
                📧 <a href="mailto:support@theunoia.com" className="text-primary hover:underline">support@theunoia.com</a>
              </p>
            </address>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
