import axios, { AxiosInstance } from 'axios'

export class CyGraphService {
  axiosService: AxiosInstance

  constructor() {
    this.axiosService = axios.create({
      baseURL: 'http://localhost:4004/graph/',
    })
  }

  shouldMoveWithDifferentParent() {
    return this.axiosService.get('shouldMoveWithDifferentParent')
  }

  shouldMoveWithDiffParentCorrectOrder() {
    return this.axiosService.get('shouldMoveWithDiffParentCorrectOrder')
  }

  shouldMoveItemToEndOfListSameParent() {
    return this.axiosService.get('shouldMoveItemToEndOfListSameParent')
  }

  shouldMoveItemToEndOfListDifferentParent() {
    return this.axiosService.get('shouldMoveItemToEndOfListDifferentParent')
  }

  shouldMoveWithDifferentParentWithTwoChildren() {
    return this.axiosService.get('shouldMoveWithDifferentParentWithTwoChildren')
  }
}
