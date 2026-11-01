---
layout: page
title: Football analytics
description: Side projects applying my PhD toolkit to football data. A transfer fee model, Elo ratings for the 2026 World Cup and the English league pyramid, and a study of crowds and referees.
img:
importance: 1
category: fun
related_publications: false
---

Personal projects that use the same methods as my research (gradient-boosted models, rating systems, careful data checks) on football data.

## 1. Transfer fee model

### The problem

Transfer fees are hard to judge. Transfermarkt (TM) values are the usual reference, but they carry their own biases, such as a Premier League premium, so comparing across leagues is unreliable. I wanted a model of what a player _should_ cost, based on what the market has paid for similar players, and then to measure where clubs pay more or less than that.

### What I built

A six-step Python pipeline:

| Module                 | Role                                                                  |
| ---------------------- | --------------------------------------------------------------------- |
| `inflation.py`         | Scales each fee by the median fee of its transfer window              |
| `engineering.py`       | Feature engineering: position, age, contract length                   |
| `transfer_features.py` | Playing time, per-90 output, injury history and club context features |
| `train.py`             | XGBoost model, tuned with Optuna and walk-forward cross-validation    |
| `evaluate.py`          | Hold-out test, SHAP attribution, residual analysis                    |
| `overpayment.py`       | Per-player and per-league over- and under-payment                     |

The data covers 707 outgoing transfers from ten European top leagues, 2017 to 2024. The model trains on 2017 to 2023 and is tested once on 2024.

### Results

| Metric                                | Value                |
| ------------------------------------- | -------------------- |
| Cross-validation RMSE (log scale)     | 1.067                |
| 2024 hold-out RMSE (log scale)        | 1.293                |
| 2024 hold-out MAE (log scale)         | 1.057                |
| 2024 hold-out R²                      | 0.285 (77 transfers) |
| Premier League premium over the model | about +23%           |
| Median TM value vs model fair value   | 1.94×                |

Market context matters most: how much the selling league spends, and its tier, are among the strongest features, along with the player's share of team minutes. Fees are noisy, so the model is a sanity check and a lower bound rather than a price predictor. The code is public at [Football-Transfer-Evaluation](https://github.com/mbarnfield63/Football-Transfer-Evaluation).

### Stack

XGBoost, Optuna, SHAP, pandas, scikit-learn, Matplotlib.

## 2. 2026 World Cup: who over- and under-performed?

### The problem

Pundits call a group stage result a "shock" or a "disappointment" based on a team's reputation. I wanted a baseline built only from past results, so that "over-performed" means something specific: more points than a team's own history said it should get.

### Method

**Data.** 49,405 international matches from 1872 up to the eve of the tournament (Kaggle international results dataset), plus the 72 group stage matches of the 2026 World Cup (48 teams, 12 groups of 4), scraped from FBRef with `soccerdata`.

**Elo ratings.** Every team starts at 1500 and is updated after each match with a 538-style Elo formula:

- K-factor by match type: World Cup 60, continental championships 50, qualifiers and Nations League 40, friendlies 20
- Goal-margin multiplier: 1-goal win ×1.0, 2-goal win ×1.5, 3+ goals `(11 + margin) / 8`
- Home advantage: +100 points, zero at neutral venues

Ratings stop at 10 June 2026 and are then frozen, so the group stage does not feed back into its own prediction.

**Expected points.** The rating gap gives win, draw and loss chances:

```
W_e = 1 / (1 + 10^(-elo_diff / 400))
p_draw = 0.23 × 4 × W_e × (1 − W_e)   # highest for evenly matched teams
p_win  = W_e − p_draw / 2
p_loss = (1 − W_e) − p_draw / 2
```

`3 × p_win + p_draw`, summed over a team's three group games, is its Elo-expected points. Actual points minus expected points is the over- or under-performance.

Top 10 Elo ratings going into the tournament:

| Rank | Team        | Elo  |
| ---- | ----------- | ---- |
| 1    | Spain       | 2221 |
| 2    | Argentina   | 2192 |
| 3    | France      | 2129 |
| 4    | England     | 2093 |
| 5    | Brazil      | 2070 |
| 6    | Colombia    | 2066 |
| 7    | Portugal    | 2048 |
| 8    | Ecuador     | 2030 |
| 9    | Netherlands | 2011 |
| 10   | Germany     | 2006 |

### Findings

