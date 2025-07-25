import nx from '@nx/eslint-plugin'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/react-typescript'],
  // Config 1: *.ts, *.tsx
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Explicit overrides and custom configurations
      '@typescript-eslint/no-unused-vars': 'off', // Override from recommended
      '@typescript-eslint/no-explicit-any': 'error', // Override from nx js/ts config
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            // Abstract types can only depend on other abstract types
            {
              sourceTag: 'type:abstract',
              onlyDependOnLibsWithTags: ['type:abstract'],
            },
            // Abstract types cannot depend on concrete implementations
            {
              sourceTag: 'type:abstract',
              notDependOnLibsWithTags: ['type:concrete'],
            },
            // Frontend scope cannot depend on backend scope
            {
              sourceTag: 'scope:frontend',
              notDependOnLibsWithTags: ['scope:backend'],
            },
            // Backend scope cannot depend on frontend scope
            {
              sourceTag: 'scope:backend',
              notDependOnLibsWithTags: ['scope:frontend'],
            },
            // Shared scope cannot depend on domain or application layers
            {
              sourceTag: 'scope:shared',
              notDependOnLibsWithTags: ['layer:domain', 'layer:application'],
            },
            // Frontend scope dependencies
            {
              sourceTag: 'scope:frontend',
              onlyDependOnLibsWithTags: [
                'scope:frontend',
                'scope:shared',
                'scope:codegen',
                'type:abstract',
              ],
            },
            // Backend scope dependencies
            {
              sourceTag: 'scope:backend',
              onlyDependOnLibsWithTags: [
                'scope:backend',
                'scope:shared',
                'scope:codegen',
              ],
            },
            // Applications should only depend on libraries
            {
              sourceTag: 'projectType:application',
              onlyDependOnLibsWithTags: ['projectType:library'],
            },
            // Libraries should not depend on applications
            {
              sourceTag: 'projectType:library',
              notDependOnLibsWithTags: ['projectType:application'],
            },
            // Domain layer constraints
            {
              sourceTag: 'layer:domain',
              notDependOnLibsWithTags: ['layer:application'],
            },
            // Frontend Domain layer dependencies
            {
              allSourceTags: ['layer:domain', 'scope:frontend'],
              onlyDependOnLibsWithTags: [
                'layer:domain',
                'type:abstract',
                'layer:infra',
                'scope:shared',
                'type:data',
                'type:test',
              ],
            },
            // Backend Domain layer dependencies
            {
              allSourceTags: ['layer:domain', 'scope:backend'],
              onlyDependOnLibsWithTags: [
                'layer:domain',
                'type:abstract',
                'layer:infra',
                'scope:shared',
                'type:data',
                'type:test',
              ],
            },
            // Frontend Application layer dependencies
            {
              allSourceTags: ['layer:application', 'scope:frontend'],
              onlyDependOnLibsWithTags: [
                'layer:domain',
                'layer:application',
                'layer:infra',
                'layer:presentation',
                'type:abstract',
                'scope:shared',
                'type:data',
                'type:test',
              ],
            },
            // Backend Application layer dependencies
            {
              allSourceTags: ['layer:application', 'scope:backend'],
              onlyDependOnLibsWithTags: [
                'layer:domain',
                'layer:application',
                'layer:infra',
                'type:abstract',
                'scope:shared',
                'type:data',
                'type:test',
              ],
            },
            // Shared scope dependencies
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'type:abstract',
                'layer:infra',
              ],
            },
            // Specific project constraints (Example)
            {
              allSourceTags: [
                'projectName:frontend-application-element',
                'projectName:frontend-application-component',
              ],
              notDependOnLibsWithTags: [
                'projectName:frontend-application-builder',
              ],
            },
          ],
        },
      ],
      'no-extra-semi': 'off', // Base rule off, TS version used
    },
  },
  // Config 2: *.js, *.jsx
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      // Explicit overrides and configurations for JS files
      '@typescript-eslint/no-unused-vars': 'off', // Override from recommended
      'no-extra-semi': 'off',
    },
  },
]
