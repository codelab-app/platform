import CloseOutlined from '@ant-design/icons/CloseOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type { IFormService } from '@codelab/frontend/abstract/application'
import type {
  IElementModel,
  IElementTree,
} from '@codelab/frontend/abstract/domain'
import { elementRef } from '@codelab/frontend/abstract/domain'
import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Button } from 'antd'
import type { Ref } from 'mobx-keystone'
import { useCreateElementForm } from './create-element.state'

export type CreateElementButtonProps = React.ComponentProps<typeof Button> & {
  activeForm?: IFormService<Ref<IElementModel>> | null
  selectedElementId: Maybe<string>
  elementTree: IElementTree
}

export const CreateElementButton = ({
  activeForm,
  elementTree,
  selectedElementId,
  title,
  type,
}: CreateElementButtonProps) => {
  const createElementForm = useCreateElementForm()

  const selectedElement = selectedElementId
    ? elementRef(selectedElementId)
    : undefined

  return activeForm ? (
    <Button
      icon={<CloseOutlined data-testid="close-page-element-button" />}
      onClick={() => activeForm.close()}
      size="small"
      style={{ background: 'red', color: 'white' }}
      type={type}
    ></Button>
  ) : (
    <Button
      icon={<PlusOutlined data-testid="create-page-element-button" />}
      onClick={(event) => {
        event.stopPropagation()
        event.preventDefault()

        return createElementForm.open({
          elementOptions: elementTree.elements.map(mapElementOption),
          elementTree,
          selectedElement: selectedElement?.current,
        })
      }}
      size="small"
      type={type}
    >
      {title || ''}
    </Button>
  )
}
