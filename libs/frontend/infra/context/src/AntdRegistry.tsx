'use client'

import type { PropsWithChildren } from 'react'

import { extractStaticStyle, StyleProvider } from 'antd-style'
import { useServerInsertedHTML } from 'next/navigation'
import { useRef } from 'react'

/**
 * https://github.com/ant-design/ant-design/discussions/44984
 */

export const AntdRegistry = ({ children }: PropsWithChildren) => {
  const isInsert = useRef(false)

  useServerInsertedHTML(() => {
    // avoid duplicate css insert
    // refs: https://github.com/vercel/next.js/discussions/49354#discussioncomment-6279917
    if (isInsert.current) {
      return
    }

    isInsert.current = true

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return extractStaticStyle().map((item: any) => item.style)
  })

  return (
    <StyleProvider cache={extractStaticStyle.cache}>{children}</StyleProvider>
  )
}
