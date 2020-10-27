import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FoodEntity } from '../food/food.entity'
import { RestaurantEntity } from '../restaurant/restaurant.entity'

@Injectable()
export class SeedDbService {
  private readonly logger = new Logger(SeedDbService.name, true)

  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepo: Repository<RestaurantEntity>,
    @InjectRepository(FoodEntity)
    private readonly foodRepo: Repository<FoodEntity>,
  ) {}

  async seedDB() {
    const marbleSlab = new RestaurantEntity()

    marbleSlab.name = 'Marble Slab'

    const patsCookies = new RestaurantEntity()

    patsCookies.name = 'Pats Cookies'

    await this.restaurantRepo.save([marbleSlab, patsCookies])

    const f1 = new FoodEntity()

    f1.name = 'Red Velvet'
    f1.description = 'Delicious red velvet chocolate ice cream'
    f1.price = 5.99
    f1.restaurant = marbleSlab

    const f2 = new FoodEntity()

    f2.name = 'Birthday Cake'
    f2.description = 'Birthday Cake flavoured ice cream'
    f2.price = 7.99
    f2.restaurant = marbleSlab

    const f3 = new FoodEntity()

    f3.name = 'Chocolate Swiss'
    f3.description = 'Chocolate swiss ice cream'
    f3.price = 10.99
    f3.restaurant = marbleSlab

    const f4 = new FoodEntity()

    f4.name = 'Chocolate Chip'
    f4.description = 'Cookies with chocolate Chips'
    f4.price = 1.99
    f4.restaurant = patsCookies

    const f5 = new FoodEntity()

    f5.name = 'Maple Glazed'
    f5.description = 'Canadian maple glazed cookies'
    f5.price = 3.99
    f5.restaurant = patsCookies

    await this.foodRepo.save([f1, f2, f3, f4, f5])
  }
}
