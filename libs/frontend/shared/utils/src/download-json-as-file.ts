import { prettifyForConsole } from '@codelab/shared/utils'

export const downloadJsonAsFile = (fileName: string, content: object) => {
  const contentType = 'application/json;charset=utf-8;'
  const a = document.createElement('a')

  a.download = fileName
  a.href = `data:${contentType},${encodeURIComponent(
    prettifyForConsole(content),
  )}`
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
