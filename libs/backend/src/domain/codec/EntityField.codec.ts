import * as t from 'io-ts'

/**
 * Entity vs ValueObject
 */
// export class Entity<TDto> {
//   declare id: string

//   constructor(dto: TDto) {
//     Object.assign(this, dto)
//   }
// }

export const EntityFieldC = t.type({
  id: t.string,
})

export type EntityFieldC = t.TypeOf<typeof EntityFieldC>
