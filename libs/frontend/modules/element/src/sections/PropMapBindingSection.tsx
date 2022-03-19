import { ElementTree } from '@codelab/shared/core'

export interface PropMapBindingSectionProps extends WithElementService {
  element: Element
  providePropCompletion?: (searchValue: string) => Array<string>
}

export const PropMapBindingSection = ({
  element,
  elementService,
  providePropCompletion,
}: PropMapBindingSectionProps) => {
  // const element = useGetElementById(elementId)

  // if (!element) {
  //   return null
  // }

  return null

  // return (
  //   <>
  //     <PropMapBindingsTable element={element} tree={tree} />
  //     <div css={tw`text-center m-2`}>
  //       <CreatePropMapBindingButton />
  //     </div>
  //     <CreatePropMapBindingModal
  //       elementId={elementId}
  //       providePropCompletion={providePropCompletion}
  //       tree={tree}
  //     />
  //     <UpdatePropMapBindingModal
  //       elementId={elementId}
  //       providePropCompletion={providePropCompletion}
  //       tree={tree}
  //     />
  //     <DeletePropMapBindingModal elementId={elementId} />
  //   </>
  // )
}

PropMapBindingSection.displayName = 'PropMapBindingSection'
