---
layout: page
title: Machine learning isotope shifts
description: Neural network corrections to the energy levels of rare isotopic molecules. Published in the Journal of Molecular Spectroscopy (2026).
importance: 1
category: research
related_publications: true
---

Most molecules come in several isotopic versions, called isotopologues. For CO₂, the common form is ¹²C¹⁶O₂, and rarer forms swap in heavier atoms, such as ¹³C¹⁶O₂. The rare forms matter for reading planet atmospheres, but they have far less lab data than the common form.

ExoMol fills that gap with isotopologue extrapolation (IE): take the known error of a calculation for the common form and apply the same correction to the rare forms. IE is fast, but it assumes the error is the same for every isotopologue, and that is not quite true.

## What I built

A neural network that learns the error IE leaves behind and corrects each energy level individually. It is trained against measured (MARVEL) energy levels.

- For CO₂, it cut the mean absolute error from 0.0139 cm⁻¹ (IE) to 0.0023 cm⁻¹ and improved more than 87% of levels.
- For CO, which has much less data, a transfer learning model reuses what was learned on CO₂. It cut the error from 0.0290 cm⁻¹ to 0.0052 cm⁻¹ and improved more than 93% of levels.
- In total, 36,795 CO₂ levels and 3,348 CO levels were corrected. The CO₂ levels are now part of the ExoMol line lists for 11 CO₂ isotopologues.

The paper is {% cite barnfield2026mliso %}, and the code is public at [ML_Isotopologue_Extrapolation](https://github.com/mbarnfield63/ML_Isotopologue_Extrapolation).

## Current work

I am extending the method to water and sulfur monoxide (SO), and testing a graph neural network version that links related energy levels. That code is public at [GNN_Isotope_Shifts](https://github.com/mbarnfield63/GNN_Isotope_Shifts). Results are not published yet.

## Stack

PyTorch, PyTorch Geometric, NumPy, pandas, YAML-driven experiment configs.
