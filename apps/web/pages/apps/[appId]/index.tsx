import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import {
  ItemCallback,
  Layout,
  Responsive,
  WidthProvider,
} from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)

const AppPage = () => {
  const router = useRouter()

  // console.log(layout.state.value.drawer)

  const responsiveLayouts = {
    lg: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
      { i: 'b', x: 1, y: 0, w: 3, h: 2 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 },
      // { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
      // { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      // { i: 'c', x: 4, y: 0, w: 1, h: 2 },
    ],
  }

  const onDrop = (layouts: Array<Layout>, item: any, e: Event) => {
    const { i: id, ...props } = item

    console.log(item)

    return null
  }

  const onDragStop: ItemCallback = (...args) => null

  const onDragStart: ItemCallback = (...args) => null

  const onResizeStart: ItemCallback = (...args) => null

  const onResizeStop: ItemCallback = (...args) => null

  // const onDrag: ItemCallback = (args) => {
  //   console.log(args)
  //   grid.send({ type: 'DRAG_START', data: args })
  // }

  return (
    <>
      <ResponsiveGridLayout
        onDragStart={onDragStart}
        // onDrag={onDrag}
        onDrop={onDrop}
        onDragStop={onDragStop}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        className="layout"
        layouts={responsiveLayouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        <div key="a">A</div>
        <div key="b">B</div>
        <div key="c">C</div>
      </ResponsiveGridLayout>
      <Button type="primary" icon={<PlusOutlined />}>
        Grid
      </Button>
      {/* <AddGridDrawer /> */}
    </>
  )
}

// export default R.pipe(withApollo, AppPage)
export default () => null
