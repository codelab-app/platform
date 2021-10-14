import { domainRequest } from '@codelab/backend/shared/testing'
import { INestApplication } from '@nestjs/common'
import { CreateTagInput } from '../create-tag.input'
import {
  TestCreateTagGql,
  TestCreateTagMutation,
} from './create-tag.api.graphql.gen'

export const createTagInput: CreateTagInput = {
  name: 'Ant Design',
}

export const parentTagData: CreateTagInput = {
  name: 'Parent Tag',
}

export const childTagData: CreateTagInput = {
  name: 'Child Tag',
}

/**
 * Helper method to create a tag tree
 * @param app
 */
export const createTagGraphs = async (app: INestApplication) => {
  const { createTag: parentTag } = await domainRequest<
    CreateTagInput,
    TestCreateTagMutation
  >(app, TestCreateTagGql, parentTagData)

  const { createTag: childTag } = await domainRequest<
    CreateTagInput,
    TestCreateTagMutation
  >(app, TestCreateTagGql, {
    ...childTagData,
    parentTagId: parentTag.id,
  })

  return {
    parentTag,
    childTag,
  }
}

export const tagAData: CreateTagInput = {
  name: 'Tag A',
}

export const tagBData: CreateTagInput = {
  name: 'Tag B',
}

export const createTags = async (app: INestApplication) => {
  const { createTag: tagA } = await domainRequest<
    CreateTagInput,
    TestCreateTagMutation
  >(app, TestCreateTagGql, tagAData)

  const { createTag: tagB } = await domainRequest<
    CreateTagInput,
    TestCreateTagMutation
  >(app, TestCreateTagGql, tagBData)

  return {
    tagA,
    tagB,
  }
}
