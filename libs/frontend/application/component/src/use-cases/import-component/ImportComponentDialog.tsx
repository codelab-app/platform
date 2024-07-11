import ImportOutlined from '@ant-design/icons/ImportOutlined'
import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { HttpException } from '@nestjs/common'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { importComponentDataAction } from './ImportComponent.action'

export const ImportComponentDialog = observer(() => {
  const { componentService } = useStore()

  // const [{ status }, importComponent] = useAsync(
  //   componentService.importComponent,
  // )

  const onError = useErrorNotify({
    description: (event: HttpException) => {
      return event.message
    },
    title: 'Failed to import component',
  })

  const onSuccess = useSuccessNotify({
    description: (event: Maybe<IComponentModel>) => {
      return `Component ${event?.name} imported successfully`
    },
    title: 'Component imported successfully',
  })

  const inputFile = useRef<HTMLInputElement | null>(null)
  const onClick = () => inputFile.current?.click()

  const onFileChange = async () => {
    const files = inputFile.current?.files
    const componentDataFile = files?.[0]

    if (componentDataFile) {
      await importComponentDataAction(componentDataFile)
      // await importComponent
      //   .execute(componentDataFile)
      //   .then(onSuccess)
      //   .catch(onError)
    }
  }

  return (
    <>
      {/* {status === 'loading' && <Spin className="mr-2" />} */}
      <ImportOutlined onClick={onClick} />
      <input
        accept=".json"
        onChange={onFileChange}
        ref={inputFile}
        style={{ display: 'none' }}
        type="file"
      />
    </>
  )
})
