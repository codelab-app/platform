import { IAntdCategoryTag } from '@codelab/backend/abstract/core'
import { antdTagTree } from '@codelab/backend/data/seed'
import { IAtomType } from '@codelab/shared/abstract/core'
import { antdAtoms } from '@codelab/shared/config'
import { ObjectTyped } from 'object-typed'
import { SeedTagsService } from './seed-tags.service'

describe('Tag Parser', () => {
  const antdTagTreeData = SeedTagsService.createTagTreeData(antdTagTree)
  const antdTags = [...antdAtoms, ...ObjectTyped.values(IAntdCategoryTag)]

  it('can generate tag tree data', () => {
    // Pick the most nested and assert
    const generalTagNode = antdTagTreeData.find(
      (node) => node.name === IAntdCategoryTag.General,
    )

    // Assert root node
    expect(generalTagNode?.parent).toBeNull()
    expect(generalTagNode?.name).toBe(IAntdCategoryTag.General)
    expect(generalTagNode?.children).toHaveLength(3)

    // Assert leaf node
    const typographyNode = generalTagNode?.children[2]

    expect(typographyNode?.children).toHaveLength(3)
    expect(typographyNode?.children[0]?.name).toBe(
      IAtomType.AntDesignTypographyText,
    )
    expect(typographyNode?.children[1]?.name).toBe(
      IAtomType.AntDesignTypographyTitle,
    )
    expect(typographyNode?.children[2]?.name).toBe(
      IAtomType.AntDesignTypographyParagraph,
    )
  })

  it('can flatten tag tree data', () => {
    const tags = antdTagTreeData
      .flatMap((node) => SeedTagsService.flattenTagTree(node))
      .map((tag) => tag.name)

    // Assert that all names have been processed as a flat list
    expect(new Set(tags.sort())).toEqual(new Set(antdTags.sort()))
  })
})
