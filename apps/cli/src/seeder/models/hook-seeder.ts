import { AntdDesignApi } from '@codelab/backend/infra'
import { CreateTagService } from '@codelab/backend/modules/tag'
import { CreateTypeService } from '@codelab/backend/modules/type'
import { TypeKind, User } from '@codelab/shared/abstract/core'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import hookData from '../data/hooks'
import { TypeSeeder } from './type-seeder'

@Injectable()
export class HookSeeder {
  constructor(
    private readonly createTypeService: CreateTypeService,
    private readonly createTagService: CreateTagService,
    private readonly typeSeeder: TypeSeeder,
  ) {}

  public seedHooks(currentUser: User) {
    const processedHookFilePromises = hookData.map((hook) => {
      const hookName = `Hook ${hook.name}`

      const asyncFn = async () => {
        const { id: interfaceId } = await this.createTypeService.execute({
          currentUser,
          input: { name: `${hookName} API`, typeKind: TypeKind.InterfaceType },
        })

        const hookInterfaceFields = hook.interfaceFields as Array<AntdDesignApi>

        if (!hookInterfaceFields) {
          throw new Error(`Hook ${hookName} is missing interfaceFields data`)
        }

        const processHookFieldPromises: Array<Promise<any>> = []
        hookInterfaceFields.forEach((field) => {
          const type = this.typeSeeder.getTypeForApi(field, `Hook ${hookName}`)

          if (type) {
            const processHookFieldPromise =
              this.typeSeeder.createFieldIfMissing({
                input: {
                  key: field.property,
                  name: pascalCaseToWords(field.property),
                  interfaceId,
                  description: field.description,
                  type,
                },
                currentUser,
              })

            processHookFieldPromises.push(processHookFieldPromise)
          }
        })
      }

      return asyncFn()
    })

    return Promise.all(processedHookFilePromises)
  }
}
