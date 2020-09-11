import { chain } from '@angular-devkit/schematics'
import { updatePackagesInPackageJson } from '@nrwl/workspace'
import * as path from 'path'

interface ProjectDefinition {
  root: string
  sourceRoot: string
  projectType: 'library' | 'application'

  schematic?: Record<string, any>
  architect: Record<
    string,
    import('@angular-devkit/core').workspaces.TargetDefinition
  >
}

// function update(): Rule {
//   return updateWorkspaceInTree((config, context, tree) => {
//     Object.entries<ProjectDefinition>(config.projects).forEach(
//       ([projectName, projectConfig]) => {
//         console.log(projectName)
//         // tree.overwrite(paths.tsConfigLib, serializeJson(tsConfig.lib));
//         // updateLintTarget(tree, context, { projectName, projectConfig })
//       },
//     )

//     return config
//   })
// }

export default function () {
  return chain([
    // update,
    updatePackagesInPackageJson(
      path.join(__dirname, '../../../', 'migrations.json'),
      '0.0.2',
    ),
  ])
}
