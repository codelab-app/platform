import { Breadcrumb } from 'antd'
import type { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb'
import React from 'react'
import tw from 'twin.macro'
import { BreadcrumbItemWrapper } from './BreadcrumbItemWrapper'

interface HeaderBreadcrumbItem {
  title: string
  onClick?(): void
}

interface HeaderBreadcrumbProps {
  items: Array<HeaderBreadcrumbItem>
}

const transformBreadcrumbItems = (
  item: HeaderBreadcrumbItem,
): BreadcrumbItemType => {
  return {
    title: (
      <BreadcrumbItemWrapper onClick={item.onClick}>
        {item.title}
      </BreadcrumbItemWrapper>
    ),
  }
}

const filterBreadcrumbItems = (array: Array<HeaderBreadcrumbItem>) => {
  if (array.length > 4) {
    const firstItems = array.slice(0, 2)
    const lastItems = array.slice(-2)

    return [...firstItems, { title: '...' }, ...lastItems]
  }

  return array
}

export const HeaderBreadcrumb = ({ items }: HeaderBreadcrumbProps) => {
  return (
    <div css={tw`h-full px-2 flex items-center`}>
      <Breadcrumb
        items={filterBreadcrumbItems(items).map(transformBreadcrumbItems)}
        separator={<BreadcrumbItemWrapper>{'>'}</BreadcrumbItemWrapper>}
      />
    </div>
  )
}
