import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface AgreementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "client" | "freelancer" | "terms";
}

const clientAgreement = `
# THEUNOiA LLP - CLIENT SERVICE AGREEMENT

This Client Service Agreement is made and executed between THEUNOiA LLP and Client.

## 1. Parties

This Agreement is entered into between:

**THEUNOiA LLP**, a Limited Liability Partnership registered under the Limited Liability Partnership Act, 2008, having its registered office at C/O NILKANTH, LAXMI NAGAR, CHANDRAPUR, MAHARASHTRA - 442401

AND

**Client** (You)

## 2. Scope of Services

- THEUNOiA LLP shall connect the Client with suitable student freelancers for assignments, projects, or professional services.
- THEUNOiA LLP acts as a facilitator and service provider, not as the executor of the work.

## 3. Project Details

- The project shall be awarded through a bidding process.
- It is expressly agreed that THEUNOiA LLP shall charge the Client a service commission of three percent (3%) on the base project value finalized between the Client and THEUNOiA LLP.
- In addition to the above commission, Goods and Services Tax (GST) at the applicable rate, currently eighteen percent (18%), shall be levied on the base project amount.
- The Client acknowledges that the commission and GST charged are lawful, mandatory, and non-negotiable.

## 4. Contract Value & Payment Understanding

- THEUNOiA LLP shall charge 5% (five percent) commission from the Client on the total contract value.
- Payments shall be made to THEUNOiA LLP, which will release the Freelancer's payment after deducting applicable commissions.

## 5. Client Obligations

- The Client shall provide clear instructions, requirements, and timelines.
- The Client shall not directly engage or pay the Freelancer outside THEUNOiA LLP during or after the project period.
- The Client shall review and approve work within a reasonable time.

## 6. Dispute Resolution & Authority

- In case of any dispute related to quality, delivery, payment, delay, or misunderstanding between the Client and the Freelancer, ONLY THEUNOiA LLP shall intervene and resolve the issue.
- The Client agrees to cooperate fully with THEUNOiA LLP during dispute resolution.
- THEUNOiA's decision shall be final and binding.

## 7. Limitation of Liability

- THEUNOiA LLP shall not be responsible for any indirect or consequential loss.
- THEUNOiA's role is limited to facilitation, payment management, and dispute resolution.

## 8. Termination

- THEUNOiA LLP reserves the right to terminate the Agreement if the Client violates terms or misuses the platform.
- Pending dues must be cleared upon termination.

## 9. Governing Law

This Agreement shall be governed by and interpreted in accordance with the laws of India, and courts at Chandrapur shall have exclusive jurisdiction.

## Non-Circumvention, Misconduct & Platform Rights Clause

Any attempt by the Client or the Freelancer to bypass THEUNOiA LLP, including direct engagement, payment, or communication outside the platform for the same or related work, shall be treated as a material breach of this Agreement. In such cases, THEUNOiA LLP shall not be responsible for any loss, fraud, misrepresentation, or damage suffered by either party. THEUNOiA LLP reserves the right to take appropriate action, including suspension or permanent banning of the concerned account, recovery of losses, and initiation of legal proceedings as per applicable laws of India.

## 10. Acceptance

By checking the agreement checkbox while posting a project, the Client confirms agreement to all terms stated herein.

---

**Contact:** official@theunoia.com | +91 6372414583
`;

