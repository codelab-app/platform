import type { AnchorHTMLAttributes } from 'react'

/**
 * The name exports here must be a key from IAtomType, unfortunately no way to validate this
 */

/**
 * `TransitionEventHandler` inside `DOMAttributes` is causing issues
 *
 * Issue was Event not having any import
 *
 * Then next issue https://github.com/vega/ts-json-schema-generator/issues/1456
 */
export type HtmlA = AnchorHTMLAttributes<unknown>

// export type HtmlAudio = AudioHTMLAttributes<unknown>
