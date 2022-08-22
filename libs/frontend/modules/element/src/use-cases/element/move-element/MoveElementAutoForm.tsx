import { withAutoForm } from '@codelab/frontend/view/components'
import { AutoForm } from 'uniforms-antd'

class ExtendedMoveElementAutoForm extends (AutoForm as any) {
  onChange(key: string, value: string) {
    super.onChange(key, value)

    if (key !== 'parentElementId') {
      return
    }

    return super.onChange('prevSiblingId', undefined)
  }
}

export const MoveElementAutoForm = withAutoForm(
  ExtendedMoveElementAutoForm as any,
)
