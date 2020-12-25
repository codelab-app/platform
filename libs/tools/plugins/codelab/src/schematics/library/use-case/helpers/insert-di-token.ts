import { Rule, Tree } from '@angular-devkit/schematics'
import { NormalizedSchema } from '../schematic'

export const insertDiToken = (options: NormalizedSchema): Rule => {
  return (host: Tree) => {
    console.log(host)
    //     const { moduleClassName, modulePath, moduleSource } = readProjectInfo(
    //       host,
    //       options.project,
    //     )

    //     insert(host, modulePath, [
    //       // ...addParameterToConstructor(moduleSource, modulePath, {
    //       //   className: moduleClassName,
    //       //   param: 'private upgrade: UpgradeModule',
    //       // }),
    //       ...addMethod(moduleSource, modulePath, {
    //         className: moduleClassName,
    //         methodHeader: 'ngDoBootstrap(): void',
    //         body: `
    // configure${names(options.name).className}(this.upgrade.injector);
    // this.upgrade.bootstrap(document.body, ['downgraded', '${options.name}']);
    //         `,
    //       }),
    //       // ...removeFromNgModule(moduleSource, modulePath, 'bootstrap'),
    //     ])

    return host
  }
}
