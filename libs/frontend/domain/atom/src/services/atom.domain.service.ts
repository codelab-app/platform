import type {
  IAtomDomainService,
  IAtomModel,
  IComponentType,
} from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'
import type { IAtomDto } from '@codelab/shared/abstract/core'

import DeploymentUnitOutlined from '@ant-design/icons/lib/icons/DeploymentUnitOutlined'
import { dynamicLoader } from '@codelab/frontend/shared/utils'
import {
  IAtomType,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/typebox'
import { computed, observable } from 'mobx'
import {
  arraySet,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'

import { Atom, filterAtoms, mapEntitySelectOptions } from '../store'

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
    )

    return Validator.parseDefined(renderType)
  }

  @observable
  dynamicComponents: Record<string, IComponentType> = {}

  getRenderTypeOptions(atoms?: Array<SelectOption>) {
    const fallbackAtoms = this.atomsList.map(mapEntitySelectOptions)
    const atomOptions = atoms ?? fallbackAtoms

    const optionsWithImage = atomOptions.map(({ label, value }) => {
      return {
        __typename: IElementRenderTypeKind.Atom,
        icon: DeploymentUnitOutlined,
        label,
        text: label,
        value,
      }
    })

    return optionsWithImage
  }

  getSelectOptions(parentAtom?: IAtomModel) {
    const atomOptions = filterAtoms(this.atomsList, parentAtom)

    return atomOptions.map(mapEntitySelectOptions)
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
import { Validator } from '@codelab/shared/infra/typebox'
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
}
