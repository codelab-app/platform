import { IAtomService, ITypeService } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'

export interface ElementHookSectionProps {
  elementId: string
  typeService: ITypeService
  atomService: IAtomService
}

export const ElementHookSection = observer<ElementHookSectionProps>(
  ({ elementId, typeService, atomService }) => {
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