const freelancerAgreement = `
# THEUNOiA LLP - FREELANCER AGREEMENT

This Freelancer Agreement is made and executed between THEUNOiA LLP and Student Freelancer.

## 1. Parties

This Agreement is entered into between:

**THEUNOiA LLP**, a Limited Liability Partnership registered under the Limited Liability Partnership Act, 2008, having its registered office at C/O NILKANTH, LAXMI NAGAR, CHANDRAPUR, MAHARASHTRA - 442401

AND

**Freelancer** (You)

## 2. Nature of Work

2.1 The Freelancer agrees to provide freelance services including assignments, projects, academic work, technical work, creative work, or any other services allotted through THEUNOiA LLP.

2.2 The Freelancer is an "independent contractor" and not an employee of THEUNOiA LLP.

## 3. Project Details

- The project shall be awarded through a bidding process.
- THEUNOiA LLP shall be entitled to charge a commission of five percent (5%) on the total project value as accepted or finalized through the bidding or approval process.
- Upon acceptance of the bid or finalization of the project amount, THEUNOiA LLP shall deduct five percent (5%) of the agreed project value as its commission, and the remaining amount, after such deduction, shall be released to the concerned student freelancer.
- The student freelancer expressly agrees that the commission charged by THEUNOiA LLP is towards platform facilitation, client acquisition, administrative support, compliance handling, and operational coordination.

## 4. Contract Value & Payment Terms

4.1 THEUNOiA LLP shall charge 3% (three percent) commission from the Freelancer on the total contract value.

4.2 The remaining amount shall be payable to the Freelancer after successful completion of work and approval by the Client.

4.3 Payments shall be processed only through THEUNOiA's approved payment method.

## 5. Obligations of the Freelancer

5.1 The Freelancer shall complete the work honestly, independently, and within the agreed timeline.

5.2 The Freelancer shall not share any client data, work material, or project details with third parties.

5.3 Any delay or failure in work must be immediately informed to THEUNOiA LLP.

## 6. Dispute Resolution & Authority

6.1 In case of any dispute, misunderstanding, delay, non-payment, or quality related issue between the Client and the Freelancer, ONLY THEUNOiA LLP shall have the authority to intervene, mediate, and resolve the matter.

6.2 The decision of THEUNOiA LLP shall be final and binding on the Freelancer.

## 7. Termination

7.1 THEUNOiA LLP reserves the right to terminate this Agreement in case of misconduct, breach of terms, or non-performance.

7.2 Upon termination, pending payments shall be settled after deducting applicable commission.

## 8. Acknowledgement

8.1 The Parties hereby acknowledge that they have read, understood, and agree to strictly adhere to all the terms and conditions.

8.2 Any modification or amendment to this Agreement shall be valid only if made in writing and duly approved by THEUNOiA LLP.

8.3 The Parties agree not to bypass or circumvent THEUNOiA LLP by engaging directly with each other for the same or similar work during the term of this Agreement.

## Non-Circumvention, Misconduct & Platform Rights Clause

Any attempt by the Client or the Freelancer to bypass THEUNOiA LLP, including direct engagement, payment, or communication outside the platform for the same or related work, shall be treated as a material breach of this Agreement. In such cases, THEUNOiA LLP shall not be responsible for any loss, fraud, misrepresentation, or damage suffered by either party. THEUNOiA LLP reserves the right to take appropriate action, including suspension or permanent banning of the concerned account, recovery of losses, and initiation of legal proceedings as per applicable laws of India.

## 9. Acceptance

By checking the agreement checkbox while placing a bid, the Freelancer confirms that they have read, understood, and agreed to all the terms of this Agreement.

---

**Contact:** official@theunoia.com | +91 6372414583
`;

