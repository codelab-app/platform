import type {
  IAtomDomainService,
  IAtomModel,
  IComponentType,
} from '@codelab/frontend/abstract/domain'
import { dynamicLoader } from '@codelab/frontend/shared/utils'
import { IAtomDto, IAtomType } from '@codelab/shared/abstract/core'
import { throwIfUndefined } from '@codelab/shared/utils'
import { computed, observable } from 'mobx'
import {
  arraySet,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import { Atom } from './store'

@model('@codelab/AtomDomainService')
export class AtomDomainService
  extends Model({
    atoms: prop(() => objectMap<IAtomModel>()),
    loadedExternalCssSources: prop(() => arraySet<string>()),
    loadedExternalJsSources: prop(() => arraySet<string>()),
  })
  implements IAtomDomainService
{
  @computed
  get atomsList() {
    return Array.from(this.atoms.values())
  }

  @computed
  get defaultRenderType() {
    const renderType = this.atomsList.find(
      (atom) => atom.type === IAtomType.ReactFragment,
    )?.toJson

    return throwIfUndefined(renderType)
  }

  @modelAction
  hydrate(atomDto: IAtomDto) {
    // console.debug('AtomService.add()', atomDto)

    let atom = this.atoms.get(atomDto.id)

    if (atom) {
      // console.debug('found cache, updating...')
      atom.writeCache(atomDto)
    } else {
      // console.debug('no found cache, creating...')
      atom = Atom.create(atomDto)
    }

    const { externalCssSource, externalJsSource, externalSourceType } = atomDto

    // dynamically load an external css
    if (
      externalSourceType &&
      externalCssSource &&
      !this.loadedExternalCssSources.has(externalSourceType)
    ) {
      const link = document.createElement('link')

      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href', externalCssSource)
      document.head.appendChild(link)

      console.log(`Loaded external css for "${externalSourceType}"`)

      this.loadedExternalCssSources.add(externalSourceType)
    }

    // dynamically load an external js
    if (
      externalSourceType &&
      externalJsSource &&
      !this.loadedExternalJsSources.has(externalSourceType)
    ) {
      // this stores the react component into this class so it can be observable
      // @ts-expect-error: dynamic function
      window[`onload${externalSourceType}`] = (
        component: React.ComponentType,
      ) => {
        this.loadedExternalJsSources.add(externalSourceType)
        this.dynamicComponents[externalSourceType] = dynamicLoader(
          async () => component,
        )
      }

      const script = document.createElement('script')

      script.type = 'module'
      script.innerText = `
        import ${externalSourceType} from '${externalJsSource}';
        window.${externalSourceType} = ${externalSourceType};
        if (window.onload${externalSourceType}) {
          window.onload${externalSourceType}(${externalSourceType});
          delete window.onload${externalSourceType};
        }
      `
      document.getElementsByTagName('head')[0]?.appendChild(script)

      console.log(`Loaded external js for "${externalSourceType}"`)
    }

    this.atoms.set(atom.id, atom)

    return atom
  }

  @observable
  dynamicComponents: Record<string, IComponentType> = {}
}
