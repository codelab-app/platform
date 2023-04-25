import { AntdTag, HtmlTag, ReactTag } from '@codelab/backend/abstract/core'
import { allTagTree, antdTagTree } from '@codelab/backend/infra/data/seed'
import { SeedTagsService } from './seed-tags.service'

describe('Tag Parser', () => {
  const antdTagTreeData = SeedTagsService.createTagTreeData(antdTagTree)
  const antdTags = [...Object.values(AntdTag)]

  it('can generate tag tree data', () => {
    // Pick the most nested and assert
    const generalTagNode = antdTagTreeData.find(
      (node) => node.name === AntdTag.General,
    )

    // Assert root node
    expect(generalTagNode?.parent).toBeNull()
    expect(generalTagNode?.name).toBe(AntdTag.General)
    expect(generalTagNode?.children).toHaveLength(3)

    // Assert leaf node
    const typographyNode = generalTagNode?.children[2]

    expect(typographyNode?.children).toHaveLength(3)
    expect(typographyNode?.children[0]?.name).toBe(AntdTag.TypographyText)
    expect(typographyNode?.children[1]?.name).toBe(AntdTag.TypographyTitle)
    expect(typographyNode?.children[2]?.name).toBe(AntdTag.TypographyParagraph)
  })

  it('can flatten tag tree data', () => {
    const tags = antdTagTreeData
      .flatMap((node) => SeedTagsService.flattenTagTree(node))
      .map((tag) => tag.name)

    // Assert that all names have been processed as a flat list
    expect(new Set(tags.sort())).toEqual(new Set(antdTags.sort()))
  })
})
