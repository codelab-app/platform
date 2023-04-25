import { withAutoForm } from '@codelab/frontend/presentation/view'
import { AutoForm } from 'uniforms-antd'

// any for delegating generic
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
