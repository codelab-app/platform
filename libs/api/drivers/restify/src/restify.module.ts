import { Inject, Module } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import restify from 'express-restify-mongoose'
import { Model } from 'mongoose'
import { Node, NodeModule } from '@codelab/api/model'
import {
  ROUTER_SERVICE,
  RouterModule,
  RouterService,
} from '@codelab/api/router'

@Module({
  imports: [RouterModule, NodeModule],
  providers: [],
})
export class RestifyModule {
  constructor(
    @Inject(ROUTER_SERVICE) private readonly routerService: RouterService,
    @InjectModel(Node.name) private readonly nodeModel: Model<Node>,
  ) {
    restify.serve(this.routerService.expressRouter, this.nodeModel, {
      postDelete: (req: any, res: any, next: any) => {
        const { id } = req.params

        // eslint-disable-next-line consistent-return
        this.nodeModel.updateMany({ parent: id }, { parent: null }, (err) => {
          if (err) return err

          next()
        })
      },
    })
  }
}
