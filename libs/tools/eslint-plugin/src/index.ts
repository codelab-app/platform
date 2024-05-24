import { antDesignIconImport } from './rules/ant-design-icon-import'
import { domainLayerConstraint } from './rules/domain-layer-constraint'
import { recommendedConfig } from './rules/plugins/recommended'

/**
 * https://medium.com/appfire/writing-custom-typescript-eslint-rules-with-unit-tests-for-angular-project-f004482551db
 */
module.exports = {
  configs: {
    recommended: recommendedConfig,
  },
  rules: {
    'ant-design-icon-import': antDesignIconImport,
    'domain-layer-constraint': domainLayerConstraint,
  },
}
