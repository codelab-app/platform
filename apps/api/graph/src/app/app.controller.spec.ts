import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe.skip('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()
  })

  describe('getData', () => {
    it('should return "Welcome to graph!"', () => {
      const appController = app.get<AppController>(AppController)

      expect(appController.getData()).toEqual({ message: 'Welcome to graph!' })
    })
  })
})
