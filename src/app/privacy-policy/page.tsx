import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Privacy Policy — FieldService Pros",
  description: "Privacy Policy for FieldService Pros, a Top Tempo Technical company.",
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-10 text-[15px] leading-relaxed text-gray-700">
          <section>
            <p>
              FieldService Pros (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is a product of{" "}
              <strong>Top Tempo Technical</strong>. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or use
              our platform. Please read this policy carefully. If you disagree with its terms,
              please discontinue use of the site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              1. Information We Collect
            </h2>
            <p>We may collect the following types of information:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Personal Identification Information:</strong> Name, email address,
                company name, phone number, and similar identifiers you provide when signing
                up or contacting us.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact with our
                platform, including pages visited, features used, and time spent.
              </li>
              <li>
                <strong>Device &amp; Technical Data:</strong> IP address, browser type,
                operating system, and referring URLs.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Provide, operate, and improve our platform and services.</li>
              <li>Send you early access invitations, product updates, and relevant communications.</li>
              <li>Respond to your inquiries and customer support requests.</li>
              <li>Analyze usage trends to enhance user experience.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              3. Sharing Your Information
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties.
              We may share data with:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Top Tempo Technical</strong> and its affiliates for internal business
                operations.
              </li>
              <li>
                Service providers who assist us in operating our platform (e.g., hosting,
                analytics), bound by confidentiality agreements.
              </li>
              <li>
                Law enforcement or regulatory bodies when required by applicable law.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              4. Data Retention
            </h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the
              purposes outlined in this policy, or as required by law. You may request
              deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              5. Your Rights
            </h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Object to or restrict our processing of your data.</li>
              <li>Data portability — receive your data in a structured, machine-readable format.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:info@fieldservicepros.com"
                className="font-medium text-[#019446] hover:underline"
              >
                info@fieldservicepros.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              6. Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your information.
              However, no method of transmission over the internet is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              significant changes by updating the &quot;Last updated&quot; date at the top of
              this page. Continued use of our platform after changes constitutes your
              acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              8. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact:
            </p>
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
