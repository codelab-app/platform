import { IAtomType } from '@codelab/shared/abstract/core'
import type { AtomCustomizer, AtomCustomizerFn } from '../types'

const reactFragmentFn: AtomCustomizerFn = ({ props }) => {
  const { key } = props

  // Do not pass in any props for fragments, except key, because it creates an error
  return { props: { key } }
}

// const htmlImageFn: AtomCustomizerFn = (input) => ({
//   props: { src: '', alt: '' },
// })

export const htmlPropsCustomizer: AtomCustomizer = {
  [IAtomType.ReactFragment]: reactFragmentFn,
  // [IAtomType.HtmlImage]: htmlImageFn,
}
