---
layout: page
title: ExoMol LLM wiki
description: A source-checked knowledge base of the ExoMol literature, built with an LLM and kept honest by deterministic checks.
img:
importance: 5
category: research
related_publications: false
---

## The problem

[ExoMol](https://www.exomol.com/) has published line lists for many molecules over many years. The facts about each one (which method, which data, which paper, who worked on it) are spread across hundreds of papers. Finding them quickly is hard, and an LLM asked directly will often make them up.

## What I built

A structured wiki of the ExoMol literature, written by an LLM but tied to sources. Every claim must link back to a peer-reviewed paper.

- Papers are first turned into structured records, from Elsevier XML or arXiv LaTeX source. The wiki notes are then written from those records, not from memory.
- Notes cover molecules, methods, papers, people and applications, each with a fixed metadata schema.
- A standard-library command-line tool checks the wiki: it builds the catalogue, lints notes against the schema, and scans for missing or unlinked sources.

The catalogue holds 365 entries, including about 200 molecule notes. The repo is public at [ExoMoLLMWiki](https://github.com/mbarnfield63/ExoMoLLMWiki).

## Next

Testing a cheaper bulk-extraction layer, run on a local model on UCL's GPU cluster, with checked claims promoted into the wiki.

## Stack

Python (standard library, Pydantic), Elsevier and arXiv source parsing, Git.
