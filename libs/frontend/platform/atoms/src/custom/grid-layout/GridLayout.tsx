import { DATA_ELEMENT_ID } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { ObjectTyped } from 'object-typed'
import React, { useMemo } from 'react'
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

    // Make the RGL layouts and disable the dnd in preview mode
    const makeLayouts = () => {
      const layouts = restProps.layouts || {}

      if (restProps.static) {
        ObjectTyped.keys(layouts).forEach((key) => {
          layouts[key]?.forEach((ele) => {
            ele.static = restProps.static
          })
        })
      }

      return layouts
    }

    // Make the RGL breakpoints
    const makeBreakpoints = () => {
      const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }

      if (restProps.breakpoints) {
        ObjectTyped.keys(breakpoints).forEach((key) => {
          if (restProps.breakpoints && restProps.breakpoints[key]) {
            breakpoints[key] = restProps.breakpoints[key]!
          }
        })
      }

      return breakpoints
    }

    // Make the RGL cols
    const makeCols = () => {
      const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }

      if (restProps.cols) {
        ObjectTyped.keys(cols).forEach((key) => {
          if (restProps.cols && restProps.cols[key]) {
            cols[key] = restProps.cols[key]!
          }
        })
      }

      return cols
    }

    const onLayoutChange = (_layout: Array<Layout>, allLayouts: Layouts) => {
      if (restProps.static) {
        return
      }

      const newProps = {
        ...restProps,
        layouts: allLayouts,
      }

      const element = elementService.element(elementId)

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
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
        breakpoints={makeBreakpoints()}
        cols={makeCols()}
        containerPadding={[0, 0]}
        layouts={makeLayouts()}
        margin={[0, 0]}
        measureBeforeMount
        onLayoutChange={onLayoutChange}
        rowHeight={restProps.rowHeight || 30}
      >
        {rglChildren}
      </ResponsiveReactGridLayout>
    )
  },
)

GridLayout.displayName = 'GridLayout'
