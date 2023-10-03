import type {
  IAtomService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'

export interface ElementHookSectionProps {
  atomService: IAtomService
  elementId: string
  typeService: ITypeService
}

export const ElementHookSection = observer<ElementHookSectionProps>(
  ({ atomService, elementId, typeService }) => {
    return null

    // const element = useGetElementById(elementId)
    //
    // if (!element) {
    //   return null
    // }
    //
    // return (
    //   <>
    //     <HooksList element={element} />
    //     <div css={tw`text-center m-2`}>
    //       <AddHookToElementButton />
    //     </div>
    //     <AddHookToElementModal
    //       atomService={atomService}
    //       elementId={element.id}
    //       typeService={typeService}
    //     />
    //     <RemoveHookFromElementModal elementId={element.id} />
    //   </>
    // )
  },
)

ElementHookSection.displayName = 'ElementHookSection'
