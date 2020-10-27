import { Module } from '@nestjs/common'
import { FoodModule } from '../food/food.module'
import { RestaurantModule } from '../restaurant/restaurant.module'
import { SeedDbService } from './seed-db.service'

@Module({
  imports: [RestaurantModule, FoodModule],
  providers: [SeedDbService],
  exports: [SeedDbService],
})
export class SeedDbModule {}
