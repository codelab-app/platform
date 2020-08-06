import { render } from '@testing-library/react'
import React from 'react'
import { TreeDom } from '../renderer/TreeDom'
import { ReactNodeI } from '../../../graph/src/node/codec/Node-react'

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
  //   const Component = TreeDom.render(data)
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
   * <A>
   *   <B>
   *     <C/>
   *   </B>
   * </A>
   *
   * This should put C in all valid children of B, which then puts that in all valid children of A
   */
  it('renders nested children', () => {
    const dataA: ReactNodeI = {
      type: 'Html.div',
      nodeType: 'React',
      props: {
        'data-testid': 'a',
      },
      children: [
        {
          type: 'Html.div',
          nodeType: 'React',
          props: {
            'data-testid': 'a0',
          },
          children: [
            {
              type: 'Html.div',
              nodeType: 'React',
              props: {
                'data-testid': 'a0-0',
              },
            },
          ],
        },
        {
          type: 'Html.div',
          nodeType: 'React',
          props: {
            'data-testid': 'a1',
          },
        },
        {
          type: 'Html.div',
          nodeType: 'React',
          props: {
            'data-testid': 'a2',
          },
        },
      ],
    }
    const dataB: ReactNodeI = {
      type: 'Html.div',
      nodeType: 'React',
      props: {
        'data-testid': 'b',
      },
      children: [
        {
          type: 'Html.div',
          nodeType: 'React',
          props: {
            'data-testid': 'b0',
          },
        },
        {
          type: 'Html.div',
          nodeType: 'React',
          props: {
            'data-testid': 'b1',
          },
        },
      ],
    }
    const dataC: ReactNodeI = {
      type: 'Html.div',
      nodeType: 'React',
      props: {
        'data-testid': 'c',
      },
    }

    const A = TreeDom.render(dataA)
    const B = TreeDom.render(dataB)
    const C = TreeDom.render(dataC)

    const component = render(
      <A>
        <B>
          <C />
        </B>
      </A>,
    )

    const a = component.getByTestId(dataA.props['data-testid'])
    const b = component.getAllByTestId(dataB.props['data-testid'])
    const c = component.getAllByTestId(dataC.props['data-testid'])

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
