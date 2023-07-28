import type { ModelMap } from '@codelab/backend/abstract/codegen'
import { generate, OGM } from '@neo4j/graphql-ogm'
import type { OnModuleInit } from '@nestjs/common'
import { Inject, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import type { Transaction } from 'neo4j-driver'
import { Driver } from 'neo4j-driver'
import * as path from 'path'
import * as prettier from 'prettier'
import { OGM_PROVIDER } from './ogm.constant'

@Injectable()
export class OGMService implements OnModuleInit {
  private models: Partial<ModelMap> = {}

  constructor(@Inject(OGM_PROVIDER) private ogm: OGM<ModelMap>) {}

  onModuleInit() {
    console.log('onModuleInit OGMService')
    this.initModels()
  }

  private initModels() {
    const modelNames: Array<keyof ModelMap> = [
      'User',
      'App',
      'Domain',
      'Page',
      'Store',
      'ApiAction',
      'CodeAction',
      'Resource',
      'Atom',
      'Element',
      'Prop',
      'Component',
      'Tag',
      'Field',
      'InterfaceType',
      'PrimitiveType',
      'UnionType',
      'ArrayType',
      'EnumType',
      'EnumTypeValue',
      'LambdaType',
      'AppType',
      'ActionType',
      'RenderPropType',
      'ReactNodeType',
      'PageType',
      'CodeMirrorType',
      'ElementType',
    ]

    for (const name of modelNames) {
      const model = this.ogm.model(name) as ModelMap[typeof name]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.models[name] = model as any
      console.log(name, this.models[name])
    }
  }

  getModel<ModelKey extends keyof ModelMap>(
    name: ModelKey,
  ): ModelMap[ModelKey] {
    const model = this.models[name]

    if (!model) {
      throw new Error(`Model ${name} has not been initialized.`)
    }

    return model
  }

  async generate() {
    const outFile = path.resolve(
      process.cwd(),
      'libs/backend/abstract/codegen',
      'src/ogm-types.gen.ts',
    )

    const output = await generate({
      noWrite: true,
      ogm: this.ogm,
      outFile,
    })
      .then((data) => {
        console.info('OGM type generated!')

        return data
      })
      .catch((error) =>
        console.error(`[generateOgmTypes] ${JSON.stringify(error, null, 2)}`),
      )

    // Get prettier config
    const options = await prettier.resolveConfig(outFile)

    // Format
    const formatted = prettier.format(`${output}`, {
      ...options,
      filepath: outFile,
    })

    /**
     * Save to abstract folder as well for exporting just the interfaces
     */
    fs.writeFileSync(outFile, formatted)
  }
}
