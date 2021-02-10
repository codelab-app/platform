import { Module } from '@nestjs/common'
import { AssignStyleService } from '../../core/application/useCases/assignStyle/AssignStyleService'
import { CreateStyleService } from '../../core/application/useCases/createStyle/CreateStyleService'
import { DeleteStyleService } from '../../core/application/useCases/deleteStyle/DeleteStyleService'
import { UpdateStyleService } from '../../core/application/useCases/updateStyle/UpdateStyleService'
import { StyleResolvers } from '../../presentation/controllers/StyleResolvers'

@Module({
  providers: [
    StyleResolvers,
    /**
     * UseCaseServices
     */
    CreateStyleService,
    DeleteStyleService,
    UpdateStyleService,
    AssignStyleService,
  ],
})
export class StyleModule {}
