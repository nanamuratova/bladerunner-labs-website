/**
 * Tiny URL routing: the home page at the base path, a project article at
 * `<base>projects/<id>`.
 *
 * Paths are real, so a project can be bookmarked, shared and reloaded. On a
 * static host an unknown path has to resolve to the app shell for that to work:
 * GitHub Pages serves `404.html`, so the deploy publishes a copy of index.html
 * under that name. Any other host wants a catch-all rewrite to index.html.
 */

const BASE = import.meta.env.BASE_URL // '/' locally, '/<repo>/' on GitHub Pages

function relativePath() {
  const path = decodeURIComponent(window.location.pathname)
  return (path.startsWith(BASE) ? path.slice(BASE.length) : path.replace(/^\//, '')).replace(/\/$/, '')
}

/** The project id in the current URL, or null on the home page. */
export function currentProjectId(): string | null {
  const match = relativePath().match(/^projects\/([\w-]+)$/)
  return match ? match[1] : null
}

export function projectPath(id: string) {
  return `${BASE}projects/${id}`
}

export function homePath() {
  return BASE
}

export function pushPath(path: string) {
  if (path !== window.location.pathname) window.history.pushState({}, '', path)
}

/**
 * Click handler for an in-app link: navigates without a reload, but leaves
 * modified clicks (new tab, new window, download) to the browser.
 */
export function navigateOnClick(go: () => void) {
  return (e: React.MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    go()
  }
}

export function replacePath(path: string) {
  if (path !== window.location.pathname) window.history.replaceState({}, '', path)
}
