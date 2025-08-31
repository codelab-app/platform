## Prompting

### Core Principles

- **Do exactly what has been asked; nothing more, nothing less**
- **NEVER add extra features, convenience methods, or "nice-to-have" functionality**
- **NEVER add logging, console output, or status messages unless explicitly requested**
- **NEVER create "list", "status", "info", or other utility commands unless asked**
- **NEVER create duplicate functionality - if something can be done with existing code, don't create another way to do it**
- **Use minimal configuration for services where possible**
- **Don't add "best practice" configurations unless explicitly requested**

### File Management

- **NEVER create files unless they're absolutely necessary for the requested task**
- **ALWAYS prefer editing an existing file to creating a new one**
- **NEVER proactively create documentation files (\*.md) or README files**

### Code Style

- **Write the minimal code required to fulfill the request**
- **Don't add error handling, validation, or edge cases unless requested**
- **Don't add type safety, interfaces, or abstractions beyond what's needed**
- **Prefer simpler and shorter code rather than optimized code**
- **Don't automatically add use cases to the original task**

### Examples of What NOT to Do

- Adding a "list" command when asked to create a build command
- Adding success/failure messages or console.log when not requested
- Creating helper functions or utilities "for convenience"
- Adding verbose logging or progress indicators
- Implementing additional validation or error checking
- Creating abstractions or interfaces "for future extensibility"

## Scope Management

### Change Isolation

- **Only modify what is explicitly broken or requested**
- **NEVER propagate changes to similar files/functions unless explicitly asked**
- **If you see a pattern in one place, DO NOT automatically apply it elsewhere**
- **Each bug fix or feature should be isolated to its specific context**

### Examples of What NOT to Do

- Finding an issue in e2e job → DON'T automatically fix the same in integration job
- Adding logging to one function → DON'T add logging to similar functions
- Fixing a bug in one component → DON'T "improve" other components
- Seeing an optimization opportunity → DON'T apply it unless it's the task

### The Rule

**"Fix only what's broken, change only what's requested, touch only what's necessary"**

## Git Workflow

### Commit Messages

- Never add Generated with [Claude Code](https://claude.ai/code)
- Never git push unless specifically asked to, when pushing use no-verify unless asked otherwise
- Never commit until I say to

## Claude fine-tuning

- Be brutally honest, don't be a yes man.
- If I am wrong, point it out bluntly.
- I need honest feedback on my code.
- When creating tasks, DO NOT automatically test them at the end unless explicitly asked to test.
- Make everything as concise as possible to achieve the goal, don't add extra features that are not asked for.
- Use minimal configuration for services where possible
- Avoid conditional logic, don't handle a use case that we didn't specify
- Do not handle a fallback case automatically unless asked specifically
- Do not add console.log or any output unless explicitly requested
- Stop being eager on adding code, only add what is necessary to accomplish the goal
- Stop providing defaults for configs
- Never set default values unless asked to
- Do not refactor code that isn't relevant to the task at hand
- If working with circleci, before commit always run `pnpm cpack` first

## Research and Information Lookup

- Use Perplexity MCP (`mcp__perplexity__`) whenever you have any question that requires external information
- Use perplexity mcp instead of web search
- Perplexity provides faster, more summarized results ideal for answering questions
- Only use web search as a fallback if Perplexity is unavailable or fails

## GitHub Issue Context

- When I say "update issue" or "create issue regarding this", I'm referring to GitHub issues
- Default to the current repository unless specified otherwise
- **IMPORTANT**: Only create GitHub issues for repositories under the `codelab-app` organization. Never create issues for any other organization or personal repositories
