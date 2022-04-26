import { useRemoveHookFromElementForm } from './useRemoveHookFromElementForm'

export interface RemoveHookFromElementModalProps {
  elementId: string
}

export const RemoveHookFromElementModal = ({
  elementId,
}: RemoveHookFromElementModalProps) => {
  const {
    onSubmit,
    onSubmitSuccess,
    actionType,
    onSubmitError,
    isLoading,
    model,
    reset,
    entity,
  } = useRemoveHookFromElementForm(elementId)

  return null
  // <FormModal
  //   okButtonProps={{
  //     loading: isLoading,
  //   }}
  //   okText="Remove"
  //   onCancel={() => reset()}
  //   title={<span css={tw`font-semibold`}>Remove hook</span>}
  //   visible={actionType === 'DELETE'}
  // >
  //   {({ submitRef }) => (
  //     <Form<EmptyJsonSchemaType>
  //       model={model}
  //       onSubmit={onSubmit}
  //       onSubmitError={onSubmitError}
  //       onSubmitSuccess={onSubmitSuccess}
  //       schema={emptyJsonSchema}
  //       submitRef={submitRef}
  //     >
  //       <h4>Are you sure you want to remove the hook "{entity?.type}"</h4>
  //       <AutoFields />
  //     </Form>
  //   )}
  // </FormModal>
}
