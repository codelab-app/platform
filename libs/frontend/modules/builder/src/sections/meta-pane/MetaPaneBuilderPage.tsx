import { WithAtomService } from '@codelab/frontend/modules/atom'
import { WithTypeService } from '@codelab/frontend/modules/type'
import { observer } from 'mobx-react-lite'
import { usePropCompletion } from '../../hooks'

export type MetaPaneBuilderPageProps = WithAtomService &
  WithTypeService &
  WithBuilderService &
  WithElementService

export const MetaPaneBuilderPage = observer<MetaPaneBuilderPageProps>(
  ({ typeService, atomService }) => {
    const { providePropCompletion } = usePropCompletion()
    // const { elementTree } = useElementGraphContext()

    // if (!elementTree) {
    //   return null
    // }

    return null

    // return (
    //   <SelectElementProvider tree={elementTree}>
    //     <MetaPaneBuilder
    //       atomService={atomService}
    //       renderUpdateElementContent={(element, trackPromises) => (
    //         <>
    //           <UpdateElementForm
    //             elementId={element.id}
    //             key={element.id + '_update_form'}
    //             model={{}}
    //             providePropCompletion={(value) =>
    //               providePropCompletion(value, element.id)
    //             }
    //             submitRef={undefined}
    //             trackPromises={trackPromises}
    //             tree={elementTree}
    //           />
    //
    //           <MoveElementForm
    //             elementId={element.id}
    //             key={element.id + '_move_form'}
    //             model={{}}
    //             submitRef={undefined}
    //             trackPromises={trackPromises}
    //             tree={elementTree}
    //           />
    //
    //           <DeleteElementButton elementId={element.id} entity={element} />
    //         </>
    //       )}
    //       tree={elementTree}
    //       typeService={typeService}
    //     />
    //   </SelectElementProvider>
    // )
  },
)
