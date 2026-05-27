# Mobile Portrait Adaptation Design

Date: 2026-05-27
Project: `D:\personal_web`
Scope: Homepage mobile portrait adaptation for widths centered on 375px, 390px, and 430px

## Goal

Rework the homepage into a dual-mode responsive layout:

- Desktop keeps the current visual direction and information hierarchy.
- Mobile portrait switches to a calmer single-column reading flow with preserved visual identity.
- Fix current horizontal overflow and portrait-specific layout breakage before polishing animation and scale.

## Current Problems

Observed during mobile portrait audit at 390px width:

- The page has real horizontal overflow. The visual viewport is about 375px wide while the document content expands to about 514px.
- The top navigation is overcrowded because brand, section links, language switch, and social links all compete in one line.
- The hero section still behaves like a wide composition. The fixed-width typewriter area and large orbit system create unnecessary horizontal pressure.
- The AI showcase block is visually strong but too dense in portrait mode, especially the screenshot fan, action area, and adjacent support cards.
- The movies section relies on a repeated marquee pattern that becomes long, repetitive, and visually heavy on phones.
- Several desktop hover-first interactions lose clarity on touch devices.

## Design Direction

Use a dual-mode reflow rather than simple compression:

- Preserve the strongest brand moments on mobile: glass navigation, orange hero name, orbit atmosphere, flagship AI card, and rich section headers.
- Convert the page body into a stable one-column flow on portrait screens.
- Reduce decorative competition around core content instead of shrinking everything equally.
- Prefer touch-stable states over hover-dependent reveal behavior.

## Breakpoint Strategy

Primary portrait targets:

- 375px width
- 390px width
- 430px width

Behavioral split:

- Mobile portrait: below `md`
- Tablet and desktop: inherit existing structure unless a small corrective tweak is required

This work does not introduce a separate tablet-specific layout.

## Layout Plan By Area

### 1. Navbar

Mobile portrait navbar becomes a lighter two-layer glass header:

- Layer 1 contains brand, language toggle, and one compact navigation control.
- Layer 2 contains section shortcuts only.
- Social links move out of the navbar and into a calmer location such as hero supporting actions or the footer.

Interaction rules:

- Shortcuts may wrap or become a horizontally scrollable compact row, but they must not force page overflow.
- All touch targets remain comfortably tappable.
- Anchor navigation must still scroll to sections without content being obscured by the fixed header.

Desktop behavior stays visually consistent with the current dock-style presentation.

### 2. Hero

Mobile portrait hero changes from a wide stage composition to a vertical introduction stack:

- Remove the fixed-width constraint from the typewriter name line.
- Make the main card width fluid relative to viewport width.
- Shrink and soften orbit visuals so they support the card instead of defining the full layout width.
- Keep the orange type treatment and avatar/AI motifs, but lower their spatial footprint.
- Reduce role text size slightly and increase line spacing for readability.
- Replace hover-driven emphasis with a stable touch-friendly presentation.

The mobile hero should feel focused and premium, not miniature.

### 3. AI & Project Lab

This section remains the main visual centerpiece on mobile, but it is re-staged into a clearer vertical flow:

- Main card content becomes a single reading sequence: label, title, description, features, actions, preview.
- The screenshot fan narrows substantially on mobile and must never expand beyond the viewport width.
- If needed, the expanded mobile state favors one dominant preview with restrained side screenshots rather than a dramatic wide fan.
- Support cards below or beside the main card become simple stacked follow-up blocks with stronger spacing between them.
- Project matrix cards remain single-column on portrait screens.

The goal is to keep the premium feel while removing the sense of visual pile-up.

### 4. Portfolio / Management Section

Mobile portrait layout becomes a straightforward single-column sequence:

- Intro and profile cards appear first.
- Bento cards follow in a clean stack.
- Text blocks and CTA spacing are tuned for reading before exploration.

The section should read like a polished case-study lead-in rather than a compressed desktop split layout.

### 5. Awards Section

Mobile already has a separate card list, so the changes are refinement-focused:

- Tighten vertical rhythm.
- Improve title/result hierarchy.
- Reduce decorative noise where it competes with legibility.
- Keep card individuality and color identity.

No floating desktop-card behavior is introduced on mobile.

### 6. Music Section

Mobile portrait keeps the radar chart but rebalances the section:

- Radar card gets tighter spacing and scaled chart framing.
- Now-playing area remains visible without crowding the chart.
- Playlist cards remain stacked or two-up only when the width truly allows it.

The chart remains a visual moment, but the section should read top-to-bottom without horizontal stress.

### 7. Movies Section

Mobile portrait replaces the long repeated marquee feeling with a lighter film-strip presentation:

- Favor a compact horizontal poster rail or shorter scrollable strip.
- Reduce repeated cloned content on small screens.
- Preserve the cinematic tone through card styling, not through excessive repetition.

Desktop can keep the marquee treatment if it remains stable there.

### 8. Footer

Footer becomes the quiet home for lower-priority utility links on mobile:

- Social links stay easy to tap.
- Spacing is tightened slightly.
- Content remains centered and calm.

## Responsive Behavior Rules

- No horizontal page overflow on portrait screens.
- No fixed-width mobile element may exceed the viewport.
- Decorative absolute-positioned visuals must be bounded so they cannot expand the document width.
- Hover-only emphasis should degrade gracefully into static or tap-friendly behavior on touch devices.
- Section top spacing must account for the fixed navbar and preserve readable anchor landings.

## Visual Language

Keep the existing brand language:

- soft glass surfaces
- light editorial background
- orange hero accent
- purple AI accent
- rounded cards with layered shadows

Mobile polish should come from proportion, spacing, and controlled scale rather than adding new visual motifs.

## Implementation Notes

- Prefer CSS and Tailwind breakpoint reflow before introducing new stateful mobile-only logic.
- Where interaction changes are necessary, keep desktop behavior intact and scope mobile behavior clearly.
- Revisit hard-coded widths, absolute offsets, and scale constants in hero and AI showcase components first.
- Review marquee, dock, and mockup components for small-screen constraints before patching section code around them.

## Verification Plan

Verify at minimum on:

- 375x812 portrait
- 390x844 portrait

Checks:

- No horizontal overflow.
- Navbar remains readable and tappable.
- Hero fits naturally in the top experience without clipped name or off-screen decorative content.
- AI showcase remains premium but readable.
- Movies section no longer feels like repeated overflow-heavy content on portrait.
- Desktop layout remains visually consistent.
- Run lint after implementation.

## Out of Scope

- Separate tablet redesign
- New content strategy or copy rewrite
- Rebranding desktop layout
- Rebuilding non-homepage pages as part of this task

## Success Criteria

The work is successful when:

- portrait mobile widths no longer overflow horizontally
- the homepage reads as an intentional mobile-first experience rather than a shrunk desktop page
- visual identity is preserved in hero and flagship content blocks
- navigation and key actions become easier to understand and tap on phones
- desktop presentation does not visibly regress
