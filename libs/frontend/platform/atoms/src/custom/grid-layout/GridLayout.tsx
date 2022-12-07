import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import {
  DATA_ELEMENT_ID,
  RenderedComponentProps,
} from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import React, { useEffect, useMemo, useRef } from 'react'
import ReactGridLayout, {
  Layout,
  ReactGridLayoutProps,
} from 'react-grid-layout'
import { v4 } from 'uuid'

export const GridLayout = React.memo(
  ({
    children,
    ...restProps
  }: ReactGridLayoutProps & RenderedComponentProps) => {
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
    }, [])

    const layout = restProps.layout || []

    const onLayoutChange = (newLayouts: Array<Layout>) => {
      // callback is called on initial render. We want to handle onChange after it's changed by user's reaction
      if (!isComponentMountedFirstTime.current) {
        return
      }

      console.log({ newLayouts })

      const newProps = {
        ...restProps,
        layout: newLayouts,
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
      <ReactGridLayout
        cols={12}
        compactType={null}
        layout={layout}
        onLayoutChange={onLayoutChange}
        rowHeight={30}
        width={1200}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
      >
        {rglChildren}
      </ReactGridLayout>
    )
  },
)

GridLayout.displayName = 'GridLayout'
