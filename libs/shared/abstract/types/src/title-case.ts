import type { KebabCase, PascalCase, Replace } from 'type-fest'

/**
 * Split a string on hyphens and capitalize each section
 */
type CapitalizeWords<S extends string> =
  S extends `${infer First}-${infer Rest}`
    ? `${Capitalize<First>}${Rest extends ''
        ? ''
        : ` ${CapitalizeWords<Rest>}`}`
    : Capitalize<S>

export type TitleCase<T extends string> = CapitalizeWords<KebabCase<T>>
