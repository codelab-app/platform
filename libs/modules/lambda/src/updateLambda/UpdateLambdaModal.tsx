import { useRecoilState } from 'recoil'
import { updateLambdaState } from './UpdateLambdaState'

export const UpdateLambdaModal = () => {
  const [updateLambda, setUpdateLambda] = useRecoilState(updateLambdaState)

  // const { data, loading } = useGetLambdaQuery({
  //   variables: {
  //     lambdaId: updateLambda.lambdaId,
  //   },
  // })

  return null
  // <ModalForm
  //   modalProps={{
  //     visible: updateLambda.visible,
  //     onCancel: () =>
  //       setUpdateLambda({
  //         visible: false,
  //         lambdaId: updateLambda.lambdaId,
  //         name: updateLambda.name,
  //         body: updateLambda.body,
  //       }),
  //   }}
  //   renderForm={() => (
  //     <UpdateLambdaForm
  //       lambda={data?.lambda[0] as Lambda}
  //       onSubmitSuccess={() =>
  //         setUpdateLambda({
  //           visible: false,
  //           lambdaId: updateLambda.lambdaId,
  //           name: updateLambda.name,
  //           body: updateLambda.body,
  //         })
  //       }
  //     >
  //       <AutoFields />
  //     </UpdateLambdaForm>
  //   )}
  // />
}
