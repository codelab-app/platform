describe('Node repository', () => {
  it('is true', () => {
    expect(true).toBeTruthy()
  })
  // const repo = new NodeRepository()
  //
  // it('can save a node given a create dto', () => {
  //   const spy = jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: [] })
  //
  //   const data: NodeCreate = {
  //     type: 'React.Button',
  //   }
  //   const results = repo.save<NodeCreate>(data)
  //
  //   expect(spy).toHaveBeenCalled()
  //   expect(results).resolves.toEqual({ data: [] })
  // })
  //
  // it('can get a node dto by ID', () => {
  //   const spy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [] })
  //
  //   const id = 'my-node'
  //   const results = repo.get(id)
  //
  //   expect(spy).toHaveBeenCalled()
  //   expect(results).resolves.toEqual({ data: [] })
  // })
})
