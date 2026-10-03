import type { Metadata } from "next";
import Link from "next/link";
import { LegalContact, LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { createPageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/lib/site";
import styles from "@/components/legal/LegalPage.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy information for visitors and project enquiries submitted through Briggs Digital Solutions.",
  path: "/privacy",
});

const contents = [
  { id: "who-we-are", label: "Who we are" },
  { id: "information", label: "Information we collect" },
  { id: "use", label: "How we use information" },
  { id: "lawful-basis", label: "Lawful basis" },
  { id: "form-processing", label: "How the form is processed" },
  { id: "sharing", label: "Sharing and processors" },
  { id: "transfers", label: "International transfers" },
  { id: "retention", label: "Retention" },
  { id: "security", label: "Data security" },
  { id: "rights", label: "Your rights" },
  { id: "complaints", label: "Complaints" },
  { id: "cookies", label: "Cookies and analytics" },
  { id: "external-links", label: "Third-party links" },
  { id: "changes", label: "Changes to this notice" },
  { id: "contact", label: "Contact" },
] as const;

export default function PrivacyPage() {
  return (
    <LegalPage
      label="PRIVACY"
      title="PRIVACY POLICY"
      intro="This notice explains how Briggs Digital Solutions collects, uses and protects personal information when you visit this website or submit a project enquiry."
      contents={contents}
      relatedHref="/terms"
      relatedLabel="Website Terms"
    >
      <LegalSection number="01" id="who-we-are" title="Who we are">
        <p>Briggs Digital Solutions is a digital design and development business based in Belfast, Northern Ireland. For the personal information described in this notice, Briggs Digital Solutions is the data controller. This means Briggs decides why and how that information is used.</p>
        <p>You can contact Briggs at <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a>.</p>
      </LegalSection>

      <LegalSection number="02" id="information" title="Information we collect">
        <h3>Information you provide</h3>
        <p>The Start a Project form asks for:</p>
        <ul>
          <li>your name and email address;</li>
          <li>your business or organisation and any existing website;</li>
          <li>the project types you select;</li>
          <li>your project description;</li>
          <li>your selected investment range; and</li>
          <li>your preferred timeline.</li>
        </ul>
        <p>Business name, existing website, investment range and timeline may be left blank. If you email Briggs directly, Briggs receives the information you include in that correspondence.</p>
        <h3>Technical information</h3>
        <p>The website is hosted by Vercel. Like other hosting platforms, Vercel processes technical request information needed to deliver and protect the website. This may include an IP address, request time, requested page, browser or device information, response status and error or security logs. The Briggs application does not add visitor analytics or behavioural tracking.</p>
      </LegalSection>

      <LegalSection number="03" id="use" title="How we use information">
        <p>Project-enquiry information is used to:</p>
        <ul>
          <li>receive and respond to your enquiry;</li>
          <li>understand and assess the project you describe;</li>
          <li>communicate with you about possible work;</li>
          <li>prepare appropriate next steps or a proposal where relevant; and</li>
          <li>maintain necessary business correspondence and records.</li>
        </ul>
        <p>Technical request information is used to operate, secure and troubleshoot the website. The form does not subscribe you to marketing, and the website does not use your enquiry for automated decision-making or profiling.</p>
      </LegalSection>

      <LegalSection number="04" id="lawful-basis" title="Lawful basis">
        <p>Under the UK GDPR, Briggs needs a lawful basis for each use of personal information.</p>
        <dl className={styles.basisList}>
          <div><dt>Steps before a contract</dt><dd>Where you enquire on your own behalf about work you may commission, processing the enquiry can be necessary to take steps you requested before entering into a contract, such as discussing scope or preparing a proposal.</dd></div>
          <div><dt>Legitimate interests</dt><dd>Briggs has a legitimate interest in answering genuine business enquiries, assessing potential work, keeping proportionate correspondence, operating the website and protecting it from misuse. Briggs balances those interests against your rights and uses only information reasonably needed for those purposes.</dd></div>
          <div><dt>Legal obligations</dt><dd>Information may be used or retained where necessary to meet a legal obligation, respond to a lawful request or maintain records required by law.</dd></div>
        </dl>
        <p>Briggs does not rely on consent for the project-enquiry processing described above.</p>
      </LegalSection>

      <LegalSection number="05" id="form-processing" title="How the form is processed">
        <p>The form sends your information to a server-side route in the Next.js website. The route validates the submission before forwarding a structured email through Briggs-controlled Postal mail infrastructure. The notification is addressed to <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a>, and replies are directed to the email address you provided.</p>
        <p>Vercel hosts and runs the website and its server-side form route. Form contents are not deliberately placed in browser storage, and the website code does not send them to an analytics service or advertising platform.</p>
      </LegalSection>

      <LegalSection number="06" id="sharing" title="Sharing and processors">
        <p>Personal information is not sold. It is available to Briggs and may be processed by service infrastructure needed to run the website and deliver the enquiry:</p>
        <ul>
          <li><strong>Vercel</strong>, which hosts the website and executes the server-side enquiry route; and</li>
          <li><strong>Briggs-controlled Postal and business email infrastructure</strong>, which sends and receives the enquiry notification.</li>
        </ul>
        <p>Information may also be disclosed where required by law or where reasonably necessary to establish, exercise or defend legal rights. The public repository does not identify a separate CRM, enquiry database or marketing processor.</p>
      </LegalSection>

      <LegalSection number="07" id="transfers" title="International transfers">
        <p>Vercel is based in the United States and states that its services may process information in the United States and other locations. When a provider processes personal information outside the UK, Briggs will only permit the transfer where UK data-protection law allows it and will use the applicable safeguards or other lawful transfer basis available under the provider arrangement.</p>
        <p>You can contact Briggs if you would like more information about safeguards relevant to your information.</p>
      </LegalSection>

      <LegalSection number="08" id="retention" title="How long we keep information">
        <p>Project enquiries and related correspondence are kept only for as long as reasonably needed to respond, assess potential work, manage any resulting business relationship, maintain necessary records, and establish or defend legal rights. When information is no longer needed for those purposes, it should be deleted or securely anonymised.</p>
        <p>Technical logs are retained according to operational, security and provider settings, for no longer than needed for those purposes. Briggs has not published a fixed retention schedule in this repository, so the site owner should review and document the operational periods used in practice.</p>
      </LegalSection>

      <LegalSection number="09" id="security" title="Data security">
        <p>Briggs uses reasonable technical and organisational safeguards appropriate to the website and enquiry process. These include server-side validation, encrypted HTTPS transmission and restricted server-side access to delivery credentials. No internet service or email system can be guaranteed completely secure.</p>
      </LegalSection>

      <LegalSection number="10" id="rights" title="Your data-protection rights">
        <p>Depending on the circumstances and the lawful basis involved, UK data-protection law may give you the right to:</p>
        <ul>
          <li>ask for access to your personal information;</li>
          <li>ask for inaccurate or incomplete information to be corrected;</li>
          <li>ask for information to be erased;</li>
          <li>ask for processing to be restricted;</li>
          <li>object to processing based on legitimate interests; and</li>
          <li>receive information you provided in a portable format where the legal conditions apply.</li>
        </ul>
        <p>These rights are not absolute and can depend on why the information is being used. The enquiry processing described in this notice does not rely on consent; if Briggs ever asks for consent for a separate purpose, you may withdraw that consent without affecting earlier lawful processing.</p>
        <p>To make a request, email <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a>. Briggs may need enough information to verify your identity and understand the request.</p>
      </LegalSection>

      <LegalSection number="11" id="complaints" title="Complaints">
        <p>If you are concerned about how Briggs has handled your information, please contact <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a> first so the concern can be investigated.</p>
        <p>You also have the right to complain to the UK Information Commissioner’s Office. Current guidance and the complaint route are available on the <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">ICO website</a>.</p>
      </LegalSection>

      <LegalSection number="12" id="cookies" title="Cookies, storage and analytics">
        <p>As at the last-updated date, the Briggs website application does not set analytics or advertising cookies, use localStorage or sessionStorage, include tracking pixels, or load embedded marketing services. It does not use Google Analytics or another visitor analytics package.</p>
        <p>No cookie-consent banner is shown because the current website does not implement non-essential browser storage. Infrastructure used to deliver or protect the website may process ordinary request data as described above. If non-essential cookies, storage or tracking are added later, this notice and the site’s consent controls will need to be updated before those technologies are used.</p>
      </LegalSection>

      <LegalSection number="13" id="external-links" title="Third-party links">
        <p>The website contains links to websites Briggs does not control, including a featured project website and official regulatory information. Those websites are responsible for their own content and privacy practices. You should review their privacy information before providing personal information to them.</p>
      </LegalSection>

      <LegalSection number="14" id="changes" title="Changes to this notice">
        <p>This notice may be updated when the website, enquiry process, service providers or legal requirements change. The latest revision date will be shown at the top of this page.</p>
        <p>You can also read the <Link href="/terms">Website Terms</Link>.</p>
      </LegalSection>

      <LegalSection number="15" id="contact" title="Contact">
        <LegalContact />
      </LegalSection>
    </LegalPage>
  );
}
