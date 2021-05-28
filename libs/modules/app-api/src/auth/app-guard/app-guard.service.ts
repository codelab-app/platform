import { JwtPayload } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
//Import with full path, or will get circular reference
import { GetAppService } from '../../use-cases/get-app/get-app.service'

/**
 * Validates that the app exists and is owned by this user
 */
@Injectable()
export class AppGuardService {
  constructor(private getAppService: GetAppService) {}

  async validate(appId: string, currentUser?: JwtPayload) {
    //make sure the new app exists is owned by the user
    const app = await this.getAppService.execute({
      input: { appId },
      currentUser,
    })

    if (!app) {
      throw new Error('App does not exist')
    }

    if (app.ownerId !== currentUser?.sub) {
      throw new Error("You don't have access to this app")
    }
  }
}
