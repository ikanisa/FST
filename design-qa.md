# AI Agent Team Section — Design QA

## Evidence

- Source visual truth: `/Users/jeanbosco/.codex/visualizations/2026/09/01/01a05ca8-6994-7a03-ad6d-68989b1a9b3b/fst-ai-team-section-before.png`
- Implementation: `http://127.0.0.1:3000/mt/ai-agent-team`
- Implementation screenshot: `/Users/jeanbosco/.codex/visualizations/2026/09/01/01a05ca8-6994-7a03-ad6d-68989b1a9b3b/fst-ai-team-section-final.png`
- Side-by-side comparison: `/Users/jeanbosco/.codex/visualizations/2026/09/01/01a05ca8-6994-7a03-ad6d-68989b1a9b3b/fst-ai-team-section-comparison.png`
- Viewport and pixels: source and implementation are both 1327 × 841 CSS px at browser density 1; no density normalization was required.
- State: Malta AI Agent Team page, portfolio summary and all five agent cards, no modal or hover state.

## Full-view comparison

The redesigned section preserves the established FST grid, typography, portraits, content, border treatment and workpack chips. The requested ratios are now the dominant card-level signal: `35/70`, `27/55`, `22/43`, `28/56` and `17/34`. A pale-blue capacity band separates each ratio from longer descriptive copy, and the previously arrow-only profile action now has a visible `Profile` label.

## Focused-region comparison

The card header, capacity row and workpack footer were compared at the same desktop viewport. The final capacity band improves separation between identity, quantified capacity and service detail without introducing new assets or visual tokens. Long professional-role labels remain subordinate and fit within their card columns without horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: existing Manrope and Cormorant Garamond families are preserved. Ratios use Manrope for clearer numerals; names and portfolio totals retain the display serif.
- Spacing and layout: the original three-over-two grid remains. Capacity bands use consistent padding and alignment; workpack footers stay bottom-aligned.
- Colors and tokens: only existing `--sky`, `--cobalt`, `--ink` and `--ink-soft` tokens are used.
- Image quality: all five existing portraits retain their source, crop, radius and resolution treatment.
- Copy and content: `AVG · OPT` was replaced with the requested slash notation. `Average / optimised` and the profession-specific equivalent remain visible as the explanatory label.

## Interaction and technical checks

- Matthew's visible `Profile` action opened `/mt/ai-agent-team/matthew` and returned successfully.
- No horizontal overflow was detected at the captured desktop viewport.
- Browser console: no warnings or errors.
- Production build, ESLint, `git diff --check` and all 55 tests passed.

## Comparison history

1. P2: ratios and long role labels competed on one text line; the top summary also mixed serif numerals with `AVG/OPT` labels. Fixed by using the compact slash ratios and a dedicated capacity band.
2. P2: agent-profile affordance was an unlabeled arrow. Fixed by exposing the `Profile` label while retaining the existing route and arrow icon.
3. P3: the first band iteration used display-serif numerals, which reduced ratio legibility. Fixed by switching card ratios to Manrope and preserving the serif only for portfolio totals.

No actionable P0, P1 or P2 findings remain in the captured state.

final result: passed
