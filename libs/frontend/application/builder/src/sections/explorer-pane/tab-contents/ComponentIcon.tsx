import type {
  IAtomModel,
  IComponentModel,
} from '@codelab/frontend-abstract-domain'

import { isComponent } from '@codelab/frontend-abstract-domain'

interface ComponentIconProps {
  component: IAtomModel | IComponentModel
}

export const antDesignIconPrefix = 'assets/atoms/antd'

export const ComponentIcon = ({ component }: ComponentIconProps) => {
  // TODO: update this once we show snapshots for custom components as well
  const isCustomComponent = isComponent(component)

  const src =
    !isCustomComponent && component.icon
      ? `/${antDesignIconPrefix}/${component.icon}.svg`
      : '/codelab-logo-default.svg'

  return <img alt="" className="w-full" draggable="false" src={src} />
}
