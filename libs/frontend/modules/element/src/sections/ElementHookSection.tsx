import { WithAtomService } from '@codelab/frontend/modules/atom'
import { WithTypeService } from '@codelab/frontend/modules/type'
import { observer } from 'mobx-react-lite'

export type ElementHookSectionProps = {
  elementId: string
} & WithTypeService &
  WithAtomService

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
