import { AdminService } from '@codelab/backend/domain/admin'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import { IRole } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { Tag } from '../model'
import { TagRepository } from './tag.repo'

const tagRepository = new TagRepository()
const userRepository = new UserRepository()

const user = new User({
  auth0Id: v4(),
  email: 'admin@codelab.app',
  id: v4(),
  roles: [IRole.Admin],
  username: 'Codelab',
})

beforeAll(async () => {
  await new AdminService().reset()

  await userRepository.save(user)

  const savedUser = await userRepository.find({ email: user.email })

  expect(savedUser?.username).toEqual('Codelab')
})

afterAll(async () => {
  const driver = getDriver()
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
          name: childTagName,
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

    let savedParentTag = await tagRepository.find({ id: parentTag.id })
    let savedChildTag = await tagRepository.find({ id: childTag.id })

    // Parent
    expect(savedParentTag?.name).toEqual(parentTagName)
    expect(savedParentTag?.children[0]?.name).toEqual(childTagName)

    // Child
    expect(savedChildTag?.name).toEqual(childTagName)
    expect(savedChildTag?.parent?.name).toEqual(parentTagName)

    // Run again to check for the e2e error on second seed
    await tagRepository.save(parentTag)
    await tagRepository.save(childTag)

    savedParentTag = await tagRepository.find({ id: parentTag.id })
    savedChildTag = await tagRepository.find({ id: childTag.id })

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
