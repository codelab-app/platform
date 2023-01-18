import { DATA_ELEMENT_ID } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import React, { useEffect, useMemo, useRef } from 'react'
import type { Layout, Layouts, ResponsiveProps } from 'react-grid-layout'
import { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

export interface RenderedComponentProps {
  [DATA_ELEMENT_ID]: string
  ['static']: boolean
}

export const GridLayout = React.memo(
  ({ children, ...restProps }: ResponsiveProps & RenderedComponentProps) => {
    const elementId = restProps[DATA_ELEMENT_ID]
    const isComponentMountedFirstTime = useRef(false)
    useEffect(() => {
      isComponentMountedFirstTime.current = true
    }, [])

    const { elementService } = useStore()

    const rglChildren = useMemo(() => {
      return React.Children.map(children, (child) => {
        // if not react element, then it's an primative value, and we don't have anything identify it
        // TODO: handle primative situation if neccessary
        if (!child || !React.isValidElement(child)) {
          return null
        }

        return <div key={child.key}>{child}</div>
      })
    }, [children])

    const layouts = restProps.layouts || {}
    const previewLayouts = restProps.layouts || {}

    if (restProps.static) {
      const keys = Object.keys(layouts)
      keys.forEach((key) => {
        layouts[key] = layouts[key]?.map((ele) => ({
          ...ele,
          static: restProps.static,
        })) as Array<Layout>
      })
    }

    const onLayoutChange = (_layout: Array<Layout>, allLayouts: Layouts) => {
      // callback is called on initial render. We want to handle onChange after it's changed by user's reaction
      if (!isComponentMountedFirstTime.current || restProps.static) {
        return
      }

      const newProps = {
        ...restProps,
        layouts: allLayouts,
      }

      const element = elementService.element(elementId)

      if (!element) {
        throw new Error(`Element id ${elementId} not found`)
      }

      elementService
        .patchElement(element, {
          props: {
            update: {
              node: {
                data: JSON.stringify(newProps),
              },
            },
          },
        })
        .catch(() => undefined)
    }

    return (
      <ResponsiveReactGridLayout
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        containerPadding={[0, 0]}
        layouts={restProps.static ? previewLayouts : layouts}
        margin={[0, 0]}
        onLayoutChange={onLayoutChange}
        rowHeight={30}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
      >
        {rglChildren}
      </ResponsiveReactGridLayout>
    )
  },
)

GridLayout.displayName = 'GridLayout'
