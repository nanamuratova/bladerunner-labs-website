// BladeRunner Labs logo artwork in public/assets/logo/.
//
// The client's official set is the stacked wordmark and the symbol, both in the
// brand blue (#004E9E) with a cyan bar (#009CE6):
//   wordmark — "BLADE / RUNNER" with LABS vertical (default, used in the header)
//   mark     — the bracket symbol on its own, also the favicon
//
// lockupAlt and wordmarkAlt are the earlier Figma-drawn horizontal versions, in
// black and the site accent. They are not client artwork — keep them out of
// anything the client sees unless they supply a horizontal lockup.
// On a dark surface pass onDark, which knocks the whole mark out to white.

import { asset } from '../assets'

const sources = {
  wordmark: asset('/assets/logo/brand-wordmark.svg'),
  mark: asset('/assets/logo/brand-mark.svg'),
  lockupAlt: asset('/assets/logo/lockup.svg'),
  wordmarkAlt: asset('/assets/logo/wordmark.svg'),
} as const

type Variant = keyof typeof sources

type LogoProps = {
  className?: string
  onDark?: boolean
  variant?: Variant
  /** Legacy prop kept so existing call sites keep working. */
  markOnly?: boolean
}

const defaultHeight: Record<Variant, string> = {
  wordmark: 'h-8',
  mark: 'h-6',
  lockupAlt: 'h-4',
  wordmarkAlt: 'h-4',
}

/** Connector mark only. */
export function LogoMark({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return <Logo variant="mark" className={className} onDark={onDark} />
}

export function Logo({ className = '', onDark = false, variant, markOnly = false }: LogoProps) {
  const resolved: Variant = variant ?? (markOnly ? 'mark' : 'wordmark')
  return (
    <img
      src={sources[resolved]}
      alt="BladeRunner Labs"
      className={`w-auto ${className || defaultHeight[resolved]}`}
      style={onDark ? { filter: 'brightness(0) invert(1)' } : undefined}
    />
  )
}
