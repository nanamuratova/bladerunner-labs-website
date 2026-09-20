/** Shared site footer. */
export function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="border-t border-gray-300 py-10">
          <span className="brl-body-sm text-gray-500">
            Copyright © {new Date().getFullYear()} BladeRunner Labs. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
