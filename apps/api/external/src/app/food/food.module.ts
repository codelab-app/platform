import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { FoodEntity } from './food.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FoodEntity])],
    exports: [TypeOrmModule]
})
export class FoodModule {}
