import type { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { Breadcrumb, Tooltip } from 'antd'
import { type ReactNode } from 'react'

import { BreadcrumbItemWrapper } from './BreadcrumbItemWrapper'

export interface HeaderBreadcrumbItem {
  title: ReactNode
  onClick?(): void
}

interface CuiHeaderBreadcrumbProps {
  items: Array<HeaderBreadcrumbItem>
}

const separator = '>'

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

const filterBreadcrumbItems = (allItems: Array<HeaderBreadcrumbItem>) => {
  if (allItems.length > 4) {
    const firstItems = allItems.slice(0, 2)
    const lastItems = allItems.slice(-2)

    return [...firstItems, { title: '...' }, ...lastItems]
  }

  return allItems
}

const createFullPath = (allItems: Array<HeaderBreadcrumbItem>) => {
  return allItems.map((item) => item.title).join(` ${separator} `)
}

export const CuiHeaderBreadcrumb = ({ items }: CuiHeaderBreadcrumbProps) => {
  const breadcrumbItems = filterBreadcrumbItems(items)
  const isBreadcrumbTruncated = breadcrumbItems.length < items.length

  return (
    <Tooltip
      open={isBreadcrumbTruncated ? undefined : false}
      placement="bottom"
      title={createFullPath(items)}
    >
      <div className="flex h-full w-max items-center px-2">
        <Breadcrumb
          items={filterBreadcrumbItems(items)
            .filter((item) => item.title)
            .map(transformBreadcrumbItems)}
          separator={<BreadcrumbItemWrapper>{separator}</BreadcrumbItemWrapper>}
        />
      </div>
    </Tooltip>
  )
}
