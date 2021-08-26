import {
  ElementGraphTreeAdapter,
  IEdge,
  IVertex,
} from '@codelab/frontend/model/domain'
import { RenderProvider } from '@codelab/frontend/presenter/container'
import { Graph } from '@codelab/shared/abstract/core'
import { render, screen } from '@testing-library/react'
import preloadAll from 'jest-next-dynamic'
import dynamic from 'next/dynamic'
import React from 'react'
import { Renderer } from '../Renderer'
import { renderFactory } from '../renderFactory'
import { mapperPageElements } from './Mapper.data'

beforeAll(async () => {
  await preloadAll()
})

const DynamicMenu = dynamic(() => import('antd/lib/menu'))
const DynamicMenuItem = dynamic(() => import('antd/lib/menu/MenuItem'))

export const renderPage = async (pageElements: Graph<IVertex, IEdge>) => {
  const tree = new ElementGraphTreeAdapter(pageElements)
  //
  // return render(
  //   <RenderProvider
  //     context={{
  //       tree,
  //       renderFactory,
  //     }}
  //   >
  //     <Renderer />
  //   </RenderProvider>,
  // )

  // render(
  //   <DynamicMenu>
  //     <div>ab</div>
  //   </DynamicMenu>,
  // )

  // act(() => {
  //   render(
  //     <RenderProvider
  //       context={{
  //         tree,
  //         renderFactory,
  //       }}
  //     >
  //       <DynamicMenu />
  //     </RenderProvider>,
  //   )
  // })
}

describe('Renderer', () => {
  it('should render Mapper', async () => {
    // const data: Array<Record<string, any>> = [
    //   {
    //     ab: 'cd',
    //   },
    // ]
    //
    // // render(<Mapper component={'ab'} data={data} />)
    // screen.debug()
    // act(() => {
    //   renderPage(mapperPageElements)
    // })
    // renderPage(mapperPageElements)

    // render(<DynamicMenu />)

    const tree = new ElementGraphTreeAdapter(mapperPageElements)

    const Component = render(
      <RenderProvider
        context={{
          tree,
          renderFactory,
        }}
      >
        <Renderer />
      </RenderProvider>,
    )

    screen.debug()
  })

  // it('should render a group of links', async () => {
  //   const { container } = render(<BasicGraph />)
  //   const links = container.querySelectorAll('g.Link')
  //
  //   expect(links).toHaveLength(4)
  //
  //   const A_B = container.querySelector('g.Link.Link--A_B')
  //   const A_C = container.querySelector('g.Link.Link--A_C')
  //   const C_D = container.querySelector('g.Link.Link--C_D')
  //   const C_E = container.querySelector('g.Link.Link--C_E')
  //
  //   expect(A_B).toBeTruthy()
  //   expect(A_C).toBeTruthy()
  //   expect(C_D).toBeTruthy()
  //   expect(C_E).toBeTruthy()
  // })
  //
  // it('should render a link path', async () => {
  //   const { container } = render(<BasicGraph />)
  //   const paths = container.querySelectorAll('path.Link-path')
  //
  //   expect(paths).toHaveLength(4)
  //
  //   const A_B = container.querySelector('g.Link--A_B path.Link-path')
  //   const A_C = container.querySelector('g.Link--A_C path.Link-path')
  //   const C_D = container.querySelector('g.Link--C_D path.Link-path')
  //   const C_E = container.querySelector('g.Link--C_E path.Link-path')
  //
  //   expect(A_B).toBeTruthy()
  //   expect(A_C).toBeTruthy()
  //   expect(C_D).toBeTruthy()
  //   expect(C_E).toBeTruthy()
  // })
})
