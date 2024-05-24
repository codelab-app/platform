import { antDesignIconImport } from './rules/ant-design-icon-import'
import barrelFiles from './rules/barrel-import/barrel-files'
import { domainLayerConstraint } from './rules/domain-layer-constraint'

/**
 * https://medium.com/appfire/writing-custom-typescript-eslint-rules-with-unit-tests-for-angular-project-f004482551db
 */
module.exports = {
  configs: {
    recommended: barrelFiles,
  },
  rules: {
    'ant-design-icon-import': antDesignIconImport,
    'domain-layer-constraint': domainLayerConstraint,
  },
}
