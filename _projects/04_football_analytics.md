---
layout: page
title: Football Analytics
description: Personal ML projects applying the same toolkit as my PhD to football data — a transfer market valuation model and a World Cup player similarity engine.
img:
importance: 1
category: fun
related_publications: false
---

Personal projects applying graph neural networks, XGBoost, and web scraping to football data. Same methodology as my research work, just in a very different domain.

---

## 1. Transfer Market Valuation Model

**Status:** v1 complete

### The Problem

Football transfer fees are notoriously opaque. Transfermarkt (TM) valuations are widely used as a proxy for fair value, but they embed systematic biases — particularly a Premier League premium — that make cross-league comparisons unreliable. The goal was to build a data-driven model that estimates what a player *should* cost, then quantify where the market over- or underpays.

### What I Built

An end-to-end six-module Python pipeline:

| Module | Role |
|--------|------|
| `inflation.py` | Normalises historical transfer fees to a common year using CPI-style indices |
| `engineering.py` | Feature engineering: positional encoding, age curves, contract length proxies |
| `transfer_features.py` | Constructs centrality features (% team minutes, appearances) and per-90 output stats |
| `train.py` | XGBoost regressor with cross-validated hyperparameter search |
| `evaluate.py` | Hold-out evaluation, SHAP attribution, residual decomposition |
| `overpayment.py` | Per-player and per-league market-premium analysis |

### Results

| Metric | Value |
|--------|-------|
| CV RMSE | **1.03** |
| 2024 hold-out RMSE | **1.21** |
| Hold-out MAE | **1.01** |
| Hold-out R² | **0.29** (42 test rows) |
| PL residual premium | **+23%** |
| Median TM vs model fair value | **1.94×** |

**SHAP finding:** Centrality features (`pct_team_minutes`, `appearances`) dominate over raw per-90 output metrics — the market prices role and availability, not just production.

### Stack

XGBoost · SHAP · Pandas · Scikit-learn · Matplotlib

---

## 2. WC Twin — World Cup Player Similarity Engine

**Status:** In progress — scraper complete, model in development

### The Problem

The 2026 World Cup squads contain players from leagues with very different data coverage. The goal is to embed every World Cup player into a shared latent space using their on-pitch behaviour, so that "find me the player in Group B who plays most like [X]" becomes a nearest-neighbour query rather than a manual scouting exercise.

### What I'm Building

A two-stage pipeline:

**Stage 1 — Data collection (complete)**

A FBRef scraper that collects full statistical profiles for all World Cup players across their domestic league seasons. Key engineering challenges solved:

- FBRef wraps stats tables inside HTML comments — standard BeautifulSoup parsing returns empty; fixed by explicitly searching `bs4.Comment` nodes
- Player-page checkpoint system saves progress after each of 397 players, so crashes don't lose hours of scraping
- Browser session refresh every 50 players prevents Chrome dying on long runs
- 38 leagues confirmed scraped

**Stage 2 — GraphSAGE encoder (in development)**

A GraphSAGE model with weak 7-class positional supervision. Each player is a node with 8 input features; edges encode positional and stylistic similarity. The classifier head is discarded after training — the penultimate-layer embeddings become the similarity representation saved to `data/processed/embeddings.npy`.

### Next Steps

- Build `src/model.py` — GraphSAGE encoder
- Regenerate `graph.pt` with updated `players.parquet`
- Rebuild full pipeline via `main.py`
- Nearest-neighbour query interface

### Stack

PyTorch Geometric · GraphSAGE · BeautifulSoup · Selenium · Pandas · NumPy
