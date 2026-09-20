import { useEffect, useState } from 'react'

/**
 * True once the page has left the top. Both headers use it, so the home page and
 * the project articles pick up their border and blur at the same moment.
 */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

/** The shell both headers share: sticky, and a border that appears on scroll. */
export function headerClass(scrolled: boolean) {
  return `sticky top-0 z-40 border-b transition-colors duration-200 ${
    scrolled ? 'border-gray-200 bg-white/85 backdrop-blur-md' : 'border-transparent bg-white'
  }`
}
