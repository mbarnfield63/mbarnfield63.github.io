---
layout: page
title: File structure & CLAUDE.md
description: One segmented CLAUDE.md per research project, with get up to speed / save state hooking into plain Obsidian markdown — not a single global config.
order: 2
---

## Two separate trees

- `C:/Code/<project>/`: the actual code, one git repo per project (e.g. `WC26_elo/`). Each gets its **own** `CLAUDE.md`.
- `C:/Code/Obsidian/`: a separate notes vault, kept apart from the code, with one folder per project holding:
  - `<Project>_state.md`: a single, always-overwritten "where things stand" file.
  - `<Project> Log.md`: an append-only history of what was done, session by session.

Code and notes are deliberately kept apart: in a project session, Claude may only write to that project's state and log files in the vault, even when it has full read/write access to the code repo.

## Why per-project, not one global file

Every research project has its own conventions, environment (`uv`, HPC quirks), and stage of maturity. A single vault-wide `CLAUDE.md` either drowns in project-specific rules or stays too generic to be useful. Segmenting means Claude only loads the rules relevant to the repo it's actually sitting in.

## The pattern, concretely

Every project `CLAUDE.md` implements the same rules, e.g. from `WC26_elo/CLAUDE.md`:

```
### 1. Initialize
When the user says "get up to speed", invoke the get-up-to-speed skill. It reads
C:/Code/Obsidian/Personal Projects/WC26 Elo/WC26 Elo_state.md.

### 2. Log & Save
When the user says "save state", invoke the save-state skill. It overwrites the
state file and appends a summary to
C:/Code/Obsidian/Personal Projects/WC26 Elo/WC26 Elo Log.md.
Never modify any other files in C:/Code/Obsidian/.

### 3. Git
Never commit directly.
```

The two skills, `get-up-to-speed` and `save-state`, are public at [claude-state-skills](https://github.com/mbarnfield63/claude-state-skills). `save-state` also commits and pushes just those two files in the notes repo, so the state is shared across machines and agents.

`/init` gives a reasonable first draft of the rest of the file (architecture, commands, data sources); the state/log rules above are added by hand on top of it and are the same shape across every project.

## Result

"Get up to speed" reconstructs full context from a few hundred words instead of Claude re-reading the whole repo. "Save state" is the checkpoint before `/clear` — this is the concrete implementation of the cycle described in [Context Engineering](/toolkit/01-context-engineering/).
