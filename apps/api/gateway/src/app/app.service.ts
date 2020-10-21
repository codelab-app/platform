import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/config'

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService<ApiConfig>) {}

  getData(): { message: string } {
    return {
      message: `Welcome to api ${this.config.get<number>(
        ApiConfigTypes.PORT_GATEWAY,
      )}`,
    }
  }
}
