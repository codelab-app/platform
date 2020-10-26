import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { FoodEntity } from '../food/food.entity'
import { IRestaurant } from './IRestaurant'

@Entity('restaurant')
@ObjectType({
  implements: [IRestaurant],
})
export class RestaurantEntity implements IRestaurant {
  @PrimaryGeneratedColumn()
  declare id: number

  @Column({
    type: 'text',
  })
  declare name: string

  // @OneToMany(type => FoodEntity, food => food.restaurant)
  // https://github.com/typeorm/typeorm/issues/4190
  // To resolve circular dependencies
  @OneToMany('FoodEntity', 'restaurant')
  declare foods: Array<FoodEntity>
}
