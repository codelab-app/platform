/* eslint-disable @nx/enforce-module-boundaries */
import { Tag, TagRepository } from '@codelab/backend/domain/tag'
import { createTagsData } from '@codelab/shared/data/test'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiHandler } from 'next'

const tagRepository = new TagRepository()

/**
 * Used as endpoint for creating Cypress data
 */
const createTags: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance().getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const owner = { auth0Id: session.user.sub }
    const tagsData = createTagsData(owner)

    /**
     * Create the types
     */
    const tags = tagsData.map((tagData) => {
      return new Tag(tagData)
    })

    await tagRepository.add(tags)

    return res.send(tags)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }
  }

  return res.status(500)
}

export default createTags
