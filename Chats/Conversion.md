# Conversion

## Bruce's Ask

Please follow [the instructions](../types/NewCustomElement.md) to convert the up down web component found in the legacy folder to the new tech stack described by the instructions.

If you get stuck as far as how to do something declaratively, just honestly report on that, so I can improve the instructions and/or make the underlying libraries more robust.

Please provide your implementation notes below.

## Implementation Notes (Claude)

### What the legacy component did

`legacy/root.mjs` fed `makeXtalElement` (from `be-importing`) with:

| Legacy config | Meaning |
|---|---|
| `mainTemplate` | DSD template: `<button part=down data-d=-1>` / `<data part=count>` / `<button part=up data-d=1>` + `<style adopt>` |
| `xform["% count"]: "localize"` | when `count` changes, write `count.toLocaleString()` into the `part=count` element |
| `xform.button.m` | on `click` of any `button`, `inc` `count` `byAmt` `.dataset.d` (i.e. ±1 read from the clicked button's `data-d`) |
| `propInfo.count` | `def: 30000`, `attrName: 'count'`, `parse: true`, `fawm: 'setFormValue'` |
| `propDefaults.name: ''` + `fa: true` | form-associated, control name from `name` |

### New stack mapping (HTML-first / `el-maker`)

Followed `types/NewCustomElement.md` -> "Fork in the road" -> `types/NewHTMLFirstCustomElement.md`, using `plus-minus` and `scratch-box` as the reference implementations (they are the closest live examples to this doc).

| File | Role |
|---|---|
| `root.html` | Declarative shadow DOM between `<?start>` / `<?end>` markers. No JS. |
| `el-maker.mjs` | Type-checked generator for the ElementMaker feature config. |
| `el-maker.json` | Generated (`npm run build` -> `node el-maker.mjs`). Consumed by a `<script type=precede data-extends=el-maker>` in the host. |
| `types.d.ts` | `EndUserProps` / `AllProps` / `Actions` (empty). |
| `imports.html` | Import map. |
| `demo/dev.html` | Rewritten off the old `be-importing` stack onto `be-hive` + `imp-h` + `el-maker/def.js`. |
| `package.json` | Dropped `be-importing` / `may-it-serve` / `npm-watch`; added `assign-gingerly`, `be-hive`, `el-maker`, `imp-h`, `mount-observer`. |

Behaviour mapping:

- **Buttons -> increment.** `templateMaker` exposes the adopted shadow root as `clone`; a `merge` on `clone` resolves `upButton` / `downButton` / `countData` via `?.clone?.🔍?.[part=…]`; two `compacts` (`on_click_of_upButton_inc_count_by: 1`, `on_click_of_downButton_inc_count_by: -1`) attach the click listeners. This is the `plus-minus` pattern.
- **Count display.** `merge` on `count`: `"?.countData?.textContent": "?.count"`.
- **Attribute.** `roundabout.withAttrs`: `count` attr, `instanceOf: 'Number'`, `valIfNull: 30000`, `sourceOfTruth: true`; `name` attr passthrough.
- **Form association.** `faceUp: { customData: { integrateWithRoundabout: true } }` + a `merge` mirroring `count` into `value`.
- `data-d` attributes are gone — the increment amount is now a literal in each compact.

`node el-maker.mjs` runs with **no `node_modules` installed** (only `fs`/`url`) and emits valid JSON, so the serializability rule in `.kiro/steering/emc-json-serializability.md` is satisfied. I could not run the component itself (no `npm install` performed / Chrome 146 not available here), so the runtime notes below are unverified against a browser.

### Where I got stuck doing it declaratively

1. **`localize` (number formatting) has no declarative equivalent.** Legacy `"% count": "localize"` rendered `30000` as `"30,000"` via `toLocaleString`. In the new stack the display is a `merge` that assigns `?.count` straight to `textContent`, so it now renders `"30000"`.
   - `roundabout` `compacts` only offer `negate_ / pass_length_of_ / echo_ / inc_ / toggle_ / dispatch` — no `format`/`transform`.
   - `yields` is array-index selection only.
   - The `assign-gingerly` path DSL can call methods listed in `withMethods`, but the `|` zero-arg form is documented to *discard the return value* ("calls the method with no arguments and ignores the value"), so `?.count?.toLocaleString|` cannot be used as an RHS expression.
   - Possible fix to verify: a non-`|` method call that consumes the next segment as an argument *and continues the chain with the return value*, e.g. `withMethods: ['toLocaleString']` + RHS `"?.count?.toLocaleString?.en-US"`. I left this out of the shipped config because I could not confirm the resolver keeps the string result. If it does work, that's the intended idiom and worth an explicit example in `NewHTMLFirstCustomElement.md`. If it doesn't, `roundabout` needs a formatting primitive (a `format_X_to_Y` compact, or a `yields`-style `intl` rule) to stay code-free.

2. **"Increment by the event target's `data-d`" isn't expressible; it had to be split.** Legacy `byAmt: ".dataset.d"` read the amount off whichever button was clicked. `compacts` keys like `on_click_of_X_inc_Y_by` require a **literal number**. `on_click_of_X_assignFromEvent` can resolve RHS against the event, but `{"count +=": "?.target?.dataset?.d"}` would do string `+=` (`30000 + "1"`). So I used one compact per button. Fine for two buttons; wouldn't scale to a keypad. A `..._incFromEvent_..._by: "?.target?.dataset.d"` compact (numeric-coerced) would close this gap.

3. **`el-maker.json` is written by `el-maker.mjs` itself (`writeFileSync`), not via `node el-maker.mjs > el-maker.json`.** That matches `plus-minus`/`scratch-box`, but `NewJSFirstCustomElement.md` Step 8 and `NewHTMLFirstCustomElement.md` Step 8 both show the `>`-redirect form and a `console.log(render())`. The two idioms conflict across the docs — worth picking one.

4. **`NewCustomElement.md` Step 3 says put the interface in `types/[project-name]/types.d.ts`.** `types/` here is the `bahrus/types` submodule, and both reference implementations instead keep a plain `types.d.ts` at the repo root (imported as `from './types'`). I followed the reference implementations. The doc and the examples disagree.

5. **`withAttrs` placement.** `NewHTMLFirstCustomElement.md` Step 7 and the `ElMakerConfig` type both put `withAttrs` as a sibling of `customData` under `roundabout` — but `plus-minus/el-maker.json` ships **no** `withAttrs` at all and still reads its `aria-controls` attribute, while `scratch-box` relies on a bare `truthSourcer: {}` plus a second `features.mjs`/`features.json` file that the instructions never mention. It's unclear which feature actually owns attribute sourcing and whether `truthSourcer: {}` is required when `withAttrs` is present. I included both `truthSourcer: {}` and `roundabout.withAttrs`.

6. **`faceUp` value source is guessed.** `scratch-box` exposes its form value through an inner `<input name=value 🪢>` + `<link itemprop=value>` (the `be-bound` enhancement). This element has no inner control, so I assumed `integrateWithRoundabout: true` makes `faceUp` observe a VM property literally named `value`, and mirrored `count` into it. `face-up/types.d.ts` `CustomData` only exposes `{ integrateWithRoundabout: boolean }` — there's no way to say "the form value property is `count`". Unverified; a `valueProp` option on `FaceUpProps`/`CustomData` would make this explicit and skip the mirror `merge`.

### Latent bugs carried over from the legacy version (fixed here, worth noting)

- The legacy `<style>` targeted `span { … }` but the element is `<data>`, so those width/centering rules never applied. Changed the selector to `data`.
- The legacy buttons had no `type=button`; inside a `<form>` (as in the old `demo/dev.html`) clicking them submits the form. Added `type=button`.
- Added `aria-label`s to the two buttons (they only had `-` / `+` text).

## Bruce's Response

Can you create a larger gap between the + and - buttons?  I can't read the full number.  Or make the width adjust automatically so I can read the full number?

### Claude

Both, in `root.html` — pure CSS, no `el-maker` change:

- `data` now uses `min-width: 4rem` instead of `width: 4rem` (with `white-space: nowrap`), so the element grows to fit `30,000` (or larger) instead of clipping it.
- Added `padding: 0 0.75em` on `data` for the gap between the number and each button.
- Added `vertical-align: middle` on `data` and `button` so the number sits centred against the tall buttons.

