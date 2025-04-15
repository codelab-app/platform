import { UserDomainModule, UserRepository } from '@codelab/backend-domain-user'
import { initUserContext } from '@codelab/backend-test-setup'
import { IConfigPaneTab } from '@codelab/shared-abstract-core'
import { BreakpointType } from '@codelab/shared-infra-gqlgen'
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
      name: 'someusername',
      picture: '',
      preferences: {
        activeConfigPaneTab: IConfigPaneTab.Node,
        builderBreakpointType: BreakpointType.Desktop,
        builderWidth: 1000,
        id: v4(),
      },
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

  it('can query descendants of a tag', async () => {
    const owner = await userRepository.add({
      auth0Id: 'auth0_test',
      email: 'test@example.com',
      id: v4(),
      name: 'testuser',
      picture: '',
      preferences: {
        activeConfigPaneTab: IConfigPaneTab.Node,
        builderBreakpointType: BreakpointType.Desktop,
        builderWidth: 1000,
        id: v4(),
      },
      roles: [],
      username: 'testuser',
    })

    // Root tag
    const rootTagId = v4()

    const rootTag = new Tag({
      children: [],
      id: rootTagId,
      name: 'Root Tag',
      owner,
    })

    // Level 1 child
    const level1TagId = v4()

    const level1Tag = new Tag({
      children: [],
      id: level1TagId,
      name: 'Level 1 Tag',
      owner,
    })

    // Level 2 child
    const level2TagId = v4()

    const level2Tag = new Tag({
      children: [],
      id: level2TagId,
      name: 'Level 2 Tag',
      owner,
    })

    // First create all tags independently
    await tagRepository.addMany([rootTag, level1Tag, level2Tag])

    // Set up the hierarchy
    rootTag.children = [level1Tag]
    level1Tag.children = [level2Tag]

    // Save the relationships
    await tagRepository.save(rootTag)
    await tagRepository.save(level1Tag)

    // Query the root tag with descendants
    const savedRootTag = await tagRepository.findOneOrFail({
      where: { id: rootTagId },
    })

    // Get descendants (this should use the custom resolver)
    const descendants = await savedRootTag.descendants

    console.log(descendants)

    // Verify the hierarchy
    // Should include both level1 and level2 tags
    expect(descendants).toHaveLength(2)
    expect(descendants.map((descendant) => descendant.name)).toContain(
      'Level 1 Tag',
    )
    expect(descendants.map((descendant) => descendant.name)).toContain(
      'Level 2 Tag',
    )
  })
})
