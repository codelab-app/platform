import { render } from '@testing-library/react'
import React from 'react'
import { Renderer } from '@codelab/alpha/core/renderer'
import { NodeI, NodeType } from '@codelab/alpha/shared/interface/node'

describe('RootChildren', () => {
  // const data = {
  //   type: 'Provider',
  //   children: [
  //     {
  //       type: 'Button',
  //       children: [
  //         {
  //           type: 'Text',
  //           props: {
  //             value: 'Toggle Modal',
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       type: 'Html.div',
  //       props: {
  //         'data-testid': 'div',
  //       },
  //     },
  //     {
  //       type: 'Modal',
  //       props: {
  //         title: 'Basic Modal',
  //         visible: true,
  //       },
  //     },
  //   ],
  // }

  // it('renders children to all available branches', () => {
  //   const Component = Renderer.render(data)
  //   const modal = getByRole(document.body, 'dialog')
  //   const div = getByTestId(document.body, 'div')

  //   const matcher: Matcher = (value, html) => {
  //     return value === 'Title' && html.nodeName === 'H1'
  //   }

  //   const modalTitle = getByText(modal, matcher)
  //   const divTitle = getByText(div, matcher)

  //   expect(modalTitle).toBeTruthy()
  //   expect(divTitle).toBeTruthy()
  // })

  /**
   * Single level wasn't working before, because rootChildren was only called in children reduce
   */
  it('renders root children', () => {
    const dataA: NodeI = {
      type: NodeType.React_Html_Div,
      props: {
        'data-testid': 'a',
      },
    }
    const dataB: NodeI = {
      type: NodeType.React_Html_Div,
      props: {
        'data-testid': 'b',
      },
    }

    const A = Renderer.components(dataA)
    const B = Renderer.components(dataB)

    const component = render(
      <A>
        <B />
      </A>,
    )

    const a = component.getByTestId(dataA?.props?.['data-testid'] as string)
    const b = component.getByTestId(dataB?.props?.['data-testid'] as string)

    expect(a.children[0]).toBe(b)
  })

  /**
   * <A>
   *   <B>
   *     <C/>
   *   </B>
   * </A>
   *
   * This should put C in all valid children of B, which then puts that in all valid children of A
   */
  it('renders nested children', () => {
    const dataA: NodeI = {
      type: NodeType.React_Html_Div,
      props: {
        'data-testid': 'a',
      },
      children: [
        {
          type: NodeType.React_Html_Div,
          props: {
            'data-testid': 'a0',
          },
          children: [
            {
              type: NodeType.React_Html_Div,
              props: {
                'data-testid': 'a0-0',
              },
            },
          ],
        },
        {
          type: NodeType.React_Html_Div,
          props: {
            'data-testid': 'a1',
          },
        },
        {
          type: NodeType.React_Html_Div,
          props: {
            'data-testid': 'a2',
          },
        },
      ],
    }
    const dataB: NodeI = {
      type: NodeType.React_Html_Div,
      props: {
        'data-testid': 'b',
      },
      children: [
        {
          type: NodeType.React_Html_Div,
          props: {
            'data-testid': 'b0',
          },
        },
        {
          type: NodeType.React_Html_Div,
          props: {
            'data-testid': 'b1',
          },
        },
      ],
    }
    const dataC: NodeI = {
      type: NodeType.React_Html_Div,
      props: {
        'data-testid': 'c',
      },
    }

    const A = Renderer.components(dataA)
    const B = Renderer.components(dataB)
    const C = Renderer.components(dataC)

    const component = render(
      <A>
        <B>
          <C />
        </B>
      </A>,
    )

    const a = component.getByTestId(dataA?.props?.['data-testid'] as string)
    const b = component.getAllByTestId(dataB?.props?.['data-testid'] as string)
    const c = component.getAllByTestId(dataC?.props?.['data-testid'] as string)

    expect(a.children[0].children[0].children[0]).toBe(b[0])
    expect(a.children[1].children[0]).toBe(b[1])
    expect(a.children[2].children[0]).toBe(b[2])

    expect(b[0].children[0].children[0]).toBe(c[0])
    expect(b[0].children[1].children[0]).toBe(c[1])

    expect(b[1].children[0].children[0]).toBe(c[2])
    expect(b[1].children[1].children[0]).toBe(c[3])

    expect(b[2].children[0].children[0]).toBe(c[4])
    expect(b[2].children[1].children[0]).toBe(c[5])
  })
})
