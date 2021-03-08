import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { request, setupTestModule } from '@codelab/backend'
import {
  CreateAppGql,
  CreateStyleGql,
  GetStyleGql,
  RegisterUserGql,
} from '@codelab/generated'
import { AppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { StyleModule } from '@codelab/modules/style'
import { UserModule } from '@codelab/modules/user'

const defaultEmail = 'test_user@codelab.ai'
const defaultPassword = 'password'

export const setupStyleTestModule = async (nestApp: INestApplication) => {
  return await setupTestModule(
    nestApp,
    GraphModule,
    UserModule,
    AppModule,
    StyleModule,
  )
}

export const createTestUser = async (
  nestApp: INestApplication,
  email = defaultEmail,
  password = defaultPassword,
) => {
  return await request(nestApp.getHttpServer())
    .send({
      query: print(RegisterUserGql),
      variables: {
        input: {
          email,
          password,
        },
      },
    })
    .then((res) => res.body.data.registerUser)
}

export const createTestApp = async (
  nestApp: INestApplication,
  accessToken?: string,
  title = 'Test app',
) => {
  return await request(nestApp.getHttpServer())
    .set('Authorization', `Bearer ${accessToken || ''}`)
    .send({
      query: print(CreateAppGql),
      variables: {
        input: {
          title,
        },
      },
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.data.createApp.title).toEqual(title)
    })
    .then((res) => res.body.data.createApp)
}

export const createTestStyle = async (
  nestApp: INestApplication,
  appId: string,
  props: object,
  accessToken?: string,
  name = 'Test style',
) => {
  return await request(nestApp.getHttpServer())
    .set('Authorization', `Bearer ${accessToken || ''}`)
    .send({
      query: print(CreateStyleGql),
      variables: {
        input: {
          props,
          appId,
          name,
        },
      },
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.data.createStyle.name).toBe('Test style')
    })
    .then((res) => res.body.data.createStyle)
}

export const getStyle = (
  nestApp: INestApplication,
  styleId: string,
  accessToken?: string,
) =>
  request(nestApp.getHttpServer())
    .set('Authorization', `Bearer ${accessToken || ''}`)
    .send({
      query: print(GetStyleGql),
      variables: {
        input: {
          styleId,
        },
      },
    })
    .expect(200)
