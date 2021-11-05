import {
  invalidatesAll,
  invalidatesById,
  providesAll,
  providesById,
} from './cacheHelpers'
import { WILDCARD_ID } from './cacheTags'

const TestCacheTag = 'test-cache-tag'

const TestItemList = [
  { id: 1, name: 'test 01' },
  { id: 2, name: 'test 02' },
  { id: 3, name: 'test 03' },
]

describe('cacheHelpers', () => {
  describe('providesAll', () => {
    it('should return array of items with correct type', () => {
      const cachedList = providesAll(TestItemList, TestCacheTag)
      const allHasCorrectType = cachedList.every((e) => e.type === TestCacheTag)

      expect(allHasCorrectType).toBe(true)
    })

    it('should return array of items with correct ids', () => {
      const cachedList = providesAll(TestItemList, TestCacheTag)

      const allHasCorrectId = TestItemList.every((e) =>
        cachedList.find((c) => c.id === e.id),
      )

      expect(allHasCorrectId).toBe(true)
    })

    it(`should return array contains one item with 
          id equals wildcard id and 
        when no data is provided`, () => {
      const cachedList = providesAll(undefined, TestCacheTag)

      expect(cachedList).toContainEqual({
        type: TestCacheTag,
        id: WILDCARD_ID,
      })
    })

    it('should return array containing one item with id equals wildcard id ', () => {
      const cachedList = providesAll(TestItemList, TestCacheTag)

      expect(cachedList).toContainEqual({
        type: TestCacheTag,
        id: WILDCARD_ID,
      })
    })
  })

  describe('providesById', () => {
    it('should return array containing one item with correct id', () => {
      expect(providesById(TestItemList[0].id, TestCacheTag)).toEqual([
        {
          type: TestCacheTag,
          id: TestItemList[0].id,
        },
      ])
    })
  })

  describe('invalidatesAll', () => {
    it('should return array containing one item with id equals wildcard id', () => {
      expect(invalidatesAll(TestCacheTag)).toEqual([
        {
          type: TestCacheTag,
          id: WILDCARD_ID,
        },
      ])
    })
  })

  describe('invalidatesById', () => {
    it('should return array containing one item with correct id', () => {
      expect(invalidatesById(TestItemList[0].id, TestCacheTag)).toEqual([
        {
          type: TestCacheTag,
          id: TestItemList[0].id,
        },
      ])
    })

    it(`should return array containing one item with 
        id equals wildcard id 
        when no id is provided`, () => {
      expect(invalidatesAll(TestCacheTag)).toEqual([
        {
          type: TestCacheTag,
          id: WILDCARD_ID,
        },
      ])
    })
  })
})
