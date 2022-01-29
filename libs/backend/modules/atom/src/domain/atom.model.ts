import { Tag } from '@codelab/backend/modules/tag'
import { InterfaceType } from '@codelab/backend/modules/type'
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

  @Field(() => InterfaceType, {
    description:
      'Similar to props for a React component, it tells us which kind of configurations it can take',
  })
  declare api: InterfaceType

  @Field(() => [String], { defaultValue: [] })
  declare tags: Array<string>

  /**
   * Any tags that allow us to filter, based on which UI framework for example.
   */
  declare tags?: Array<Tag>
}

registerEnumType(AtomType, {
  name: 'AtomType',
})
