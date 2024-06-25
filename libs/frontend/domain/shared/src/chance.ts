import Chance from 'chance'

let chanceInstance: Chance.Chance | undefined

export const chance = (chanceInstance ??= new Chance())
