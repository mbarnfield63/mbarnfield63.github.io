---
layout: post
title: First-author paper — Machine learning isotope shifts in molecular energy levels (JMS, 2026)
date: 2026-06-18 12:00:00
inline: false
related_posts: false
---

First-author paper submitted to the *Journal of Molecular Spectroscopy*: **Machine learning isotope shifts in molecular energy levels**.

A fully connected neural network was trained on CO₂ data to predict per-energy-level corrections on top of IE predictions, reducing the mean absolute error from 0.0139 cm⁻¹ to 0.0023 cm⁻¹ and improving accuracy in over 91% of levels across 10 minor CO₂ isotopologues. For CO — where experimental data is far scarcer — a novel hybrid, molecule-aware transfer learning architecture was developed, using a shared trunk trained on CO₂ with per-isotopologue adapter heads for CO. This approach reduces CO's MAE from 0.0290 cm⁻¹ to 0.0052 cm⁻¹ and improves over 91% of levels, demonstrating that isotopic correction patterns generalise across chemically related molecular systems. In total, 36,795 CO₂ energy levels and 3,348 CO energy levels were corrected and released.

The updated CO₂ levels have been incorporated into the ExoMol "Dozen" line list, available at [www.exomol.com](https://www.exomol.com). Code is publicly available at [github.com/mbarnfield63/ML_Isotopologue_Extrapolation](https://github.com/mbarnfield63/ML_Isotopologue_Extrapolation).

**Citation:** Barnfield, Polyansky, Yurchenko & Tennyson, *Journal of Molecular Spectroscopy* (2026, submitted)
