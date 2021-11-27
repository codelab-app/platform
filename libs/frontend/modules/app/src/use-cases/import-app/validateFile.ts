import { notify } from '@codelab/frontend/shared/utils'
import { ExportAppSchema } from '@codelab/shared/abstract/core'
import { Upload } from 'antd'
import type { RcFile } from 'antd/es/upload'

export const parseFile = (file: File | Blob | RcFile) =>
  file.text().then(JSON.parse)

export const validateFile = async (file: RcFile): Promise<string | boolean> => {
  if (file.type !== 'application/json') {
    notify({
      type: 'error',
      title: "File type isn't supported",
      content: 'Please upload a JSON file',
    })

    return Upload.LIST_IGNORE
  }

  let data: Record<string, any>

  try {
    data = await parseFile(file)
  } catch (e) {
    notify(
      {
        type: 'error',
        title: 'Error parsing file. Must be a valid JSON file',
      },
      e,
    )

    return Upload.LIST_IGNORE
  }

  try {
    ExportAppSchema.parse(data)
  } catch (e) {
    notify(
      {
        type: 'error',
        title: 'Error parsing file. Must be a valid exported app',
      },
      e,
    )

    return Upload.LIST_IGNORE
  }

  return true
}
