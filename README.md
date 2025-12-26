# Color Contrast Accessibility Checker

![WCAG 2.1](https://img.shields.io/badge/WCAG-2.1-blue)
![Accessibility](https://img.shields.io/badge/Accessibility-Compliant-success)
![License: MIT](https://img.shields.io/badge/License-MIT-green)
![JavaScript](https://img.shields.io/badge/Built%20With-JavaScript-yellow)
![Status](https://img.shields.io/badge/Project-Active-brightgreen)

Color Contrast Accessibility Checker is a utility designed to evaluate the readability of text against different background colors, hover states, and gradients.  
It helps designers and developers ensure their UI color choices meet **WCAG 2.1 contrast requirements** across multiple text sizes and interaction states.

The goal of this project is to make accessibility checks **clear, visual, and practical**, without requiring external tools or manual calculations.

---

## Screenshots

### Default Contrast Check
![Default Contrast](./screenshots/default-contrast.png)

### Text Size Evaluation
![Text Size Evaluation](./screenshots/text-size-check.png)

### Hover State Validation
![Hover State](./screenshots/hover-check.png)

### Gradient Contrast Analysis
![Gradient Contrast](./screenshots/gradient-check.png)

> Screenshots are stored in the `screenshots/` directory.

---

## Core Capabilities

- Foreground and background color contrast calculation
- Text size–aware accessibility validation:
  - Small text
  - Medium text
  - Large text
- Hover state contrast verification
- Gradient contrast evaluation across multiple color stops
- WCAG 2.1 compliance indicators (Pass / Fail)
- Clear numeric contrast ratio output

---

## Accessibility Standards Followed

The checker is based on **WCAG 2.1 contrast guidelines**.

### Contrast Ratio Requirements

| Text Category | Minimum Contrast |
|--------------|------------------|
| Small text   | 4.5 : 1          |
| Large text   | 3 : 1            |

**Large text definition:**
- 18px or larger (regular weight), or  
- 14px or larger (bold)

---

## How Contrast Is Calculated

1. Colors are converted to relative luminance values
2. The WCAG contrast formula is applied:
3. The resulting ratio is compared against WCAG thresholds
4. Results are categorized by text size and interaction state

---

## Gradient Contrast Evaluation

For gradient backgrounds:
- Each color stop is tested against the foreground color
- The **lowest contrast ratio** is used as the final result
- This ensures accessibility across the entire gradient area

---

## Hover State Handling

Hover states are evaluated independently to ensure:
- Text remains readable during interaction
- No accessibility regressions on hover
- Both default and hover states meet contrast requirements

---

## Typical Use Cases

- Validating design system color tokens
- Checking button and link text readability
- Preventing hover-state accessibility regressions
- Testing gradients used in hero sections or banners
- Performing quick accessibility reviews during UI development

---

## Tech Stack

- HTML
- CSS
- JavaScript  
*(Replace or extend this section if using React, Next.js, etc.)*

All contrast calculations follow WCAG-recommended formulas without third-party libraries.

---

## Running the Project Locally

```bash
git clone https://github.com/your-username/color-contrast-checker.git
cd color-contrast-checker
npm install
npm run dev
****
