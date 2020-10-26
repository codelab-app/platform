import { type } from 'os'
import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { RestaurantEntity } from '../restaurant/restaurant.entity'
import { IFood } from './IFood'

@Entity('food')
@ObjectType({
  implements: [IFood],
})
export class FoodEntity implements IFood {
  @PrimaryGeneratedColumn()
  declare id: number

  @Column({
    type: 'text',
  })
  declare name: string

  @Column({
    type: 'text',
  })
  declare description: string

  @Column({
    type: 'double precision',
  })
  declare price: number

  // @ManyToOne(type => RestaurantEntity)
  // https://github.com/typeorm/typeorm/issues/4190
  // To resolve circular dependencies
  @ManyToOne('RestaurantEntity', 'foods')
  declare restaurant: RestaurantEntity
}
