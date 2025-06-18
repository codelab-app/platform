// This is the old path alias
export type PathAlias = string

export type PathAliasMap = Record<
  PathAlias,
  {
    // This is the new path alias format
    expected: string
    // This is the path to the project
    path: string
    // This is the name of the project
    name: string | null
  }
>
