import type { Tree } from '@nx/devkit'
import { getProjects } from '@nx/devkit'
import { codegen } from './codegen'
import type { CodegenGeneratorSchema } from './schema'

export const codegenGenerator = async (
  tree: Tree,
  options: CodegenGeneratorSchema,
) => {
  const projects = getProjects(tree)
  const projectNames = projects.keys()

  for await (const projectName of projectNames) {
    await codegen(tree, projectName)
  }
}

export default codegenGenerator
