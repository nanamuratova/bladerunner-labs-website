import { asset } from './assets'

/**
 * The four icons from the Figma template. They are masked in the accent colour,
 * so the SVG shape is all that matters. Used by the home page services and by
 * the capability cards in a project article.
 */
export const uiIcons = [
  asset('/assets/1b996.svg'),
  asset('/assets/ad5a0.svg'),
  asset('/assets/61f57.svg'),
  asset('/assets/1be11.svg'),
]

/** The chip the icons sit in: an accent tint at 44px with a 22px icon. */
export function iconChipStyle(src: string) {
  return {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskRepeat: 'no-repeat' as const,
    WebkitMaskRepeat: 'no-repeat' as const,
    maskSize: 'contain' as const,
    WebkitMaskSize: 'contain' as const,
  }
}
