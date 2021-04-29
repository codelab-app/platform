import { convertStyles } from './convertStyles'

describe('convertStyles', () => {
  const layoutGraph = {
    __typename: 'Graph',
    id: '524d2934-3fb1-42fa-9afa-233ff174f5b1',
    type: 'Layout',
    label: 'Layout',
    vertices: [
      {
        __typename: 'Vertex',
        id: 'af59797a-5556-45fa-b544-a693524fdf8c',
        type: 'React_Page_Container',
        props: {},
        parent: null,
        graph: {
          __typename: 'Graph',

          id: '524d2934-3fb1-42fa-9afa-233ff174f5b1',
        },
        styles: [],
      },
      {
        __typename: 'Vertex',
        id: 'b3ebad8e-b8ea-4d93-8510-aacca4a8b0ff',
        type: 'React_Grid_Row',
        props: {
          key: 'b3ebad8e-b8ea-4d93-8510-aacca4a8b0ff',
        },
        parent: {
          __typename: 'Vertex',
          id: 'af59797a-5556-45fa-b544-a693524fdf8c',
          type: 'React_Page_Container',
        },
        graph: {
          __typename: 'Graph',
          id: '524d2934-3fb1-42fa-9afa-233ff174f5b1',
        },
        styles: [
          {
            __typename: 'Style',
            id: 'c3c42620-69cf-4046-a374-91e4e99daf8d',
            props: {
              borderColor: [{ string: 'green' }],
              borderWidth: [{ string: '10px' }],
            },
            name: 'Border10px1',
          },
        ],
      },
    ],
    edges: [
      {
        __typename: 'Edge',
        id: '50e06423-1c65-499b-a373-69f9cd528d80',
        type: null,
        props: {
          style: {
            border: '1px dashed #28a0ff',
            height: '40px',
            background: '#cbe7fd',
          },
        },
        source: 'af59797a-5556-45fa-b544-a693524fdf8c',
        target: 'b3ebad8e-b8ea-4d93-8510-aacca4a8b0ff',
      },
    ],
  }

  const convertedLayoutGraph = {
    __typename: 'Graph',
    id: '524d2934-3fb1-42fa-9afa-233ff174f5b1',
    type: 'Layout',
    label: 'Layout',
    vertices: [
      {
        __typename: 'Vertex',
        id: 'af59797a-5556-45fa-b544-a693524fdf8c',
        type: 'React_Page_Container',
        props: {},
        parent: null,
        graph: {
          __typename: 'Graph',
          id: '524d2934-3fb1-42fa-9afa-233ff174f5b1',
        },
        styles: [],
      },
      {
        __typename: 'Vertex',
        id: 'b3ebad8e-b8ea-4d93-8510-aacca4a8b0ff',
        type: 'React_Grid_Row',
        props: {
          key: 'b3ebad8e-b8ea-4d93-8510-aacca4a8b0ff',
        },
        parent: {
          __typename: 'Vertex',
          id: 'af59797a-5556-45fa-b544-a693524fdf8c',
          type: 'React_Page_Container',
        },
        graph: {
          __typename: 'Graph',
          id: '524d2934-3fb1-42fa-9afa-233ff174f5b1',
        },
        styles: [
          {
            __typename: 'Style',
            id: 'c3c42620-69cf-4046-a374-91e4e99daf8d',
            props: {
              borderColor: 'green',
              borderWidth: '10px',
            },
            name: 'Border10px1',
          },
        ],
      },
    ],
    edges: [
      {
        __typename: 'Edge',
        id: '50e06423-1c65-499b-a373-69f9cd528d80',
        type: null,
        props: {
          style: {
            border: '1px dashed #28a0ff',
            height: '40px',
            background: '#cbe7fd',
          },
        },
        source: 'af59797a-5556-45fa-b544-a693524fdf8c',
        target: 'b3ebad8e-b8ea-4d93-8510-aacca4a8b0ff',
      },
    ],
  }

  it('should convert styles', () => {
    expect(convertStyles(layoutGraph)).toEqual(convertedLayoutGraph)
  })
})
