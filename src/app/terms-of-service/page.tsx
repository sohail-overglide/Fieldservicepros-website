import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Terms of Service — FieldService Pros",
  description: "Terms of Service for FieldService Pros, a Top Tempo Technical company.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "February 20, 2026";

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="FieldService Pros"
              width={160}
              height={36}
              className="h-12 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-500 transition-colors hover:text-[#0a0a0a]"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#019446]">
            Legal
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-[#0a0a0a]">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-10 text-[15px] leading-relaxed text-gray-700">
          <section>
            <p>
              Welcome to FieldService Pros, a platform operated by{" "}
              <strong>Top Tempo Technical</strong>. By accessing or using our website and
              services, you agree to be bound by these Terms of Service. Please read them
              carefully before proceeding.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using FieldService Pros, you confirm that you are at least
              18 years of age, have read and understood these Terms, and agree to be legally
              bound by them. If you are using the platform on behalf of an organization, you
              represent that you have authority to bind that organization to these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              2. Description of Services
            </h2>
            <p>
              FieldService Pros provides an AI-powered hiring platform connecting field
              service companies with qualified technicians. Services include job creation
              tools, candidate discovery, vetting engines, and related features offered
              through our platform.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              3. User Accounts &amp; Responsibilities
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                You are responsible for maintaining the confidentiality of your account
                credentials and all activities under your account.
              </li>
              <li>
                You agree to provide accurate, current, and complete information during
                registration and to keep it updated.
              </li>
              <li>
                You must not use the platform for any unlawful purpose or in violation of
                any applicable laws or regulations.
              </li>
              <li>
                You agree not to attempt to gain unauthorized access to any portion of the
                platform or its related systems.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              4. Intellectual Property
            </h2>
            <p>
              All content, features, and functionality on FieldService Pros — including
              text, graphics, logos, and software — are the exclusive property of{" "}
              <strong>Top Tempo Technical</strong> and its licensors. You may not reproduce,
              distribute, or create derivative works without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              5. Prohibited Conduct
            </h2>
            <p>You agree not to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Post false, misleading, or fraudulent content or job listings.</li>
              <li>Harass, threaten, or discriminate against any user or candidate.</li>
              <li>Scrape, crawl, or systematically extract data from the platform.</li>
              <li>Upload viruses, malware, or any malicious code.</li>
              <li>Circumvent or interfere with the platform&apos;s security features.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              6. Disclaimer of Warranties
            </h2>
            <p>
              The platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis
              without warranties of any kind, either express or implied. Top Tempo Technical
              does not warrant that the platform will be uninterrupted, error-free, or free
              of viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              7. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Top Tempo Technical shall not be
              liable for any indirect, incidental, special, consequential, or punitive
              damages arising from your use of or inability to use the platform or its
              services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              8. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate your access to the platform at
              our sole discretion, without notice, for conduct that we believe violates these
              Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              9. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of
              the jurisdiction in which Top Tempo Technical is incorporated, without regard
              to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              10. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users
              of material changes by updating the &quot;Last updated&quot; date. Continued use
              of the platform after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              11. Contact Us
            </h2>
            <p>For questions about these Terms, please contact:</p>
            <div className="mt-3 rounded-2xl border border-gray-100 bg-[#f7f7f7] p-6">
              <p className="font-semibold text-[#0a0a0a]">Top Tempo Technical</p>
              <p className="mt-1 text-sm text-gray-500">Operating FieldService Pros</p>
              <a
                href="mailto:info@fieldservicepros.com"
                className="mt-2 block text-sm font-medium text-[#019446] hover:underline"
              >
                info@fieldservicepros.com
              </a>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-100 px-6 py-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} FieldService Pros, a Top Tempo Technical company. All rights reserved.
      </footer>
    </div>
  );
}
