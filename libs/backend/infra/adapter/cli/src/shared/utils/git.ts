import simpleGit from 'simple-git'

export const gitChangedFiles = async () => {
  const git = simpleGit()
  const status = await git.status()

  const unCommittedFiles = [
    ...status.modified,
    ...status.not_added,
    ...status.created,
    ...status.deleted,
    ...status.renamed.map((file) => file.to),
  ]

  return { unCommittedFiles }
}
