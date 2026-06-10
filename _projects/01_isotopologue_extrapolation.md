---
layout: page
title: Machine Learning Isotopologue Extrapolation
description: Published MLP framework predicting molecular energy level shifts across isotopologues — Journal of Molecular Spectroscopy (2026)
img: assets/img/1.jpg
importance: 1
category: research
related_publications: false
---

Molecules exist in isotopologue variants — the same chemical species but with different isotopes (e.g., ¹²C¹⁶O₂ vs ¹³C¹⁶O₂). Their rotational-vibrational energy levels shift predictably, but computing these shifts from first principles for every variant is computationally expensive. This project replaces those ab initio calculations with a trained neural network.

## What I Built

A PyTorch MLP regression framework (v0.2.0) that learns the mapping between energy levels across isotopologue pairs, enabling rapid extrapolation from a well-characterised parent isotopologue to its variants. The framework is configurable, YAML-driven for reproducibility, and designed for integration into the ExoMol spectroscopic database pipeline.

## Next Steps

The in-progress GNN extension (`GNN_Isotope_Shifts`, v0.1.0, PyTorch Geometric) frames the problem as a graph regression task — each energy level is a node with edges encoding inter-level relationships — enabling the model to exploit structural physics that the MLP cannot access.

## Key Details

| | |
|---|---|
| **Publication** | JMS 2026 — doi:[10.1016/j.jms.2026.112084](https://doi.org/10.1016/j.jms.2026.112084) |
| **Framework** | PyTorch MLP (v0.2.0); GNN extension in progress |
| **Validation** | Leave-one-isotopologue-out (LOIO) cross-validation |
| **Application** | CO, CO₂, H₂O and polyatomics |

## Technical Stack

- PyTorch (MLP regression, configurable depth/width)
- PyTorch Geometric (GNN extension — HybridIsotopologueGATv2)
- NumPy / Pandas (spectroscopic data preprocessing at scale)
- YAML-driven config for reproducible experiments

## Publication

**M.G. Barnfield**, O.L. Polyansky, S.N. Yurchenko & J. Tennyson  
*Machine learning isotopologue extrapolation for molecular energy levels*  
Journal of Molecular Spectroscopy (2026) — [doi:10.1016/j.jms.2026.112084](https://doi.org/10.1016/j.jms.2026.112084)
