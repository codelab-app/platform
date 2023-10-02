import type { ProjectConfiguration, Tree } from '@nx/devkit'
import set from 'lodash/set'
import uniq from 'lodash/uniq'

/**
 * Add tags based on project directory structure
 *
 *  "scope": ["frontend", "backend", "shared", "codegen"]
 *  "layer": ["domain", "application", "infra", "presentation"]
 *  "type": ["abstract", "test"]
 *  "projectType": ["application", "library"]
 */
export const addProjectTags = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const { sourceRoot } = projectConfig

  // We want to re-construct the tags each time
  projectConfig.tags = []

  /**
   * Add `projectType:application`
   */
  if (sourceRoot?.startsWith('apps')) {
    const updatedTags = uniq([...projectConfig.tags, 'projectType:application'])
    set(projectConfig, 'tags', updatedTags)
  }

  /**
   * Add `projectType:library`
   */
  if (sourceRoot?.startsWith('libs')) {
    const updatedTags = uniq([...projectConfig.tags, 'projectType:library'])
    set(projectConfig, 'tags', updatedTags)
  }

  /**
   * Add `type:abstract`
   */
  if (
    [
      'libs/shared/abstract',
      'libs/frontend/abstract',
      'libs/backend/abstract',
    ].some((lib) => sourceRoot?.startsWith(lib))
  ) {
    const updatedTags = uniq([...projectConfig.tags, 'type:abstract'])
    set(projectConfig, 'tags', updatedTags)
  } else {
    const updatedTags = uniq([...projectConfig.tags, 'type:concrete'])
    set(projectConfig, 'tags', updatedTags)
  }

  if (
    ['libs/backend/test', 'libs/frontend/test'].some((lib) =>
      sourceRoot?.startsWith(lib),
    )
  ) {
    const updatedTags = uniq([...projectConfig.tags, 'type:test'])
    set(projectConfig, 'tags', updatedTags)
  }

  /**
   * Add `layer:infra` tag
   */
  if (
    ['libs/backend/infra', 'libs/frontend/infra', 'libs/shared/infra'].some(
      (lib) => sourceRoot?.startsWith(lib),
    )
  ) {
    const updatedTags = uniq([...projectConfig.tags, 'layer:infra'])
    set(projectConfig, 'tags', updatedTags)
  }

  /**
   * Add `scope:codegen` tag
   */
  if (
    ['libs/backend/infra', 'libs/frontend/infra'].some((lib) =>
      sourceRoot?.startsWith(lib),
    )
  ) {
    const updatedTags = uniq([...projectConfig.tags, 'scope:codegen'])
    set(projectConfig, 'tags', updatedTags)
  }

  /**
   * Add `scope:backend` tag
   */
  if (sourceRoot?.startsWith('libs/backend')) {
    const updatedTags = uniq([...projectConfig.tags, 'scope:backend'])
    set(projectConfig, 'tags', updatedTags)
  }

  /**
   * Add `scope:frontend` tag
   */
  if (sourceRoot?.startsWith('libs/frontend')) {
    const updatedTags = uniq([...projectConfig.tags, 'scope:frontend'])
    set(projectConfig, 'tags', updatedTags)
  }

  /**
   * Add `scope:shared` tag
   */
  if (
    ['libs/shared', 'libs/backend/shared', 'libs/frontend/shared'].some((lib) =>
      sourceRoot?.startsWith(lib),
    )
  ) {
    const updatedTags = uniq([...projectConfig.tags, 'scope:shared'])
    set(projectConfig, 'tags', updatedTags)
  }

  /**
   * Add `layer:domain` tag
   */
  if (
    ['libs/backend/domain', 'libs/frontend/domain'].some((lib) =>
      sourceRoot?.startsWith(lib),
    )
  ) {
    const updatedTags = uniq([...projectConfig.tags, 'layer:domain'])
    set(projectConfig, 'tags', updatedTags)
  }

  /**
   * Add `layer:application` tag
   */
  if (
    ['libs/backend/application', 'libs/frontend/application'].some((lib) =>
      sourceRoot?.startsWith(lib),
    )
  ) {
    // Temporarily treat as domain
    if (sourceRoot?.startsWith('libs/frontend/application/atoms')) {
      const updatedTags = uniq([...projectConfig.tags, 'layer:domain'])
      set(projectConfig, 'tags', updatedTags)
    } else {
      const updatedTags = uniq([...projectConfig.tags, 'layer:application'])
      set(projectConfig, 'tags', updatedTags)
    }
  }
}
