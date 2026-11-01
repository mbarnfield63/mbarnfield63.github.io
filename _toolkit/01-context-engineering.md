---
layout: page
title: Context engineering
description: Token limits are the real constraint on agentic coding — the whole setup exists to manage what's in the context window, not to add features for their own sake.
order: 1
---

Anyone who's had a long back-and-forth with a chatbot has hit the same wall: it starts going in circles, re-suggesting things you already ruled out, losing track of what the function actually does, forgetting information you gave it three messages ago. Eventually the conversation is more work to steer than to restart.

## But why?

Token limits. A long session degrades well before the hard context ceiling, simply because relevant information gets buried under everything else that's been said. The fix is structural, not "prompting harder" — see [File structure & CLAUDE.md](/toolkit/02-file-structure-and-claude-md/) for the concrete mechanism: a segmented config per project plus a get up to speed / save state cycle.

## The cycle

A natural stopping point (feature finished, milestone reached) triggers:

```
commit → "save state" → /clear
```

`/clear` wipes the conversation; the state + log files mean nothing is actually lost. The next session opens with "get up to speed" and reconstructs exactly as much context as is needed — no more, no less.

## Prompting follows the same logic

- Clear, concise, detailed prompts get used deliberately, not as an afterthought — every vague or "waffly" ask costs tokens re-deriving what should have been stated up front.
- Large or ambiguous asks get interrogated before any code is written (see [grilling](/toolkit/03-skills-plugins-and-hooks/#grilling)) rather than left for the model to guess at mid-implementation.
