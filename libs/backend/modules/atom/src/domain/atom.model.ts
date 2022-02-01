import { ObjectRef } from '@codelab/backend/abstract/core'
import { AtomType, IAtom } from '@codelab/shared/abstract/core'
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'

/**
 * An Atom can only be created by an admin. It essentially tells us what DOM node type we have to render for the view.
 *
 * Atom only tells us the type, not the DOM tree position, which is handled by Element.
 */
@ObjectType()
export class Atom implements IAtom {
  @Field(() => ID)
  declare id: string

  @Field(() => AtomType, {
    description:
      'An Atom could be of HTML type <button> or <a>, or a component type of <Button> or <Link>',
  })
  declare type: AtomType

  @Field({
    description: 'This acts as unique ID suitable for seeder lookup',
  })
  declare name: string

  declare api: ObjectRef // resolved using field resolver

  /**
   * Any tags that allow us to filter, based on which UI framework for example.
   */
  @Field(() => [String], { defaultValue: [] })
  declare tags: Array<string>
}

registerEnumType(AtomType, {
  name: 'AtomType',
})
