---
layout: post
title: Machine learning isotope shifts in molecular energy levels (JMS, 2026) - First author
date: 2026-04-07 12:00:00
inline: false
related_posts: false
---

My first-author paper is published in the _Journal of Molecular Spectroscopy_: **Machine learning isotope shifts in molecular energy levels**.

Rare isotopic versions of a molecule (isotopologues) have far less lab data than the main form, so their energy levels are usually estimated from the main form. We trained a neural network on CO₂ to correct those estimates level by level. It cut the mean absolute error from 0.0139 cm⁻¹ to 0.0023 cm⁻¹ and improved more than 87% of CO₂ levels.

For CO, where lab data is much scarcer, we reused what the network learned on CO₂ (transfer learning). This cut the error from 0.0290 cm⁻¹ to 0.0052 cm⁻¹ and improved more than 93% of CO levels. In total we corrected 36,795 CO₂ levels and 3,348 CO levels.

The updated CO₂ levels are part of the ExoMol "Dozen" line lists at [www.exomol.com](https://www.exomol.com). The code is public at [github.com/mbarnfield63/ML_Isotopologue_Extrapolation](https://github.com/mbarnfield63/ML_Isotopologue_Extrapolation).

**Citation:** Barnfield, Polyansky, Yurchenko & Tennyson, _Journal of Molecular Spectroscopy_ 418-419, 112084 (2026). [doi:10.1016/j.jms.2026.112084](https://doi.org/10.1016/j.jms.2026.112084)
