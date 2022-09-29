export const whereNodeId = (id: string | undefined | null) =>
  whereNode('id', id)

export const whereNode = (key: string, value: string | undefined | null) => ({
  where: value
    ? {
        node: {
          [key]: value,
        },
      }
    : null,
})
