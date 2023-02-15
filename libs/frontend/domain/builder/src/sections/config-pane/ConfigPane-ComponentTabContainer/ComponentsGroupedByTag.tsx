import type {
  IBuilderComponent,
  IBuilderService,
} from '@codelab/frontend/abstract/core'
import { Typography } from 'antd'
import Input from 'antd/lib/input'
import debounce from 'lodash/debounce'
import React, { useEffect, useRef, useState } from 'react'
import tw from 'twin.macro'
import { GetComponentsList } from './GetComponentsList'

const { Search } = Input

export const ComponentsGroupedByTag = ({
  componentsGroupedByCategory,
}: Pick<IBuilderService, 'componentsGroupedByCategory'>) => {
  const tags = Object.keys(componentsGroupedByCategory)

  const [filteredItems, setFilteredItems] = useState<
    Record<string, Array<IBuilderComponent>>
  >(componentsGroupedByCategory)

  const [searchValue, setSearchValue] = useState('')

  const debouncedSearch = useRef(
    debounce((nextValue: string) => setSearchValue(nextValue), 200),
  ).current

  useEffect(() => {
    tags.forEach((tag) => {
      const components = componentsGroupedByCategory[tag]?.filter((component) =>
        component.name.toLowerCase().includes(searchValue.toLocaleLowerCase()),
      )

      if (components) {
        setFilteredItems((prev) => ({
          ...prev,
          [tag]: components,
        }))
      }
    })
  }, [searchValue])

  return (
    <>
      <Search
        allowClear
        key={1}
        onChange={(event) => debouncedSearch(event.target.value)}
        placeholder="Search component"
      />
      <div css={tw`flex flex-wrap justify-between mt-6`}>
        {tags.map((tag) =>
          filteredItems[tag]?.length ? (
            <React.Fragment key={tag}>
              <div css={tw`[flex: 48% 1] [max-width: 48%]`}>
                <Typography.Title ellipsis level={4}>
                  {tag}
                </Typography.Title>
                <GetComponentsList components={filteredItems[tag] ?? []} />
              </div>
            </React.Fragment>
          ) : null,
        )}
      </div>
    </>
  )
}
