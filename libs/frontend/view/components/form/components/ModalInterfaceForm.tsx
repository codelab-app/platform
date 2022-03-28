import { useEffect, useMemo } from 'react'
import { SubmitController } from "@codelab/frontend/abstract/types"
import { InterfaceForm, interfaceFormApi, InterfaceFormProps } from "@codelab/frontend/modules/type"
import { ModalFormContext, SpinnerWrapper } from "@codelab/frontend/view/components"
import { Maybe } from "@codelab/shared/abstract/codegen-v2"
import { useContext, useRef } from "react"
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { useQuery } from 'react-query'


export const ModalInterfaceForm = (props: any) => {
  const { submitRef, setIsLoading } = useContext(ModalFormContext)

  return (
    <InterfaceForm {...props} setIsLoading={setIsLoading} submitRef={submitRef} />
  )
}