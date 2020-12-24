import { PrimaryGeneratedColumn } from 'typeorm'

export class BaseTypeOrm {
  @PrimaryGeneratedColumn('uuid')
  declare id: string
}
