const czConfig = require('../../.cz-config.js')

// Extract and join all commit types into comma-separated string
const types = czConfig.types.map((type) => type.value).join(', ')

// Define the AI prompt template for generating commit messages
// Uses conventional commit format: <type>: <description>
const AIDER_COMMIT_PROMPT = `You are an expert software engineer that generates concise, \
one-line Git commit messages based on the provided diffs.
Review the provided context and diffs which are about to be committed to a git repo.
Review the diffs carefully.
Generate a one-line commit message for those changes.
The commit message should be structured as follows: <type>: <description>
Use these for <type>: ${types}

Ensure the commit message:
- Starts with the appropriate prefix.
- Is in the imperative mood (e.g., "Add feature" not "Added feature" or "Adding feature").
- Does not exceed 72 characters.
- Starts with a lowercase letter.

Reply only with the one-line commit message, without any additional text, explanations, \
or line breaks.
`

// Set the environment variable for aider to use
process.env.AIDER_COMMIT_PROMPT = AIDER_COMMIT_PROMPT
