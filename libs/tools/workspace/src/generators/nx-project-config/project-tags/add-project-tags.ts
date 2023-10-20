import type { ProjectConfiguration, Tree } from '@nx/devkit'
import set from 'lodash/set'
import uniq from 'lodash/uniq'

/**
 *
 * This process appends tags
 *
 * @param projectConfig
 * @param tag The tags to append
 * @param libPathsMatch An array of lib paths to match for, if any matches, we apply the tags
 *
 * @returns returns whether any tag has been appended
 */
const appendTagsToProjectConfig = (
  libPathsMatch: Array<string>,
  tag: string,
  projectConfig: ProjectConfiguration,
): boolean => {
  const { sourceRoot } = projectConfig
  const matches = libPathsMatch.some((lib) => sourceRoot?.startsWith(lib))

  if (matches) {
    appendTags(tag, projectConfig)
  }

  return matches
}

const appendTags = (tag: string, projectConfig: ProjectConfiguration) => {
  const updatedTags = uniq([...(projectConfig.tags ?? []), tag])

  set(projectConfig, 'tags', updatedTags)
}

/**
 * Add tags based on project directory structure
 *
 *  "scope": ["frontend", "backend", "shared", "codegen"]
 *  "layer": ["domain", "application", "infra", "presentation"]
 *  "type": ["abstract", "concrete", "data", "test"]
 *  "projectType": ["application", "library"]
 */
export const addProjectTags = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  // We want to re-construct the tags each time
  projectConfig.tags = []

  /**
   * Add `type:data`
   */
  appendTagsToProjectConfig(
    ['libs/backend/data', 'libs/frontend/application/shared/data'],
    'type:data',
    projectConfig,
  )

  /**
   * Add `layer:presentation`
   */
  appendTagsToProjectConfig(
    ['libs/frontend/presentation'],
    'layer:presentation',
    projectConfig,
  )

  /**
   * Add `projectType:application`
   */
  appendTagsToProjectConfig(['apps'], 'projectType:application', projectConfig)

  /**
   * Add `projectType:library`
   */
  appendTagsToProjectConfig(['libs'], 'projectType:library', projectConfig)

  /**
   * Add `type:abstract`
   */
  const isAbstract = appendTagsToProjectConfig(
    ['libs/shared/abstract', 'libs/frontend/abstract', 'libs/backend/abstract'],
    'type:abstract',
    projectConfig,
  )

  if (!isAbstract) {
    appendTags('type:concrete', projectConfig)
  }

  appendTagsToProjectConfig(
    ['libs/backend/test', 'libs/frontend/test'],
    'type:test',
    projectConfig,
  )

  /**
   * Add `layer:infra` tag
   */
  appendTagsToProjectConfig(
    ['libs/backend/infra', 'libs/frontend/infra', 'libs/shared/infra'],
    'layer:infra',
    projectConfig,
  )

  /**
   * Add `scope:codegen` tag
   */
  appendTagsToProjectConfig(
    ['libs/backend/abstract/codegen', 'libs/shared/abstract/codegen'],
    'scope:codegen',
    projectConfig,
  )

  /**
   * Add `scope:backend` tag
   */
  appendTagsToProjectConfig(['libs/backend'], 'scope:backend', projectConfig)

  /**
   * Add `scope:frontend` tag
   */
  appendTagsToProjectConfig(['libs/frontend'], 'scope:frontend', projectConfig)

  /**
   * Add `scope:shared` tag
   */
  appendTagsToProjectConfig(
    ['libs/shared', 'libs/backend/shared', 'libs/frontend/shared'],
    'scope:shared',
    projectConfig,
  )
  /**
   * Add `layer:domain` tag
   */
  appendTagsToProjectConfig(
    ['libs/backend/domain', 'libs/frontend/domain'],
    'layer:domain',
    projectConfig,
  )

  /**
   * Add `layer:application` tag
   */
  appendTagsToProjectConfig(
    ['libs/backend/application', 'libs/frontend/application'],
    'layer:application',
    projectConfig,
  )
}
