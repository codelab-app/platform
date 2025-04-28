'use client'

import { defineConfig } from '@twind/core'
import presetTailwind from '@twind/preset-tailwind'

const customVariants = [
  ['smc', '@container root (width >= 0px)'],
  ['mdc', '@container root (width >= 480px)'],
  ['lgc', '@container root (width >= 768px)'],
  ['xlc', '@container root (width >= 992px)'],
  ['2xlc', '@container root (width >= 1536px)'],
]

export default defineConfig({
  presets: [presetTailwind({ disablePreflight: true })],
  variants: customVariants,
})
