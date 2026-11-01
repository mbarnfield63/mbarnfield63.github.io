---
layout: page
title: Workflow strategy & takeaways
description: A project idea, start to finish — the step-by-step pipeline from grilling out a plan to the commit that closes the loop.
order: 4
---

## The workflow, step by step

How a project idea actually gets built, start to finish:

1. Launch Claude Code in the project directory.
2. "Get up to speed" — reconstruct context from the state file.
3. `/grilling` — "I want to make [idea]."
4. Write a long, detailed description of what's wanted or what's broken.
5. Answer lots of questions, one at a time, until there's a shared understanding.
6. Confirm the finished plan.
7. Ponytail kicks in — code gets written under its ruleset as it's implemented.
8. Commit the changes and "save state."
9. Graphify kicks in — updates the graph's nodes and edges to match.
10. Run the code or pipeline.
11. Run the tests.
12. Spawn agents as needed for specific code blocks or pipeline sections, and wait for them to finish.
13. Log file gets a new entry; the state file is replaced so the next session starts from current context, not stale context.

## Model selection

- **Sonnet** — daily driver.
- **Opus / Fable** — chosen by task type, not project size. Reserved for planning very large changes or refactors, not for "this project is important."

## Key takeaways

- Context, context, context — garbage in, garbage out.
- Isolate your projects — one `CLAUDE.md` per repo, not one global file trying to do everything.
- Keep saving logs — the state/log pair is what makes `/clear` safe.
- This setup is evolving constantly; treat it as a living config, not a finished one.

## Key references

- [Claude Cookbook](https://platform.claude.com/cookbook/) — practical guides and worked examples.
- [Matt Pocock's skills](https://github.com/mattpocock/skills) (source of grilling) — also see [his YouTube channel](https://www.youtube.com/@mattpocockuk).
