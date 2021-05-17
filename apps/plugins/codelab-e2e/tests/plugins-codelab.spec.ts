import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing'
describe('plugins-codelab e2e', () => {
  it('should create plugins-codelab', async (done) => {
    const plugin = uniq('plugins-codelab')
    ensureNxProject('@codelab/codelab', 'dist/libs/plugins/codelab')
    await runNxCommandAsync(
      `generate @codelab/codelab:plugins-codelab ${plugin}`,
    )

    const result = await runNxCommandAsync(`build ${plugin}`)
    expect(result.stdout).toContain('Executor ran')

    done()
  })

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('plugins-codelab')
      ensureNxProject('@codelab/codelab', 'dist/libs/plugins/codelab')
      await runNxCommandAsync(
        `generate @codelab/codelab:plugins-codelab ${plugin} --directory subdir`,
      )
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`),
      ).not.toThrow()
      done()
    })
  })

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('plugins-codelab')
      ensureNxProject('@codelab/codelab', 'dist/libs/plugins/codelab')
      await runNxCommandAsync(
        `generate @codelab/codelab:plugins-codelab ${plugin} --tags e2etag,e2ePackage`,
      )
      const nxJson = readJson('nx.json')
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage'])
      done()
    })
  })
})
