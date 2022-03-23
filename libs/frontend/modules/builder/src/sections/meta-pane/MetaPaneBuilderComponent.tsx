import { WithAtomService } from '@codelab/frontend/modules/atom'
import { WithTypeService } from '@codelab/frontend/modules/type'
import { observer } from 'mobx-react-lite'
import { usePropCompletion } from '../../hooks'

export type MetaPaneBuilderComponentProps = WithTypeService & WithAtomService

export const MetaPaneBuilderComponent = observer<MetaPaneBuilderComponentProps>(
  ({ typeService, atomService }) => {
    // const { elementTree } = useElementGraphContext()
    const { providePropCompletion } = usePropCompletion()

    // if (!elementTree) {
    //   return null
    // }
    return null
    // return (
    // <SelectElementProvider tree={elementTree}>
    // <MetaPaneBuilder
    //   atomService={atomService}
    //   renderUpdateElementContent={(element, trackPromises) => (
    //     <>
    //       <UpdateElementForm
    //         elementId={element.id}
    //         key={element.id + '_update_form'}
    //         model={{}}
    //         providePropCompletion={(value) =>
    //           providePropCompletion(value, element.id)
    //         }
    //         submitRef={undefined}
    //         trackPromises={trackPromises}
    //         tree={elementTree}
    //       />
    //
    //       <MoveElementForm
    //         elementId={element.id}
    //         key={element.id + '_move_form'}
    //         model={{}}
    //         submitRef={undefined}
    //         trackPromises={trackPromises}
    //         tree={elementTree}
    //       />
    //
    //       <div css={tw`absolute bottom-0 right-0 m-8`}>
    //         <LoadingIndicator
    //           error={trackPromises.error}
    //           isLoading={trackPromises.isLoading}
    //         />
    //       </div>
    //
    //       <DeleteElementButton elementId={element.id} entity={element} />
    //     </>
    //   )}
    //   tree={elementTree}
    //   typeService={typeService}
    // />
    // </SelectElementProvider>
    // )
  },
)
