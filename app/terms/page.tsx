import type { Metadata } from "next";
import Link from "next/link";
import { LegalContact, LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Terms | Briggs Digital Solutions",
  description: "Terms governing use of the Briggs Digital Solutions website.",
};

const contents = [
  { id: "about-terms", label: "About these terms" },
  { id: "about-briggs", label: "About Briggs" },
  { id: "using-site", label: "Using the website" },
  { id: "content", label: "Website content" },
  { id: "enquiries", label: "Project enquiries" },
  { id: "estimates", label: "Estimates and examples" },
  { id: "intellectual-property", label: "Intellectual property" },
  { id: "portfolio", label: "Portfolio material" },
  { id: "external-links", label: "Third-party links" },
  { id: "availability", label: "Availability" },
  { id: "liability", label: "Liability" },
  { id: "privacy", label: "Privacy" },
  { id: "changes", label: "Changes to these terms" },
  { id: "law", label: "Governing law" },
  { id: "contact", label: "Contact" },
] as const;

export default function TermsPage() {
  return (
    <LegalPage
      label="TERMS"
      title="WEBSITE TERMS"
      intro="These terms govern your use of briggsdigitalsolutions.com. They apply to the website itself and are not a client-services contract."
      contents={contents}
      relatedHref="/privacy"
      relatedLabel="Privacy Policy"
    >
      <LegalSection number="01" id="about-terms" title="About these terms">
        <p>By using this website, you agree to these website terms. If you do not agree, please do not use the website.</p>
        <p>These terms concern access to and use of the website. Any design, development or other client work will be subject to separately agreed project documents where applicable.</p>
      </LegalSection>

      <LegalSection number="02" id="about-briggs" title="About Briggs Digital Solutions">
        <p>Briggs Digital Solutions is a digital design and development business based in Belfast, Northern Ireland. You can contact Briggs at <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a>.</p>
      </LegalSection>

      <LegalSection number="03" id="using-site" title="Using the website">
        <p>You may use the website for lawful purposes. You must not:</p>
        <ul>
          <li>attempt to gain unauthorised access to the website, its server or connected systems;</li>
          <li>damage, disable, overload or disrupt the website or another person’s use of it;</li>
          <li>introduce malware or other harmful code;</li>
          <li>use abusive automated requests, scraping or similar activity that interferes with the service; or</li>
          <li>use the website in a way that is unlawful or infringes another person’s rights.</li>
        </ul>
      </LegalSection>

      <LegalSection number="04" id="content" title="Website content">
        <p>The website provides general information about Briggs Digital Solutions, its approach, capabilities and examples of digital systems. Content may be updated, corrected or removed without notice.</p>
        <p>Examples of features, workflows and system configurations illustrate what may be possible. Unless the website clearly says otherwise, they should not be treated as a promise that every feature is part of a completed client project or will be suitable for every business.</p>
      </LegalSection>

      <LegalSection number="05" id="enquiries" title="Project enquiries">
        <p>Submitting the Start a Project form sends an enquiry only. It does not automatically create a client relationship or binding contract, and it does not guarantee that Briggs will be available, accept the project or offer any particular price or timescale.</p>
        <p>If a project proceeds, its scope, deliverables, price, responsibilities and other terms should be set out in a separate proposal, statement of work or contract agreed by the relevant parties. These website terms do not invent or replace those project-specific terms.</p>
      </LegalSection>

      <LegalSection number="06" id="estimates" title="Estimates and example information">
        <p>Investment ranges selected in the enquiry form are provided to help a visitor indicate an approximate budget. They are not quotes. References to example systems, integrations, automations, functionality or delivery stages are illustrative.</p>
        <p>Final scope, feasibility, timing and pricing depend on the requirements agreed for a particular project.</p>
      </LegalSection>

      <LegalSection number="07" id="intellectual-property" title="Intellectual property">
        <p>Briggs branding, original written content, original website design and original materials created for this website are protected by intellectual-property law. You may view and use the website for personal or internal business information, but you may not reproduce, republish or commercially exploit protected material without permission unless the law allows it.</p>
        <p>This does not claim ownership of third-party trademarks, open-source software, client-owned content, photography, music or other material belonging to their respective owners.</p>
      </LegalSection>

      <LegalSection number="08" id="portfolio" title="Portfolio and client material">
        <p>The website displays David Browne Murray project material. Relevant personal names, trading names, trademarks, photography, music, written content and other client materials remain the property of their respective owners where applicable.</p>
        <p>Displaying that work describes Briggs’ involvement in the digital project; it does not imply ownership of the client’s identity, performances, music or underlying content.</p>
      </LegalSection>

      <LegalSection number="09" id="external-links" title="Third-party links">
        <p>The website may link to external websites for convenience or to show relevant work. Briggs does not control those websites and is not responsible for their availability, content or privacy practices. A link does not by itself amount to an endorsement of everything on the external website.</p>
      </LegalSection>

      <LegalSection number="10" id="availability" title="Website availability">
        <p>Briggs takes reasonable steps to keep the website available and accurate, but does not guarantee uninterrupted or error-free access. Access may occasionally be suspended or limited for maintenance, security, hosting issues or circumstances outside Briggs’ reasonable control.</p>
      </LegalSection>

      <LegalSection number="11" id="liability" title="Liability">
        <p>The website’s content is general information about Briggs and its capabilities. You should not treat it as professional advice tailored to your circumstances. To the extent permitted by law, Briggs is not responsible for losses caused solely by reliance on general website content, misuse of the website, or an external website Briggs does not control.</p>
        <p>These limitations do not apply to liability that cannot lawfully be excluded or limited, including liability for fraud or fraudulent misrepresentation, or death or personal injury caused by negligence. They do not remove mandatory consumer rights and do not govern liability under a separately agreed client contract.</p>
      </LegalSection>

      <LegalSection number="12" id="privacy" title="Privacy">
        <p>The <Link href="/privacy">Privacy Policy</Link> explains how personal information is handled when you visit the website or submit a project enquiry.</p>
      </LegalSection>

      <LegalSection number="13" id="changes" title="Changes to these terms">
        <p>These terms may be updated to reflect changes to the website, the business or applicable law. The latest revision date will be shown at the top of this page. Continued use after an update means the current version applies to that use.</p>
      </LegalSection>

      <LegalSection number="14" id="law" title="Governing law and jurisdiction">
        <p>These website terms are governed by the laws of Northern Ireland. The courts of Northern Ireland will have jurisdiction over disputes relating to these terms, except where mandatory consumer law gives you the right to rely on another law or bring proceedings elsewhere.</p>
        <p>Nothing in these terms is intended to remove statutory rights that cannot lawfully be excluded.</p>
      </LegalSection>

      <LegalSection number="15" id="contact" title="Contact">
        <LegalContact label="Website enquiries" />
      </LegalSection>
    </LegalPage>
  );
}
