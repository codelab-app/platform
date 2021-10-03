# CI/CD Pipeline

[Back](../../README.md)

Here I'll take you through the lifecycle of a Task to give you an overview of our pipeline

## Github Issues

The `To do` column will be your assigned Tasks to work on. Any assigned issues that aren't present in this column should be held off until further notice.

<img src="https://codelab.sfo2.digitaloceanspaces.com/docs/workflow/github-project-board.png" width="640">

Use the `To do` column as the single source of truth for what to work on.

### Priority

The Task closer to the top of the list takes priority.

<img src="https://codelab.sfo2.digitaloceanspaces.com/docs/workflow/github-project-priority.png" width="320">

---

In the lifecycle of a Task, you will have to move the card 2 times.

Select a Card from the `To do` then move it to `In progress` to begin work on it.

<!-- ### Second Time

After completing the task, create a Pull Request & move the Task to `Review in progress` -->

## Branching

Clone from `master` to a new branch. Name it something relevant to your task and use kebab-case-like-this.

## Git Commits

When commiting code, use `yarn commit` instead of `git commit`. You'll be let through a series of questions to construct the proper commit message format.

You may manually construct the message after learning the proper format.

Your changes will be linted by ESLint during the commit process.

## Push to Github

The code will be tested by Jest, and built prior to pushing to the repository.

## CircleCI

Once you create the PR, CircleCI will perform checks before the branch can be merged to master. Once the checks are complete, this is the second time you'll have to move the Task card. Move it from `In progress` to `Review in progress` and assign me as the `Reviewer`

<img src="https://codelab.sfo2.digitaloceanspaces.com/docs/workflow/github-project-reviewers.png" width="480">
