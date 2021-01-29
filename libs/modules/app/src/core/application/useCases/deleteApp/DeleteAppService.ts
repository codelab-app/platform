import { Injectable } from '@nestjs/common'
import { AppDto } from '../../../domain/AppDto'
import { DeleteAppInput } from './DeleteAppInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class DeleteAppService
  implements TransactionalUseCase<DeleteAppInput, AppDto> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ id }: DeleteAppInput) {
    console.log(id)
    try {
      return await this.prismaService.app.delete({ where: { id } })
    } catch (e) {
      throw new Error(`The app with id ${id} was not found`)
    }
  }
}
