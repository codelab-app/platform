import type { AntDesignField } from './field.interface'

/**
 * This is the AntDesign components
 */
interface AntDesignAtom {
  api: string
  name: string
}

/**
 * An atom can have more than one api
 */
export interface AntDesignApi {
  atom: AntDesignAtom
  fields: Array<AntDesignField>
}
