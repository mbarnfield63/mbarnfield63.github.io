---
layout: page
title: Skills, plugins & hooks
description: The essentials — graphify, ponytail, grilling (Matt Pocock), TDD — and the hooks that run them automatically without being asked.
order: 3
---

# Skills

A skill is just a folder with a `SKILL.md` file in it — plain-language instructions, sometimes with a script or two alongside. No code integration, no API call: Claude reads the file into context when its name is invoked directly (e.g. `/grilling`) or when the situation matches a trigger described in the file, then follows those instructions for the rest of the task. The four below are the ones I actually reach for day to day. (A full list follows)

## Graphify

Turns a codebase (or docs, papers) into a queryable knowledge graph before Claude reads a single raw file. On an unfamiliar or large research repo, this replaces blind grepping with querying a pre-built structure — faster orientation, fewer wrong turns.

## Ponytail

A discipline layer against the standard agentic-coding failure mode: not wrong code, but _too much_ code. Enforces a fixed ladder before writing anything — does this need to exist, does the standard library cover it, does a native feature cover it, does an existing dependency cover it, can it be one line — before any custom code gets written. Deliberate shortcuts get a one-line marker in the code itself rather than being argued for in prose.

## Grilling

From [Matt Pocock's skills](https://github.com/mattpocock/skills). Interviews you about a plan or design before any code gets written — one question at a time, each with a recommended answer, until every ambiguity is resolved. Turns a vague or "waffly" ask into a concrete, agreed plan before a single line of code is written, rather than leaving the model to guess at requirements mid-implementation.

## TDD

Standard red-green-refactor: write a failing test that pins down the expected behaviour, write the minimum code to pass it, then refactor with that test as a safety net. Invoked for feature work or bug fixes where the correct behaviour can be stated up front — which is most research-pipeline code, where a function's contract (e.g. "given these quantum numbers, return this class ID") is usually known before it's written. It matters here specifically because it gives Claude a concrete, checkable target instead of "looks right" — a test either passes or it doesn't, which closes off an entire category of silently-wrong code.

## Full current list (outside of Claude code defaults)

| Skill               | What it does                                                                                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `codebase-design`   | Vocabulary/method for designing deep modules and finding where a seam belongs                                                                   |
| `diagnosing-bugs`   | Structured diagnosis loop for hard bugs and performance regressions                                                                             |
| `discord:configure` | Sets up a Discord channel integration                                                                                                           |
| `domain-modeling`   | Builds and sharpens a project's domain model and terminology                                                                                    |
| `find-skills`       | Helps discover and install other skills for a described need                                                                                    |
| `get-up-to-speed`   | Reads the project's state file and briefs you at the start of a session ([repo](https://github.com/mbarnfield63/claude-state-skills))           |
| `graphify`          | Any input → queryable knowledge graph with community detection                                                                                  |
| `grilling`          | Interviews you about a plan one question at a time before building                                                                              |
| `ponytail`          | Forces the laziest solution that actually works (the YAGNI ladder)                                                                              |
| `ponytail-audit`    | Whole-repo scan for over-engineering; ranked list of what to delete                                                                             |
| `ponytail-debt`     | Harvests every deliberate shortcut comment into a trackable ledger                                                                              |
| `save-state`        | Overwrites the state file, appends to the log, and commits both in the notes repo ([repo](https://github.com/mbarnfield63/claude-state-skills)) |
| `tdd`               | Test-driven, red-green-refactor development                                                                                                     |

# Hooks

Skills only fire when named; hooks fire automatically, without being asked:

- **Ponytail** loads its full ruleset as hidden context on every session start/resume — always on, no need to invoke it per task.
- **Graphify** runs a diff against `HEAD~1` after every git commit and rebuilds the graph as needed, so it never goes stale relative to the code.
