import type { IUser } from '@codelab/backend/abstract/core'
import { AdminService } from '@codelab/backend/domain/admin'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import { IRole } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { Tag } from '../model'
import { TagRepository } from './tag.repo'

let tagRepository: TagRepository
let userRepository: UserRepository
let user: IUser

beforeAll(async () => {
  await new AdminService().reset()
  tagRepository = new TagRepository()
  userRepository = new UserRepository()

  user = new User({
    id: v4(),
    auth0Id: v4(),
    email: 'admin@codelab.app',
    username: 'Codelab',
    roles: [IRole.User],
  })

  await userRepository.add([user])

  const savedUser = await userRepository.find({ email: user.email })

  expect(savedUser?.username).toEqual('Codelab')
})

afterAll(async () => {
  const driver = getDriver()
  await driver.close()
})

describe('Tag repository', () => {
  it('can create a tag', async () => {
    const parentTag = new Tag({
      id: v4(),
      name: 'Parent Tag',
      owner: { auth0Id: user.auth0Id },
      children: [],
    })

    const childTag = new Tag({
      id: v4(),
      name: 'Child Tag',
      owner: { auth0Id: user.auth0Id },
      // parent: parentTag,
      children: [],
    })

    /**
     * First create 2 tags that aren't connected
     */
    await tagRepository.add([parentTag, childTag])

    const savedParentTag = await tagRepository.find({ id: parentTag.id })
    let savedChildTag = await tagRepository.find({ id: childTag.id })

    expect(savedChildTag?.name).toEqual(childTag.name)
    expect(savedParentTag?.name).toEqual(parentTag.name)

    /**
     * Then update relationship
     */
    childTag.parent = parentTag

    await tagRepository.save(childTag)

    savedChildTag = await tagRepository.find({ id: childTag.id })

    expect(savedChildTag?.parent?.id).toEqual(parentTag.id)
  })
})
