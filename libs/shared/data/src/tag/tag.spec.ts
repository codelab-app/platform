import { createTagSeedData } from './tag-input.factory'

describe('Tag Seed Data', () => {
  it('can create tag seed data', () => {
    const tagData = createTagSeedData()

    console.log(tagData)

    expect(true).toBeFalsy()
  })
})
