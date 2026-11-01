---
layout: page
title: Headers for ExoMol
description: A command-line tool that adds column labels to ExoMol data files and converts them to CSV, without changing the originals.
img:
importance: 4
category: research
related_publications: false
---

## The problem

ExoMol line lists come as `.states` and `.trans` files with no column headers. What each column means is written only in a separate `.def` file. Every user has to read that file and label the columns by hand before the data is usable in pandas, a spreadsheet or a database.

## What I built

`headers-for-ExoMol`, a small command-line tool that reads the `.def` file and gives the labels back in the form you need:

- `inspect` shows the columns a dataset declares.
- `convert` writes a labelled CSV. It can also join quantum numbers from the `.states` file onto each transition.
- `sidecar` writes a schema file next to the data, and `inject` writes a labelled copy. The original files are never changed.
- Pointed at a folder, `convert` handles every chunk of a large line list in one go, and loads the `.states` file only once.

The default engine uses only the Python standard library. An optional Polars engine gives the same output byte for byte, about 1.6 times faster on a 7.2 million row H₂S file.

The code is public at [headers-for-ExoMol](https://github.com/mbarnfield63/headers-for-ExoMol). It is not on PyPI yet.

## Stack

Python (standard library), Polars (optional).
