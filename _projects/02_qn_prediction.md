---
layout: page
title: Quantum number assignment for CO₂
description: A graph neural network that labels computed CO₂ energy levels with quantum numbers, across all 12 stable isotopologues. Published in JQSRT (2026).
img:
importance: 2
category: research
related_publications: true
---

## The problem

Line lists such as those from [ExoMol](https://www.exomol.com/) hold millions of computed energy levels for molecules like CO₂. Each level should carry quantum numbers: labels that say which vibration and rotation it belongs to. Most computed levels have no labels, and assigning them by hand needs an expert and does not scale. Unlabelled levels are hard to use, for example when working out how lines broaden.

## What I built

A pipeline that assigns AFGL quantum numbers automatically to CO₂ levels below 15,000 cm⁻¹, for all 12 stable isotopologues.

- Each energy level is a node in a graph. Edges link levels in the same rotational ladder and matching levels in different isotopologues.
- A GraphSAGE graph neural network learns from the levels that are already measured (MARVEL) and predicts labels for the rest.
- A Hungarian algorithm solver then makes sure no two levels in the same group get the same label.
- A five-round bootstrap loop adds confident predictions back into the training set, so coverage grows without any extra hand labelling.
- A small decision tree converts AFGL labels to Herzberg notation for the asymmetric isotopologues.

## Results

| Result                                                | Value             |
| ----------------------------------------------------- | ----------------- |
| Previously unlabelled states assigned                 | 224,650           |
| Total labelled states, before and after               | 48,234 to 272,884 |
| Coverage below 5,000 cm⁻¹                             | 97.4%             |
| First-round model accuracy (held-out measured levels) | 98.5%             |
| AFGL to Herzberg conversion (unseen measured levels)  | 100%              |

The paper is {% cite barnfield2026jqsrt %}. The labels also feed the ExoMol CO₂ line lists {% cite 10.1093/mnras/staf2135 %}. The code is public at [GNN_CO2_QN_assignment](https://github.com/mbarnfield63/GNN_CO2_QN_assignment), and the labelled files are on the ExoMol website.

## Next

A master's student is now applying the same approach to water.

## Stack

PyTorch, PyTorch Geometric (GraphSAGE), SciPy (Hungarian algorithm), scikit-learn, NumPy, pandas.
