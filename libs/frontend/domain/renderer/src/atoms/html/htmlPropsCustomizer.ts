import { IAtomType } from '@codelab/shared/abstract/core'
import type { AtomCustomizer, AtomCustomizerFn } from '../types'

const reactFragmentFn: AtomCustomizerFn = ({ props }) => {
  const { key, children } = props

  // Do not pass in any props for fragments, except key and children, because it creates an error
  return { props: { key, children } }
}

// const htmlImageFn: AtomCustomizerFn = (input) => ({
//   props: { src: '', alt: '' },
// })

export const htmlPropsCustomizer: AtomCustomizer = {
  [IAtomType.ReactFragment]: reactFragmentFn,
  // [IAtomType.HtmlImage]: htmlImageFn,
}
