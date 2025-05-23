import type { Difference } from 'dir-compare'

import chalk from 'chalk'
import { diffLines } from 'diff'
import { compare } from 'dir-compare'
import { readFileSync } from 'fs'
import path from 'path'

interface CompareDirectoriesParams {
  dir1: string
  dir2: string
}

const logDifference = async (diff: Difference) => {
  if (
    diff.state === 'distinct' &&
    diff.type1 === 'file' &&
    diff.type2 === 'file'
  ) {
    console.log(`State: ${diff.state}`)
    console.log(`Path1: ${diff.path1}`)
    console.log(`Path2: ${diff.path2}`)

    if (!diff.path1 || !diff.name1 || !diff.path2 || !diff.name2) {
      return
    }

    const fileName1 = path.resolve(diff.path1, diff.name1)
    const fileName2 = path.resolve(diff.path2, diff.name2)
    const content1 = readFileSync(fileName1, 'utf-8')
    const content2 = readFileSync(fileName2, 'utf-8')
    const contentDiff = diffLines(content1, content2)

    console.log('-------------------------------------')
    console.log(`Diff found: ${fileName1} & ${fileName2}`)

    contentDiff.forEach((part) => {
      if (part.added) {
        console.log(chalk.green(part.value))
      } else if (part.removed) {
        console.log(chalk.red(part.value))
      } else {
        console.log(chalk.grey(part.value))
      }
    })
  }

  console.log('-------------------------------------')
}

export const areDirectoriesIdentical = async ({
  dir1,
  dir2,
}: CompareDirectoriesParams): Promise<boolean> => {
  const options = {
    compareContent: true,
    excludeFilter: '**/components/**',
  }

  const res = await compare(dir1, dir2, options)

  if (!res.same && res.diffSet) {
    for (const diff of res.diffSet) {
      await logDifference(diff)
    }
  }

  return res.same
}
