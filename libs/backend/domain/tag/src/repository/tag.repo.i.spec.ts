import { AdminService } from '@codelab/backend/domain/admin'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import { setupNewUser } from '@codelab/backend/test'
import type { IUserDTO } from '@codelab/frontend/abstract/core'
import { v4 } from 'uuid'
import { Tag } from '../model'
import { TagRepository } from './tag.repo'

const tagRepository = new TagRepository()
let user: IUserDTO
const driver = getDriver()

beforeAll(async () => {
  user = await setupNewUser({
    AdminService,
    driver,
    User,
    UserRepository,
  })
})

afterAll(async () => {
  await driver.close()
})

describe('Tag repository.', () => {
  it('can create a tag', async () => {
    // Parent
    const parentTagId = v4()
    const parentTagName = 'Parent Tag'
    // Child
    const childTagId = v4()
    const childTagName = 'Child Tag'

    const parentTag = new Tag({
      children: [
        {
          id: childTagId,
        },
      ],
      id: parentTagId,
      name: parentTagName,
      owner: { auth0Id: user.auth0Id },
    })

    const childTag = new Tag({
      children: [],
      id: childTagId,
      name: childTagName,
      owner: { auth0Id: user.auth0Id },
      parent: parentTag,
    })

    /**
     * First create 2 tags that aren't connected
     */
    await tagRepository.add([parentTag, childTag])

    let savedParentTag = await tagRepository.findOne({ id: parentTag.id })
    let savedChildTag = await tagRepository.findOne({ id: childTag.id })

    // Parent
    expect(savedParentTag?.name).toEqual(parentTagName)
    expect(savedParentTag?.children[0]?.name).toEqual(childTagName)

    // Child
    expect(savedChildTag?.name).toEqual(childTagName)
    expect(savedChildTag?.parent?.name).toEqual(parentTagName)

    // Run again to check for the e2e error on second seed
    await tagRepository.save(parentTag)
    await tagRepository.save(childTag)

    savedParentTag = await tagRepository.findOne({ id: parentTag.id })
    savedChildTag = await tagRepository.findOne({ id: childTag.id })

    // Parent
    expect(savedParentTag?.name).toEqual(parentTagName)
    expect(savedParentTag?.children[0]?.name).toEqual(childTagName)

    // Child
    expect(savedChildTag?.name).toEqual(childTagName)
    expect(savedChildTag?.parent?.name).toEqual(parentTagName)

    /**
     * Then update relationship
     */
    // childTag.parent = parentTag

    // await tagRepository.save(childTag)

    // savedChildTag = await tagRepository.find({ id: childTag.id })

    // expect(savedChildTag?.parent?.id).toEqual(parentTag.id)
  })
})
