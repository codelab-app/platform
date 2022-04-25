import {
  ATOM_SERVICE,
  TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'

export type ElementHookSectionProps = {
  elementId: string
} & WithServices<TYPE_SERVICE | ATOM_SERVICE>

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
