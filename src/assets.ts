/**
 * Resolve a file in `public/` against the deployed base path.
 *
 * Locally the app is served from `/`, but on GitHub Pages it lives under
 * `/<repo>/`. Vite rewrites asset URLs it can see in imports, not string paths
 * written in JSX — so every `/assets/...` reference goes through here.
 */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
