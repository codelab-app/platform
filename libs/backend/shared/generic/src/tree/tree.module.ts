import { Module } from '@nestjs/common'
import { treeProvider } from './tree.provider'
import { TreeService } from './tree.service'
import { TreeTokens } from './tree.tokens'

@Module({
  providers: [TreeService, treeProvider],
  exports: [TreeService, TreeTokens.Service],
})
export class TreeModule {}