const termsConditions = `
# TERMS & CONDITIONS

## M/S THEUNOiA LLP

Last Edited Date: 31.12.2025

## 1. Introduction & Legal Scope

These Terms & Conditions ("Terms") govern access to and use of the THEUNOiA platform ("Platform"), operated by M/S THEUNOiA LLP, a limited liability partnership incorporated under Indian law.

By accessing, registering, or using the Platform, you agree to be legally bound by these Terms, the Privacy Policy, and all applicable laws including but not limited to:

- Digital Personal Data Protection Act, 2023
- Information Technology Act, 2000
- Consumer Protection Act, 2019
- Copyright Act, 1957
- Arbitration and Conciliation Act, 1996

If you do not agree, you must discontinue use of the Platform.

## 2. Definitions

- Platform – THEUNOiA web and mobile application
- User – Any registered individual or entity
- Buyer / Business Owner – User purchasing services
- Seller / Student Freelancer – User providing services
- Contract – Fixed-price service agreement accepted on the Platform

## 3. Platform Role (Marketplace Disclaimer)

THEUNOiA acts solely as a technology intermediary and marketplace facilitator.

- THEUNOiA is not an employer, agent, partner, or guarantor
- THEUNOiA is not a party to contracts between Buyers and Freelancers
- All obligations, deliverables, and liabilities rest solely between users

## 4. Eligibility & Account Responsibility

- Users must be 18 years or older
- Users under 18 require verifiable parental consent as per DPDP Act, 2023
- Users must provide accurate, current information
- Users are responsible for maintaining account security

Fraud, chargebacks, or misrepresentation may result in suspension or termination.

## 5. Contract Model

- Only fixed-price contracts are supported
- Hourly billing and time tracking are not supported
- Contracts become binding upon Buyer acceptance and payment

## 6. Payment Structure & Platform Fees

### 6.1 Buyer Payment on Acceptance

Upon accepting a Freelancer's proposal, the Buyer must pay 100% of the contract value.

### 6.2 Platform-Held Funds (Escrow-Style)

- All payments are held securely by the Platform
- THEUNOiA is not a bank
- Funds are held only to facilitate secure transactions

### 6.3 Freelancer Payout & Commission

Upon successful completion and approval, payouts are processed.

### 6.4 Payout Timeline

Payouts are released 2–5 working days after work completion confirmation and successful Buyer payment.

Delays due to banks, gateways, holidays, or disputes are not attributable to THEUNOiA.

## 7. Payment Gateway & Processing

- Payments are processed exclusively via Razorpay
- Supported methods include UPI, cards, wallets, net banking
- THEUNOiA does not store sensitive payment data

## 8. Non-Circumvention & Off-Platform Engagement

Users shall not bypass the Platform. Buyers and Freelancers must not:

- Engage off-platform with the same party introduced via THEUNOiA
- Exchange contact details for external work
- Avoid platform fees

This restriction applies during the engagement and for 12 months thereafter.

Violations may result in account termination, forfeiture of pending payouts, recovery of fees, and legal action.

## 9. Refund Policy & Dispute Resolution

### 9.1 Grounds for Refund

Refunds may be requested if work is incomplete, deliverables do not meet agreed scope, deadlines are missed without approval, or quality is materially deficient.

### 9.2 Dispute Resolution Committee (DRC)

All disputes shall be reviewed by the DRC.

### 9.3 Refund Rules

- Valid Buyer claims → partial or full refund
- Unreasonable Buyer rejection → payout may be released to Freelancer

### 9.4 Refund Time Window

Disputes must be raised within 15 days of final delivery or contract end.

## 10. Taxes, GST & TDS

- All transactions are in INR
- GST applies to Platform commission fees
- Buyers may be responsible for TDS compliance
- THEUNOiA is not liable for user tax obligations

## 11. Intellectual Property

- Users retain ownership of their content
- Users grant THEUNOiA a worldwide, royalty-free license to host, display, and promote content
- Plagiarism or infringement may result in termination and legal action

## 12. Community Guidelines

Users must communicate respectfully, avoid harassment, hate speech, or abuse, and follow Indian IT laws. Violations may lead to warnings, suspension, or termination.

## 13. Service Availability

THEUNOiA does not guarantee uninterrupted availability. Downtime may occur due to maintenance, technical failures, or force majeure events.

## 14. Limitation of Liability

To the maximum extent permitted by law, THEUNOiA is not liable for indirect or consequential damages. Total liability shall not exceed Platform fees paid in the last 6 months.

## 15. Indemnification

Users agree to indemnify and hold harmless THEUNOiA against contract breaches, user disputes, legal violations, and IP infringement claims.

## 16. Arbitration & Governing Law

- Parties agree to mediation → arbitration before litigation
- Arbitration under Arbitration and Conciliation Act, 1996
- Seat: Maharashtra
- Governing law: Indian Law

## 17. Amendments & Final Provisions

THEUNOiA may update these Terms at any time. Continued use of the Platform constitutes acceptance of revised Terms.

## 18. Contact Details

M/S THEUNOiA LLP
C/O Nilkanth, Laxmi Nagar
Chandrapur, Maharashtra – 442403, India

📧 support@theunoia.com

---

**Contact:** official@theunoia.com | +91 6372414583
`;

export function AgreementDialog({ open, onOpenChange, type }: AgreementDialogProps) {
  const content = type === "client" ? clientAgreement : type === "freelancer" ? freelancerAgreement : termsConditions;
  const title = type === "client" ? "Client Service Agreement" : type === "freelancer" ? "Freelancer Agreement" : "Terms & Conditions";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {content.split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return <h1 key={index} className="text-xl font-bold mt-6 mb-3 text-foreground">{line.replace('# ', '')}</h1>;
              } else if (line.startsWith('## ')) {
                return <h2 key={index} className="text-lg font-semibold mt-5 mb-2 text-foreground">{line.replace('## ', '')}</h2>;
              } else if (line.startsWith('- ')) {
                return <li key={index} className="ml-4 text-muted-foreground">{line.replace('- ', '')}</li>;
              } else if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={index} className="font-semibold text-foreground">{line.replace(/\*\*/g, '')}</p>;
              } else if (line.startsWith('---')) {
                return <hr key={index} className="my-4 border-border" />;
              } else if (line.trim()) {
                return <p key={index} className="text-muted-foreground mb-2">{line}</p>;
              }
              return null;
            })}
          </div>
        </ScrollArea>
        <div className="flex justify-end pt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
