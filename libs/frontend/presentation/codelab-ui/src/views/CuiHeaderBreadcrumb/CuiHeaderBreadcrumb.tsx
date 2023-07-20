// import { Tooltip } from '@mui/material'
import { Breadcrumb, Tooltip } from 'antd'
import type { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb'
import React from 'react'
import { BreadcrumbItemWrapper } from './BreadcrumbItemWrapper'

interface HeaderBreadcrumbItem {
  title: string
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
  return (
    <Tooltip placement="bottom" title={createFullPath(items)}>
      <div className="flex h-full items-center px-2">
        <Breadcrumb
          items={filterBreadcrumbItems(items).map(transformBreadcrumbItems)}
          separator={<BreadcrumbItemWrapper>{separator}</BreadcrumbItemWrapper>}
        />
      </div>
    </Tooltip>
  )
}
