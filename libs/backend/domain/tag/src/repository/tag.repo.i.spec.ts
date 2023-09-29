import { AdminRepository } from '@codelab/backend/domain/admin'
import type { IUserDTO } from '@codelab/shared/abstract/core'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { v4 } from 'uuid'
import { Tag } from '../model'
import { TagRepository } from './tag.repo.service'

describe('Tag repository.', () => {
  let tagRepository: TagRepository
  let adminRepository: AdminRepository

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagRepository, AdminRepository],
    }).compile()

    adminRepository = module.get<AdminRepository>(AdminRepository)
    tagRepository = module.get<TagRepository>(TagRepository)

    await adminRepository.resetDatabaseExceptUser()
  })

  // afterAll(async () => {
  //   await adminRepository.closeDriver()
  // })

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
    await tagRepository.add([childTag, parentTag])

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
