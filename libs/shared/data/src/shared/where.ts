export const whereNodeId = (id: string) => whereNode('id', id)

export const whereNode = (key: string, value: string) => ({
  where: {
    node: {
      [key]: value,
    },
  },
})
