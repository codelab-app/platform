import type {
  IAppExport,
  IComponentExport,
} from '@codelab/backend/abstract/core'
import { ActionFactory } from '@codelab/backend/domain/action'
import { AppRepository } from '@codelab/backend/domain/app'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PageRepository } from '@codelab/backend/domain/page'
import { PropRepository } from '@codelab/backend/domain/prop'
import { StoreRepository } from '@codelab/backend/domain/store'
import {
  FieldRepository,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import type { IAuth0User } from '@codelab/shared/abstract/core'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

export class ImportAppCommand {
  constructor(
    public readonly appExport: IAppExport,
    public readonly owner: IAuth0User,
  ) {}
}

@CommandHandler(ImportAppCommand)
export class ImportAppHandler implements ICommandHandler<ImportAppCommand> {
  constructor(
    private readonly fieldRepository: FieldRepository,
    private readonly storeRepository: StoreRepository,
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private readonly pageRepository: PageRepository,
    private readonly elementRepository: ElementRepository,
    private readonly appRepository: AppRepository,
    private readonly componentRepository: ComponentRepository,
    private readonly propRepository: PropRepository,
    private readonly actionFactory: ActionFactory,
  ) {}

  async execute(command: ImportAppCommand) {
    const {
      appExport: { app, pages },
      owner,
    } = command

    // TODO: Use validation pipes
    // await validate(pages)

    // const existing = await this.appRepository.findOne({ id: app.id })

    // if (existing) {
    //   console.log('Deleting app/pages before re-creating...')
    //   await App.delete({
    //     delete: {
    //       pages: [{ where: {} }],
    //     },
    //     where: {
    //       id: app.id,
    //     },
    //   })
    // }

    for (const { elements, store } of pages) {
      for (const element of elements) {
        await this.elementRepository.save(element)
      }

      await this.interfaceTypeRepository.save(store.api)

      for (const field of store.api.fields) {
        await this.fieldRepository.save(field)
      }

      await this.storeRepository.save(store)

      for (const action of store.actions) {
        await this.actionFactory.save(action)
      }
    }

    const pagesData = pages.map(({ elements, ...props }) => ({
      ...props,
      app: { id: app.id },
    }))

    await this.appRepository.add([{ ...app, owner, pages: [] }])
    await this.pageRepository.add(pagesData)

    return app
  }

  async createComponents(
    components: Array<IComponentExport>,
    owner: IAuth0User,
  ) {
    for (const { component } of components) {
      const exists = await this.componentRepository.find({
        where: { id: component.id },
      })

      if (exists.length > 0) {
        return
      } else {
        await this.interfaceTypeRepository.add([
          { ...component.store.api, fields: [], owner },
          { ...component.api, fields: [], owner },
        ])

        await this.fieldRepository.add(component.api.fields)
        await this.fieldRepository.add(component.store.api.fields)
        await this.storeRepository.add([component.store])
        await this.propRepository.add([component.props])
        await this.componentRepository.add([component])
      }
    }
  }
}

// export const importApps = async (
//   apps: Array<IAppExport> = [],
//   owner: IAuth0Owner,
// ) => {
//   logSection('Importing App')

//   for (const app of apps) {
//     const importedApp = await createApp(app, owner)

//     logTask('Imported App', importedApp.name)

//     for await (const domain of app.domains) {
//       await importDomains(domain)
//     }
//   }
// }
