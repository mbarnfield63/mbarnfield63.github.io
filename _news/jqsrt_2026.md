---
layout: post
title: Automated quantum number assignment for CO₂ (JQSRT, 2026) - First author
date: 2026-09-04 12:00:00
inline: false
related_posts: false
---

My second first-author paper is published in the _Journal of Quantitative Spectroscopy and Radiative Transfer_: **Automated AFGL quantum number assignment for CO₂ isotopologues using a graph neural network**.

Computed line lists contain millions of energy levels, but most have no quantum number labels. Without labels, the levels are hard to use for things like line broadening. We built a pipeline that labels them automatically for all 12 stable isotopologues of CO₂. A graph neural network learns from the levels that are already measured, a matching step stops two levels getting the same label, and a bootstrap loop feeds confident predictions back in as new training data.

The pipeline labelled 224,650 previously unlabelled states. The total number of labelled states grew from 48,234 to 272,884, and coverage below 5,000 cm⁻¹ is now 97.4%. A small decision tree converts the labels to a second notation (Herzberg) for the asymmetric isotopologues, with 100% accuracy on unseen measured states.

The code is public at [github.com/mbarnfield63/GNN_CO2_QN_assignment](https://github.com/mbarnfield63/GNN_CO2_QN_assignment), and the labelled files are on the [ExoMol website](https://www.exomol.com).

**Citation:** Barnfield, Yurchenko & Tennyson, _Journal of Quantitative Spectroscopy and Radiative Transfer_ 365, 110111 (2026). [doi:10.1016/j.jqsrt.2026.110111](https://doi.org/10.1016/j.jqsrt.2026.110111)
