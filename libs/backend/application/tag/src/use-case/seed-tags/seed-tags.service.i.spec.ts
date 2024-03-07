import { IAntdCategoryTag } from '@codelab/backend/abstract/core'
import { antdTagTree } from '@codelab/backend/data/seed'
import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { TagDomainModule } from '@codelab/backend/domain/tag'
import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import type { ITagDto } from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { antdAtoms } from '@codelab/shared/domain/mapper'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import { SeedTagsService } from './seed-tags.service'
import { TagTreeUtils } from './seed-tags.util'

describe('Tag Parser', () => {
  let seedTagsService: SeedTagsService
  let antdTagTreeData: Array<ITagDto>
  let getIdFromName: (atomType: IAtomType) => string | undefined

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SharedDomainModule,
        TagDomainModule,
        CqrsModule,
        CodelabLoggerModule,
      ],
      providers: [SeedTagsService],
    }).compile()

    seedTagsService = module.get<SeedTagsService>(SeedTagsService)
    antdTagTreeData = await seedTagsService.createTagsData(antdTagTree)

    getIdFromName = (atomType: IAtomType) =>
      antdTagTreeData.find((node) => node.name === atomType)?.id
  })

  const antdTags = [...antdAtoms, ...Object.values(IAntdCategoryTag)]

  it('can generate tag tree data', () => {
    // Pick the most nested and assert
    const generalTagNode = antdTagTreeData.find(
      (node) => node.name === IAntdCategoryTag.AntDesignGeneral,
    )

    // Assert root node
    expect(generalTagNode?.parent).toBeUndefined()
    expect(generalTagNode?.name).toBe(IAntdCategoryTag.AntDesignGeneral)
    expect(generalTagNode?.children).toHaveLength(3)

    // Assert leaf node
    const typographyNodeId = generalTagNode?.children?.[2]?.id

    const typographyNode = antdTagTreeData.find(
      (node) => node.id === typographyNodeId,
    )

    expect(typographyNode?.children).toHaveLength(3)
    expect(typographyNode?.children?.[0]?.id).toBe(
      getIdFromName(IAtomType.AntDesignTypographyText),
    )
    expect(typographyNode?.children?.[1]?.id).toBe(
      getIdFromName(IAtomType.AntDesignTypographyTitle),
    )
    expect(typographyNode?.children?.[2]?.id).toBe(
      getIdFromName(IAtomType.AntDesignTypographyParagraph),
    )
  })

  it('can flatten tag tree data', () => {
    const tags = TagTreeUtils.createTagTreeData(antdTagTree)
      .flatMap((node) => TagTreeUtils.flattenTagTree(node))
      .map((tag) => tag.name)

    // Assert that all names have been processed as a flat list
    expect(new Set(tags.sort())).toEqual(new Set(antdTags.sort()))
  })
})
