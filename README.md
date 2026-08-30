# up-down-counter

[![NPM version](https://badge.fury.io/js/up-down-counter.png)](http://badge.fury.io/js/up-down-counter)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/up-down-counter?style=for-the-badge)](https://bundlephobia.com/result?p=up-down-counter)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/up-down-counter?compression=gzip">

This is the famous counter test example for web components.

It is built HTML-first on `ElementMaker` / `el-maker` (see `types/NewHTMLFirstCustomElement.md`).
There is **no custom element class** — every behaviour is declared as data:

| File | Role |
|------|------|
| `root.html` | Declarative shadow DOM (template between `<?start>` / `<?end>` markers). |
| `el-maker.mjs` | Type-checked generator for the ElementMaker feature config. |
| `el-maker.json` | Generated artifact consumed at runtime by `<script type=precede data-extends=el-maker>`. |
| `types.d.ts` | Property interfaces. |

The Typescript-safe configuration lives in `el-maker.mjs`. Regenerate the JSON with:

> npm run build

(or `npm run build-el-maker` to watch). Never edit `el-maker.json` by hand.

The legacy `be-importing` / `root.mjs` implementation is preserved under `legacy/`.
See `Chats/Conversion.md` for conversion notes.

## Viewing Demos Locally

1. Install git
2. Fork/clone this repo
3. Install node.js
4. Open command window to folder where you cloned this repo
5. > git submodule add https://github.com/bahrus/types.git types
6. > git submodule update --init --recursive
7. > npm install
8. > npm run serve
9. Open http://localhost:8000/ in a modern browser



