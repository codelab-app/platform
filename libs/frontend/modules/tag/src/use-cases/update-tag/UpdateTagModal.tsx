// import { useUpdateTagForm } from './useUpdateTagForm'

// export const UpdateTagModal = () => {
//   const {
//     onSubmit,
//     onSubmitSuccess,
//     onSubmitError,
//     isLoading,
//     reset,
//     model,
//     actionType,
//   } = useUpdateTagForm()

//   return (
//     <FormModal
//       okButtonProps={{
//         loading: isLoading,
//       }}
//       okText="Update Tag"
//       onCancel={() => reset()}
//       title={<span css={tw`font-semibold`}>Update Tag</span>}
//       visible={actionType === CRUDActionType.Update}
//     >
//       {({ submitRef }) => (
//         <Form<CreateTagInput>
//           model={model}
//           onSubmit={onSubmit}
//           onSubmitError={onSubmitError}
//           onSubmitSuccess={onSubmitSuccess}
//           schema={updateTagSchema}
//           submitRef={submitRef}
//         >
//           <AutoFields />
//         </Form>
//       )}
//     </FormModal>
//   )
// }
