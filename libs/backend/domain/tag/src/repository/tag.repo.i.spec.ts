import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import {
  SeederDomainModule,
  SeederDomainService,
} from '@codelab/backend/domain/shared/seeder'
import { UserDomainModule } from '@codelab/backend/domain/user'
import { initUserContext } from '@codelab/backend/test'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { v4 } from 'uuid'
import { Tag } from '../model'
import { TagRepository } from './tag.repo.service'

describe('Tag repository.', () => {
  let tagRepository: TagRepository

  const context = initUserContext({
    imports: [UserDomainModule, SeederDomainModule],
    providers: [TagRepository],
  })

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    await ctx.beforeAll()

    tagRepository = module.get<TagRepository>(TagRepository)
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

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
    })

    const childTag = new Tag({
      children: [],
      id: childTagId,
      name: childTagName,
      // parent: parentTag,
    })

    /**
     * First create 2 tags that aren't connected
     */
    await tagRepository.addMany([childTag, parentTag])

    let savedParentTag = await tagRepository.findOne({
      where: { id: parentTag.id },
    })

    let savedChildTag = await tagRepository.findOne({
      where: { id: childTag.id },
    })

    // Parent
    expect(savedParentTag?.name).toEqual(parentTagName)
    expect(savedParentTag?.children[0]?.name).toEqual(childTagName)

    // Child
    expect(savedChildTag?.name).toEqual(childTagName)
    expect(savedChildTag?.parent?.name).toEqual(parentTagName)

    // Run again to check for the e2e error on second seed
    await tagRepository.save(parentTag)
    await tagRepository.save(childTag)

    savedParentTag = await tagRepository.findOne({
      where: { id: parentTag.id },
    })
    savedChildTag = await tagRepository.findOne({ where: { id: childTag.id } })

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
