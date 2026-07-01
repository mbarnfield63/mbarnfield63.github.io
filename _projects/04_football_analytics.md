---
layout: page
title: Football Analytics
description: Personal ML projects applying the same toolkit as my PhD to football data — a transfer market valuation model and a 150-year ELO rating system for World Cup 2026.
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

## 2. WC26 ELO — Who Over- and Under-Performed the Group Stage?

**Status:** v1 complete (ELO-expected points; xG-expected points blocked on data availability, see Limitations)

### The Problem

Pundits love to call a World Cup group stage a "shock" or a "disappointment," but that's usually a gut call against a team's reputation, not against a number. I wanted a pre-tournament baseline computed purely from historical results, so that "over-performed" and "under-performed" would mean something specific: more or fewer points than a team's own results history said they should get.

### Method

**Data.** 49,405 international matches from 1872 to the eve of the tournament (Kaggle's international results dataset), plus the 72 completed WC 2026 group stage matches (48-team format, 12 groups of 4) scraped from FBRef via `soccerdata`.

**ELO ratings.** Every national team bootstraps from 1500 with no between-tournament regression, and updates after every historical match with a 538-style ELO formula:

- K-factor by context: World Cup proper = 60, continental championships = 50, qualifiers/Nations League = 40, friendlies = 20
- Goal-margin multiplier: 1-goal win ×1.0, 2-goal ×1.5, 3+ goals × `(11 + margin) / 8`
- Home advantage: +100 ELO points, zeroed out for neutral-venue matches

Ratings are computed once, up to 2026-06-10, then frozen — the group stage itself doesn't feed back into the ratings used for prediction.

**Expected points.** ELO difference converts to win/draw/loss probabilities:

```
W_e = 1 / (1 + 10^(-elo_diff / 400))
p_draw = 0.23 × 4 × W_e × (1 − W_e)   # peaks for evenly-matched teams
p_win  = W_e − p_draw / 2
p_loss = (1 − W_e) − p_draw / 2
```

`3 × p_win + p_draw`, summed over each team's 3 group games, gives their ELO-expected points. Actual points come straight from final group standings. The gap between the two (`vs_elo`) is the over/under-performance signal.

Top 10 ELO ratings entering the tournament (all three co-hosts get neutral treatment despite home-soil advantage — see Limitations):

| Rank | Team | ELO |
|---|---|---|
| 1 | Spain | 2221 |
| 2 | Argentina | 2192 |
| 3 | France | 2129 |
| 4 | England | 2093 |
| 5 | Brazil | 2070 |
| 6 | Colombia | 2066 |
| 7 | Portugal | 2048 |
| 8 | Ecuador | 2030 |
| 9 | Netherlands | 2011 |
| 10 | Germany | 2006 |

### Findings

{% include figure.liquid path="/assets/img/wc26_elo/hero_overunder.png" title="Actual points minus ELO-expected points, all 48 teams" %}

The biggest over-performers relative to their historical rating: **Congo DR** (+3.5, expected 0.5 pts, got 4), **Ghana** (+2.9), **Ivory Coast** (+2.6), **Bosnia & Herzegovina** (+2.5), **Türkiye** (+2.2), and **Cabo Verde** (+2.2) — a cluster of teams with thin World Cup history and correspondingly low ELO floors, all of whom outran that history in the group stage.

The biggest under-performers: **Uruguay** (-3.8, expected 5.8 pts, got 2), **Panama** (-3.7, 0 from an expected 3.7), **Uzbekistan** (-3.7), **South Korea** (-2.9), **Ecuador** (-2.5), and **Canada** (-2.4, one of the three co-hosts).

Two teams called it almost exactly: **England** (expected 7.01, got 7) and **Switzerland** (expected 7.02, got 7) — as close to a perfect ELO prediction as this dataset produced.

{% include figure.liquid path="/assets/img/wc26_elo/scatter.png" title="ELO-expected points vs actual points — points above the diagonal over-performed" %}

{% include figure.liquid path="/assets/img/wc26_elo/comparison.png" title="ELO-expected vs actual points, every team, sorted by expected points" %}

Spain entered as the top-rated team (2221 ELO, 8.12 expected points) but finished on 7 — a slight under-performance rather than a shock, and still comfortably a group winner. Argentina and France both beat their expected points by ~2, while historically transient qualifiers (Congo DR, Ghana, Cabo Verde) produced the tournament's largest positive surprises purely because their pre-tournament rating had nothing to go on.

### Limitations & Future Work

- **No xG-expected points.** The original design called for a second baseline — Poisson-simulated expected points from match xG — to cross-check the ELO signal against in-tournament shot quality. I confirmed FBRef doesn't publish xG for this competition at all: neither `read_schedule()` nor `read_team_match_stats(stat_type="shooting")` return an xG column, and the method the code originally called (`read_shot_events()`) doesn't exist in the installed `soccerdata` version — it was silently falling back to NaN via a broad exception handler rather than actually working. If Opta xG shows up on FBRef for this tournament later, the `xg_xp` column and its chart already handle it (currently just hidden — the `min_count=1` fix in `compute_xp` keeps it as `NaN` rather than a misleading 0, and the comparison chart drops the bar entirely when no xG is present).
- **Co-host neutral-venue assumption.** USA, Canada, and Mexico are treated identically to any other neutral-venue team, despite playing every group game on home soil. A host-nation adjustment to the home-advantage term would sharpen the baseline for exactly the three teams most likely to benefit from crowd support.
- **No between-tournament ELO regression.** Ratings for nations with sparse recent fixtures can drift a long way from a "current" 1500 baseline between appearances — a decay term toward the mean would make ratings for rarely-active teams more trustworthy.
- **Knockout stage.** The same ELO-xP pipeline extends cleanly to single-elimination rounds; the main gap is that expected points no longer means "sum over 3 games" — it becomes cumulative survival probability instead.

### Stack

Python · pandas · NumPy · SciPy (Poisson) · Matplotlib/Seaborn · soccerdata (FBRef) · kagglehub