{% include figure.liquid path="/assets/img/wc26_elo/hero_overunder.png" title="Actual points minus Elo-expected points, all 48 teams" %}

The biggest over-performers were Congo DR (+3.5: expected 0.5 points, got 4), Ghana (+2.9), Ivory Coast (+2.6), Bosnia and Herzegovina (+2.5), Türkiye (+2.2) and Cabo Verde (+2.2). Most of these teams have little World Cup history, so their ratings were low going in.

The biggest under-performers were Uruguay (−3.8: expected 5.8 points, got 2), Panama (−3.7: expected 3.7, got 0), Uzbekistan (−3.7), South Korea (−2.9), Ecuador (−2.5), and Canada and Tunisia (both −2.4). Canada was one of the three co-hosts.

England (expected 7.01, got 7) and Switzerland (expected 7.02, got 7) landed almost exactly on their prediction.

{% include figure.liquid path="/assets/img/wc26_elo/scatter.png" title="Elo-expected points against actual points. Teams above the diagonal over-performed" %}

{% include figure.liquid path="/assets/img/wc26_elo/comparison.png" title="Elo-expected and actual points for every team, sorted by expected points" %}

Spain went in as the top-rated team (2221 Elo, 8.12 expected points) and finished on 7, a small under-performance. France beat their expected points by 2.0 and Argentina by 1.3.

### Limitations and next steps

- No expected goals (xG) baseline. I planned a second baseline from match xG, but FBRef does not publish xG for this tournament.
- The three co-hosts (USA, Canada, Mexico) are treated as playing at neutral venues, although every group game was at home.
- Ratings do not drift back toward the average between tournaments, so teams that play rarely can carry stale ratings.
- The same approach could extend to the knockout rounds.

The code is public at [WorldCup26-ELO](https://github.com/mbarnfield63/WorldCup26-ELO).

### Stack

Python, pandas, NumPy, Matplotlib, soccerdata (FBRef), kagglehub.

## 3. English league pyramid Elo

**Status:** ongoing. Version 1 is complete.

### The problem

The same question as the World Cup project, asked of English club football: which club-seasons beat, or fell short of, what their rating said at the start of the season? The four professional tiers (Premier League to League Two) add a twist, because clubs move between tiers every year.

### Method

- 67,245 league matches from 1993-94 onwards, from football-data.co.uk.
- Elo ratings with a different starting rating for each tier, home advantage, and a partial pull back toward the average between seasons. The tier starting ratings were tuned so that promoted and relegated clubs are not systematically over- or under-rated.
- Expected points per game for each club-season, from ratings frozen at the start of the season, compared with actual points per game.
- As a check on the ratings, match predictions were scored against bookmaker odds (Bet365, with the bookmaker's margin removed) on about 49,000 matches. Log-loss (lower is better) is 1.044 for the Elo model and 1.030 for the bookmaker.

### Findings so far

{% include figure.liquid path="/assets/img/efl_pyramid_elo/hero_overunder.png" title="Biggest over- and under-performers against pre-season Elo expectation, English league football 1993-94 on. Blue: more points per game than expected; orange: fewer." %}

Among seasons with 30 or more games, the biggest over-performers are Doncaster 2003-04 (+1.36 points per game), Portsmouth 2002-03 (+1.04) and Notts County 2009-10 (+1.00). Leicester's title season, 2015-16, is fourth (+0.93). The biggest under-performer is Barnsley 2021-22 (−0.93).

### Stack

Python, pandas, Plotly.

## 4. Home advantage and bookings

**Status:** work in progress. Results to follow.

### The question

Away teams usually get more yellow cards than home teams. Is that because of the crowd? During COVID, English league matches were played behind closed doors, which gives a natural experiment: the same leagues and referees, with and without fans.

### Method

- Match data for the top four English tiers from 2000-01 onwards, from football-data.co.uk: yellow and red cards, fouls, referee and result.
- For each match, the gap between home and away cards and fouls. Measuring the gap within a match cancels out league-wide changes, such as stricter refereeing in some seasons.
- Compare matches with no fans (June 2020 to May 2021) against seasons with fans just before and after, with 95% confidence intervals. Home points and goal difference are compared the same way, to see whether home advantage in results also fell.
- Planned next: use attendance as a share of stadium capacity, to test whether fuller grounds mean a bigger card gap.

### Status

Phase 1 (fans against no fans) is built. Results and charts will be added here.

### Stack

Python, pandas, Plotly.
