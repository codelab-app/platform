import { AntdTag } from './antd-tags.data'
import { createTagTreeData, flattenTagTree } from './tag-input.factory'

describe('Tag Parser', () => {
  it('can generate tag tree data', () => {
    const data = createTagTreeData()
    // Pick the most nested and assert
    const generalTagNode = data.find((node) => node.name === AntdTag.General)

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
    const tags = createTagTreeData().flatMap((node) => flattenTagTree(node))
    const tagsNameList = tags.map((tag) => tag.name)

    // Assert that all names have been processed as a flat list
    expect(new Set(tagsNameList)).toEqual(new Set(Object.values(AntdTag)))
  })
})
