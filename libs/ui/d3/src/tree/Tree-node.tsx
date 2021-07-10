export const updateNode = (selection: any) => {
  selection
    .append('circle')
    .attr('cx', (d: any) => d.x)
    .attr('cy', (d: any) => d.y)
    .attr('r', 4)

  selection
    .append('text')
    .attr('dx', (d: any) => {
      return d.x
    })
    .attr('dy', (d: any) => {
      return d.y + 15
    })
    .text((d: any) => {
      return d.data.label
    })
}
