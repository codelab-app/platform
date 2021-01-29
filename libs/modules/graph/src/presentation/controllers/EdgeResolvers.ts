import { Injectable } from '@nestjs/common'
import { Resolver } from '@nestjs/graphql'
import { Edge } from '../../core/domain/edge/Edge'

@Resolver(() => Edge)
@Injectable()
export class EdgeResolvers {}
