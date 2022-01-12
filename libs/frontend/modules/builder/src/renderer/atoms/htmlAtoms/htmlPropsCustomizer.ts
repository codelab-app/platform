import { AtomType } from '@codelab/shared/abstract/core'
import { AtomPropsCustomizer, PropsCustomizerFn } from '../types'

const reactFragmentFn: PropsCustomizerFn = ({ props }) => {
  const { key } = props

  // Do not pass in any props for fragments, except key, because it creates an error
  return { key }
}

const htmlImageFn: PropsCustomizerFn = (input) => ({ src: '', alt: '' })

export const htmlPropsCustomizer: AtomPropsCustomizer = {
  [AtomType.ReactFragment]: reactFragmentFn,
  [AtomType.HtmlImage]: htmlImageFn,
}
