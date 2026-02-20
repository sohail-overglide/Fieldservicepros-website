import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Cookie Policy — FieldService Pros",
  description: "Cookie Policy for FieldService Pros, a Top Tempo Technical company.",
};

export default function CookiePolicyPage() {
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
            Cookie Policy
          </h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-10 text-[15px] leading-relaxed text-gray-700">
          <section>
            <p>
              This Cookie Policy explains how FieldService Pros, operated by{" "}
              <strong>Top Tempo Technical</strong>, uses cookies and similar tracking
              technologies when you visit our website. By using our site, you consent to
              the use of cookies as described in this policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files placed on your device by websites you visit.
              They are widely used to make websites work efficiently, provide a better user
              experience, and give site owners information about how their site is being used.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              2. Types of Cookies We Use
            </h2>

            <div className="mt-4 space-y-5">
              <div className="rounded-2xl border border-gray-100 bg-[#f7f7f7] p-5">
                <h3 className="font-semibold text-[#0a0a0a]">Strictly Necessary Cookies</h3>
                <p className="mt-1.5 text-sm text-gray-600">
                  These cookies are essential for the platform to function correctly. They
                  enable core features such as authentication sessions and security. You cannot
                  opt out of these cookies.
                </p>
                <p className="mt-2 text-xs text-gray-400">Example: <code>admin_token</code> — used to maintain your admin session.</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-[#f7f7f7] p-5">
                <h3 className="font-semibold text-[#0a0a0a]">Performance &amp; Analytics Cookies</h3>
                <p className="mt-1.5 text-sm text-gray-600">
                  These cookies collect anonymous information about how visitors use our
                  website — such as which pages are visited most often and whether users
                  encounter any errors. This data helps us improve the platform.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-[#f7f7f7] p-5">
                <h3 className="font-semibold text-[#0a0a0a]">Functional Cookies</h3>
                <p className="mt-1.5 text-sm text-gray-600">
                  These cookies allow the website to remember choices you make (such as your
                  preferred tab or form state) to provide a more personalized experience.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-[#f7f7f7] p-5">
                <h3 className="font-semibold text-[#0a0a0a]">Marketing &amp; Targeting Cookies</h3>
                <p className="mt-1.5 text-sm text-gray-600">
                  These cookies may be set by our advertising partners to build a profile of
                  your interests and show you relevant advertisements on other sites. We do
                  not currently use third-party advertising cookies on our platform.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              3. How Long Do Cookies Last?
            </h2>
            <p>Cookies can be either session-based or persistent:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Session cookies</strong> are temporary and are deleted when you
                close your browser.
              </li>
              <li>
                <strong>Persistent cookies</strong> remain on your device for a set period
                of time or until you delete them manually.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              4. Managing Cookies
            </h2>
            <p>
              Most web browsers allow you to control cookies through their settings. You can
              typically find these in the &quot;Options&quot; or &quot;Preferences&quot; menu of your
              browser. You may also use browser extensions to manage cookie preferences.
            </p>
            <p className="mt-3">
              Please note that disabling certain cookies may affect the functionality of our
              platform. Strictly necessary cookies cannot be disabled without impacting your
              ability to use core features.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              5. Third-Party Cookies
            </h2>
            <p>
              Some features of our platform may involve third-party services (such as
              analytics providers). These third parties may set their own cookies on your
              device, subject to their own privacy and cookie policies. Top Tempo Technical
              does not control these cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              6. Updates to This Policy
            </h2>
            <p>
              We may update this Cookie Policy periodically. When we do, we will revise the
              &quot;Last updated&quot; date above. We encourage you to review this page regularly
              to stay informed about our use of cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0a0a0a]">
              7. Contact Us
            </h2>
            <p>If you have questions about our use of cookies, please contact:</p>
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
