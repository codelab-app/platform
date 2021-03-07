import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing'

describe('tools-plugins-test e2e', () => {
  it('should create tools-plugins-test', async (done) => {
    const plugin = uniq('tools-plugins-test')

    ensureNxProject('@codelab/test', 'dist/libs/tools/plugins/test')
    await runNxCommandAsync(
      `generate @codelab/test:tools-plugins-test ${plugin}`,
    )

    const result = await runNxCommandAsync(`build ${plugin}`)

    expect(result.stdout).toContain('Executor ran')

    done()
  })

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('tools-plugins-test')

      ensureNxProject('@codelab/test', 'dist/libs/tools/plugins/test')
      await runNxCommandAsync(
        `generate @codelab/test:tools-plugins-test ${plugin} --directory subdir`,
      )
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`),
      ).not.toThrow()
      done()
    })
  })

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('tools-plugins-test')

      ensureNxProject('@codelab/test', 'dist/libs/tools/plugins/test')
      await runNxCommandAsync(
        `generate @codelab/test:tools-plugins-test ${plugin} --tags e2etag,e2ePackage`,
      )
      const nxJson = readJson('nx.json')

      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage'])
      done()
    })
  })
})
