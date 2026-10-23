# Snap Login Clone

A recreation of the Snapchat web login screen, built as a front-end design study. It has the yellow backdrop, the white card with a ghost mark, the "Log in to Snapchat" heading, and the blue pill button. It also works like the real flow, in two steps:

1. Enter a username or email, or switch to a phone number.
2. Enter a password, with a show/hide toggle, a back button, and a "Forgot your password?" link.

## Tech

- TanStack Start + React 19 + TanStack Router
- Tailwind CSS 4 (brand colors are theme variables in `src/styles.css`)
- sonner toasts, lucide-react icons
- Deployed on Netlify

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
# or, with Netlify emulation:
netlify dev
```
