# Plant Physiology and Metabolism — BOT-DSM-511 — Study Website

Personal, non-commercial study site for a BSc 5th-semester Botany student (UGC NEP).
Course: Plant Physiology and Metabolism (Theory), BOT-DSM-511, 60 hours, 5 units.

## How to open

Unzip the zip file, then double-click `index.html` inside the `plant-physiology-site/` folder. No server, login, payment or account is needed.
The site is static HTML/CSS/JavaScript. It works fully offline: styling is plain CSS in `assets/css/style.css` (no CDN), and fonts are system serif/sans fonts.
Progress checklists and quiz scores are saved only in your browser's localStorage (key prefix `bot511-`); clearing browser data clears progress.

## What is inside (rebuilt version)

- 5 units, full BOT-DSM-511 syllabus, 25 short notes, 11 long answers
- 93 MCQs: 83 unit MCQs (Unit 1: 15, Unit 2: 15, Unit 3: 20, Unit 4: 15, Unit 5: 18) plus 10 Dec 2025 PYQ MCQs
- Full Dec 2025 PYQ page (booklet NEE-3107-A, 60 marks) and 5 new model papers (each 10+20+30 = 60 marks)
- Diagram for every concept: 57/57 topic sections have at least one figure (Unit 1: 25/25, Unit 2: 6/6, Unit 3: 11/11, Unit 4: 5/5, Unit 5: 10/10), up from 34/57
- 33 openly licensed Wikimedia Commons images in `assets/images/` (up from 14) plus hand-coded SVG diagrams and flowcharts; the 2 standalone diagrams in `assets/diagrams/` are also shown on credits.html
- Quiz Corner (`quiz.html`): practice by unit, 20-question mixed challenge (shuffled, with New set), 10-question PYQ quiz, and 10-question speed quiz in 10 minutes with countdown and auto-submit
- Responsive, mobile-first, minimal Medium-like layout: single readable column, large body type, wrapping/sticky header navigation, tables that scroll inside their own container, full-width buttons and quiz options at phone width (360-400px tested by code inspection, not a live device)
- Progress saved in the browser: per-unit checklists with per-unit and overall percentages on the home page, Continue where you left off, quiz best scores per mode/unit and last attempt, header progress indicator, and Reset progress (with confirm) on the home page and Quiz Corner — all under the `bot511-` localStorage prefix

## Folder map

- `index.html` — home, progress section, unit cards, Quiz Corner, PYQ-priority study roadmap
- `quiz.html` — Quiz Corner (four modes, no login, results in-page, best scores in localStorage)
- `syllabus.html` — full syllabus plus the "what your notes missed" gap list
- `units/unit1.html` — Unit 1: water relations and mineral nutrition
- `units/unit2.html` — Unit 2: translocation in phloem
- `units/unit3.html` — Unit 3: photosynthesis and respiration
- `units/unit4.html` — Unit 4: enzymes and nitrogen metabolism
- `units/unit5.html` — Unit 5: growth regulators and light/temperature responses
- `mcq.html` — interactive quiz: 83 unit MCQs + 10 Dec 2025 PYQ MCQs
- `pyq.html` — full Dec 2025 paper (booklet NEE-3107-A), answer key, pattern analysis
- `model-papers.html` — five NEW model papers in the Dec 2025 pattern (60 marks each)
- `credits.html` — every image source and licence, plus the 2 standalone diagrams
- `assets/css/style.css` — shared styles (plain CSS, mobile-first)
- `assets/js/main.js` — answer/quiz reveal, page search, back-to-top, checklist and progress (localStorage, prefix `bot511-`)
- `assets/images/` — downloaded Wikimedia Commons images (see credits.html)
- `assets/diagrams/` — standalone hand-coded SVG diagrams; most diagrams on the unit pages are inline SVG, labelled "Diagram" in their captions

## Image rule followed

Only openly licensed images (Wikimedia Commons CC BY, CC BY-SA, CC0 or public domain) plus original diagrams drawn for this site. No diagrams were copied from commercial textbooks, coaching sites, or any site with an unclear or all-rights-reserved licence, even though personal use was suggested — so the site stays safe to keep and reuse. Topics with no suitable open image after a genuine Commons search (for example a dedicated photorespiration diagram, a nitrogenase structure, photoperiodism and vernalization photographs, and a Z-scheme diagram) are covered by hand-coded SVG diagrams already on the unit pages instead.

## Note on the model papers

The five model papers are new questions written in the Dec 2025 pattern
(Section A 10 x 1 = 10, Section B any 4 of 6 x 5 = 20, Section C any 3 of 5
x 10 = 30, total 60 marks, 3 hours). They are labelled "MODEL PAPER — new
questions, not a real past paper" on the page. No PYQ question is copied
into them.
