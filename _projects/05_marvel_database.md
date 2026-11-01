---
layout: page
title: MARVEL database
description: One database for MARVEL energy level data across many molecules, with a read-only API and a website in development.
img:
importance: 3
category: research
related_publications: false
---

## The problem

MARVEL is the method ExoMol and others use to turn thousands of measured spectral lines into a consistent set of measured energy levels. Each MARVEL study publishes its own files, in its own layout, for one molecule at a time. Comparing studies, or tracing a level back to the paper it came from, means digging through many folders by hand.

## What I built

A single PostgreSQL database that stores many MARVEL runs under one schema. A run is one MARVEL solve: a molecule, a set of measured lines and an algorithm version, giving a set of energy levels.

- A loader reads one YAML manifest per publication, checks it, and loads the raw files. Loading the same data twice is skipped, not duplicated.
- Every level and line links back to the publication and source it came from.
- A read-only REST API (FastAPI) lets you browse molecules, runs, energy levels and transitions, and download the original published files unchanged. It connects through a database role that can only read.
- A static website, built from the API, is in development.

The database now holds 31 runs from 19 publications, covering 29 isotopologues. Molecules include CO, CO₂, SO, CN, PN, VO, AlO, TiO, HOCl, HD¹⁸O and the H₃⁺ family.

## Status

The database, loader and API work locally. The API and website are not public yet: hosting on the ExoMol servers is being arranged, and some data checks are still open before release.

The code is public at [MARVEL_db](https://github.com/mbarnfield63/MARVEL_db) and [MARVELdb_online](https://github.com/mbarnfield63/MARVELdb_online).

## Stack

PostgreSQL 17, Docker Compose, FastAPI, Python, Astro.
