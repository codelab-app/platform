import type { Layout, Layouts, ResponsiveProps } from 'react-grid-layout'

import { DATA_ELEMENT_ID } from '@codelab/frontend-abstract-domain'
import { usePropService } from '@codelab/frontend-application-prop/services'
import { ObjectTyped } from 'object-typed'
import { Children, isValidElement, memo, useMemo } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

export interface RenderedComponentProps {
  [DATA_ELEMENT_ID]: string
  ['static']: boolean
}

export const GridLayout = memo(
  ({ children, ...restProps }: RenderedComponentProps & ResponsiveProps) => {
    const elementId = restProps[DATA_ELEMENT_ID]
    // const elementService = useElementService()
    const propService = usePropService()

    const rglChildren = useMemo(() => {
      return Children.map(children, (child) => {
        // if not react element, then it's an primative value, and we don't have anything identify it
        // TODO: handle primative situation if neccessary
        if (!child || !isValidElement(child)) {
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
      const defaultBreakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
      const breakpoints = restProps.breakpoints

      if (!breakpoints) {
        return defaultBreakpoints
      }

      ObjectTyped.keys(defaultBreakpoints).forEach((key) => {
        const breakpoint = breakpoints[key]

        if (breakpoint) {
          defaultBreakpoints[key] = breakpoint
        }
      })

      return defaultBreakpoints
    }

    // Make the RGL cols
    const makeCols = () => {
      const defaultCols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
      const cols = restProps.cols

      if (!cols) {
        return defaultCols
      }

      ObjectTyped.keys(defaultCols).forEach((key) => {
        const col = cols[key]

        if (col) {
          defaultCols[key] = col
        }
      })

      return defaultCols
    }

    const onLayoutChange = (_layout: Array<Layout>, allLayouts: Layouts) => {
      if (restProps.static) {
        return
      }

      const newProps = {
        ...restProps,
        layouts: allLayouts,
      }

      // const element = elementService.getElement(elementId)

      // void propService.update(element.props, {
      //   data: JSON.stringify(newProps),
      //   id: element.props.id,
      // })
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
