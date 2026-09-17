# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## FMaryAss - Tailwind + Hero Counter + Notes

This project includes a modern single-page UI with:

- A pink-themed hero with a real-time elapsed counter starting from 21 September 2024.
- A Notes section to add/save short phrases (stored in localStorage by default).
- Prepared Supabase helper at `src/lib/supabaseClient.js` (commented) for easy integration.

Quick start:

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

Tailwind is preconfigured. If you want to enable Supabase integration:

1. Install the Supabase client (already listed in `package.json`), then set env vars in a `.env` file at project root:

```
VITE_SUPABASE_URL=https://xyzcompany.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

2. Uncomment the `createClient` usage in `src/lib/supabaseClient.js` and the `fetchPhrases`/`insertPhrase` calls in `src/components/Notes.jsx`.

3. Create a table named `phrases` with at least `id`, `text`, and `inserted_at` (timestamp) fields.

Then the app will use Supabase instead of localStorage for persistence.
