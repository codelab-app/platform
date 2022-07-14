import { ICustomAction, IPipelineAction, IResourceAction } from './actions'

export type IAnyAction = ICustomAction | IResourceAction | IPipelineAction
