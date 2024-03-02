import { ResourceRepository } from '@codelab/backend/domain/resource'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ResourceApplicationService {
  constructor(private resourceRepository: ResourceRepository) {}

  async createResource(resourceDto: any) {
    // return this.resourceRepository.add()
  }
}
