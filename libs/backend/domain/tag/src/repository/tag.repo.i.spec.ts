import { UserDomainModule, UserRepository } from '@codelab/backend/domain/user'
import { initUserContext } from '@codelab/backend/test'
import { v4 } from 'uuid'

import { Tag } from '../model'
import { TagRepository } from './tag.repo.service'

describe('Tag repository.', () => {
  let tagRepository: TagRepository
  let userRepository: UserRepository

  const context = initUserContext({
    imports: [UserDomainModule],
    providers: [TagRepository, UserRepository],
  })

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    await ctx.beforeAll()

    tagRepository = module.get<TagRepository>(TagRepository)
    userRepository = module.get<UserRepository>(UserRepository)
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('can create a tag', async () => {
    const owner = await userRepository.add({
      auth0Id: 'something',
      email: 'something@some.thing',
      id: v4(),
      roles: [],
      username: 'someusername',
    })

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
      owner,
    })

    const childTag = new Tag({
      children: [],
      id: childTagId,
      name: childTagName,
      owner,
      // parent: parentTag,
    })

    /**
     * First create 2 tags that aren't connected
     */
    await tagRepository.addMany([childTag, parentTag])

    let savedParentTag = await tagRepository.findOneOrFail({
      where: { id: parentTag.id },
    })

    let savedChildTag = await tagRepository.findOneOrFail({
      where: { id: childTag.id },
    })

    // Parent
    expect(savedParentTag.name).toEqual(parentTagName)
    expect(savedParentTag.children[0]?.name).toEqual(childTagName)

    // Child
    expect(savedChildTag.name).toEqual(childTagName)
    expect(savedChildTag.parent?.name).toEqual(parentTagName)

    // Run again to check for the e2e error on second seed
    await tagRepository.save(parentTag)
    await tagRepository.save(childTag)

    savedParentTag = await tagRepository.findOneOrFail({
      where: { id: parentTag.id },
    })
    savedChildTag = await tagRepository.findOneOrFail({
      where: { id: childTag.id },
    })

    // Parent
    expect(savedParentTag.name).toEqual(parentTagName)
    expect(savedParentTag.children[0]?.name).toEqual(childTagName)

    // Child
    expect(savedChildTag.name).toEqual(childTagName)
    expect(savedChildTag.parent?.name).toEqual(parentTagName)

    /**
     * Then update relationship
     */
    // childTag.parent = parentTag

    // await tagRepository.save(childTag)

    // savedChildTag = await tagRepository.find({ id: childTag.id })

    // expect(savedChildTag?.parent?.id).toEqual(parentTag.id)
  })
})
