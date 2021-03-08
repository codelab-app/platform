import { Module } from '@nestjs/common'
import { AssignStyleService } from '../../core/application/useCases/assignStyle/AssignStyleService'
import { CreateStyleService } from '../../core/application/useCases/createStyle/CreateStyleService'
import { DeleteStyleService } from '../../core/application/useCases/deleteStyle/DeleteStyleService'
import { GetStyleService } from '../../core/application/useCases/getStyle/GetStyleService'
import { GetStylesService } from '../../core/application/useCases/getStyles/GetStylesService'
import { UnAssignStyleService } from '../../core/application/useCases/unAssignStyle/UnAssignStyleService'
import { UpdateStyleService } from '../../core/application/useCases/updateStyle/UpdateStyleService'
import { StyleResolvers } from '../../presentation/controllers/StyleResolvers'

@Module({
  providers: [
    StyleResolvers,
    /**
     * UseCaseServices
     */
    GetStyleService,
    GetStylesService,
    CreateStyleService,
    DeleteStyleService,
    UpdateStyleService,
    AssignStyleService,
    UnAssignStyleService,
  ],
})
export class StyleModule {}
