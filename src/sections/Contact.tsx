import { SectionLabel } from '../components/SectionLabel'

// Shared by the home page and the project detail pages, so the contact details
// only ever exist in one place.

const contactColumnOne = [
  { label: 'Office', value: 'Tel Aviv, Israel', href: null },
  { label: 'Phone', value: '+972 52 5933277', href: 'tel:+972525933277' },
  { label: 'Email', value: 'info@bladerunner.io', href: 'mailto:info@bladerunner.io' },
] as const

const socialLinks = [
  { name: 'LinkedIn', slug: 'linkedin', href: 'https://www.linkedin.com/company/bladerunner-labs/' },
  { name: 'GitHub', slug: 'github', href: 'https://github.com/bladerunnerlabs' },
] as const

export function Contact() {
  return (
    <section id="contact" className="bg-gray-50">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          {/* Left — intro */}
          <div>
            <SectionLabel>Contact us</SectionLabel>
            <h2 className="brl-h2 mt-3">R&amp;D Consulting</h2>
            <p className="brl-body-lg mt-6 max-w-md text-gray-600">
              Tell us about the problem you're working on. We partner with teams on applied AI,
              computing infrastructure, and the tools that hold them together — from early scoping
              through to production.
            </p>
          </div>

          {/* Right — details in two columns */}
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {/* Column 1 */}
            <div className="space-y-8">
              {contactColumnOne.map((row) => (
                <div key={row.label}>
                  <span className="brl-mono-label text-gray-500">{row.label}</span>
                  {row.href ? (
                    <a
                      href={row.href}
                      className="brl-h6 mt-3 block text-gray-900 transition-colors hover:text-accent"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span className="brl-h6 mt-3 block text-gray-900">{row.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
              <div>
                <span className="brl-mono-label text-gray-500">Careers</span>
                <a
                  href="mailto:jobs@bladerunner.io"
                  className="brl-h6 mt-3 block text-gray-900 transition-colors hover:text-accent"
                >
                  jobs@bladerunner.io
                </a>
              </div>
              <div>
                <span className="brl-mono-label text-gray-500">Follow us</span>
                <div className="mt-3 space-y-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.slug}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 text-gray-900 transition-colors hover:text-accent"
                    >
                      <span className="brl-h6">{s.name}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      >
                        <path d="M7 17 17 7M9 7h8v8" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
