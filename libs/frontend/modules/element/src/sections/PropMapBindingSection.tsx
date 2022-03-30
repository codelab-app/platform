import tw from 'twin.macro'
import { Element, WithElementService } from '../store'
import {
  CreatePropMapBindingButton,
  CreatePropMapBindingModal,
  DeletePropMapBindingModal,
  PropMapBindingsTable,
  UpdatePropMapBindingModal,
} from '../use-cases'

export interface PropMapBindingSectionProps extends WithElementService {
  element: Element
  providePropCompletion?: (searchValue: string) => Array<string>
}

export const PropMapBindingSection = ({
  element,
  elementService,
  providePropCompletion,
}: PropMapBindingSectionProps) => {
  return (
    <>
      <PropMapBindingsTable element={element} elementService={elementService} />
      <div css={tw`text-center m-2`}>
        <CreatePropMapBindingButton
          element={element}
          elementService={elementService}
        />
      </div>
      <CreatePropMapBindingModal
        elementService={elementService}
        providePropCompletion={providePropCompletion}
      />
      <UpdatePropMapBindingModal
        elementService={elementService}
        providePropCompletion={providePropCompletion}
      />
      <DeletePropMapBindingModal elementService={elementService} />
    </>
  )
}

PropMapBindingSection.displayName = 'PropMapBindingSection'
