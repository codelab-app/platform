// Current JSON-Schema for Styles is too general and produce formData in inconvenient format (probably it's temporary)
// convertStyles convert styles to React compatible format
export const convertStyles = (graph: any | undefined): any => {
  return graph
    ? {
        ...graph,
        vertices: [...graph.vertices].map((vertex) => {
          return {
            ...vertex,
            styles: vertex.styles
              ? [...vertex?.styles].map((style) => {
                  return {
                    ...style,
                    props: Object.keys(style.props).reduce((acc, styleKey) => {
                      return {
                        ...acc,
                        [styleKey]: style.props[styleKey][0].string,
                      }
                    }, {}),
                  }
                })
              : [],
          }
        }),
      }
    : graph
}
