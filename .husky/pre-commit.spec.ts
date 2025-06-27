import { execSync } from 'child_process'

describe('Branch Name Validation', () => {
  const runValidation = (branchName: string): { passed: boolean; error?: string } => {
    try {
      execSync(`npx validate-branch-name -t "${branchName}"`, { 
        encoding: 'utf8',
        stdio: 'pipe' 
      })
      return { passed: true }
    } catch (error: any) {
      return { 
        passed: false, 
        error: error.stdout || error.stderr || error.message 
      }
    }
  }

  describe('Valid Branch Names', () => {
    describe('Feature branches', () => {
      const validFeatureBranches = [
        'feat/3736-add-user-authentication',
        'feat/123-implement-dark-mode',
        'feat/9999-create-dashboard-component',
        'feat/1-initial-setup',
        'feat/42-add-api-endpoints',
      ]

      validFeatureBranches.forEach(branchName => {
        it(`should accept feature branch: ${branchName}`, () => {
          const result = runValidation(branchName)
          expect(result.passed).toBe(true)
        })
      })
    })

    describe('Fix branches', () => {
      const validFixBranches = [
        'fix/3742-login-validation-error',
        'fix/567-memory-leak-dashboard',
        'fix/8888-responsive-layout-mobile',
        'fix/1001-cors-issue',
        'fix/99-typo-in-readme',
      ]

      validFixBranches.forEach(branchName => {
        it(`should accept fix branch: ${branchName}`, () => {
          const result = runValidation(branchName)
          expect(result.passed).toBe(true)
        })
      })
    })

    describe('Refactor branches', () => {
      const validRefactorBranches = [
        'refactor/3755-simplify-repository-pattern',
        'refactor/2468-extract-common-utilities',
        'refactor/7777-update-dependency-injection',
        'refactor/333-consolidate-api-services',
        'refactor/5000-optimize-performance',
      ]

      validRefactorBranches.forEach(branchName => {
        it(`should accept refactor branch: ${branchName}`, () => {
          const result = runValidation(branchName)
          expect(result.passed).toBe(true)
        })
      })
    })

    describe('Test branches', () => {
      const validTestBranches = [
        'test/3761-add-user-service-tests',
        'test/999-integration-tests-auth',
        'test/4321-e2e-checkout-flow',
        'test/111-unit-tests-helpers',
        'test/8765-api-endpoint-tests',
      ]

      validTestBranches.forEach(branchName => {
        it(`should accept test branch: ${branchName}`, () => {
          const result = runValidation(branchName)
          expect(result.passed).toBe(true)
        })
      })
    })

    describe('Special branches', () => {
      const specialBranches = [
        'master',
        'main',
        'dev',
        'nx-upgrade',
        'stag-1.0.0',
        'stag-2.3.4',
        'prod-1.0.0',
        'prod-10.20.30',
      ]

      specialBranches.forEach(branchName => {
        it(`should accept special branch: ${branchName}`, () => {
          const result = runValidation(branchName)
          expect(result.passed).toBe(true)
        })
      })
    })

    describe('Edge cases for valid branches', () => {
      it('should accept branch with single digit issue number', () => {
        const result = runValidation('feat/1-x')
        expect(result.passed).toBe(true)
      })

      it('should accept branch with very long issue number', () => {
        const result = runValidation('fix/999999-bug')
        expect(result.passed).toBe(true)
      })

      it('should accept branch with hyphenated description', () => {
        const result = runValidation('feat/123-add-new-feature-with-long-name')
        expect(result.passed).toBe(true)
      })

      it('should accept branch with numbers in description', () => {
        const result = runValidation('fix/456-fix-issue-123-in-api-v2')
        expect(result.passed).toBe(true)
      })

      it('should accept branch with single letter description', () => {
        const result = runValidation('test/789-a')
        expect(result.passed).toBe(true)
      })
    })
  })

  describe('Invalid Branch Names', () => {
    describe('Wrong type prefix', () => {
      const invalidTypeBranches = [
        'feature/123-add-feature',  // should be 'feat'
        'bugfix/456-fix-bug',       // should be 'fix'
        'hotfix/789-urgent-fix',    // should be 'fix'
        'chore/111-update-deps',    // not allowed
        'docs/222-update-readme',   // not allowed
        'style/333-format-code',    // not allowed
      ]

      invalidTypeBranches.forEach(branchName => {
        it(`should reject invalid type: ${branchName}`, () => {
          const result = runValidation(branchName)
          expect(result.passed).toBe(false)
          expect(result.error).toContain('Branch name must follow pattern')
        })
      })
    })

    describe('Missing issue number', () => {
      const missingIssueBranches = [
        'feat/add-new-feature',
        'fix/login-bug',
        'refactor/cleanup-code',
        'test/add-tests',
      ]

      missingIssueBranches.forEach(branchName => {
        it(`should reject branch without issue number: ${branchName}`, () => {
          const result = runValidation(branchName)
          expect(result.passed).toBe(false)
        })
      })
    })

    describe('Invalid format', () => {
      const invalidFormatBranches = [
        'feat-123-add-feature',      // wrong separator (should be /)
        'feat/123_add_feature',      // underscores not allowed
        'feat/123-Add-Feature',      // uppercase not allowed
        'feat/123',                  // missing description
        'feat//123-add-feature',     // double slash
        'feat/123-',                 // trailing hyphen
        'feat/-123-add-feature',     // leading hyphen in issue
        'feat/abc-add-feature',      // non-numeric issue
        'feat/1.23-add-feature',     // decimal issue number
        '3736-add-feature',          // missing type prefix
        '/feat/123-add-feature',     // leading slash
        'feat/123-add feature',      // spaces not allowed
        'feat/123-add@feature',      // special characters not allowed
        'FEAT/123-add-feature',      // uppercase type
      ]

      invalidFormatBranches.forEach(branchName => {
        it(`should reject invalid format: ${branchName}`, () => {
          const result = runValidation(branchName)
          expect(result.passed).toBe(false)
        })
      })
    })

    describe('Invalid release tags', () => {
      const invalidReleaseTags = [
        'stag-1.0',              // missing patch version
        'prod-1',                // missing minor and patch
        'stag-v1.0.0',           // 'v' prefix not allowed
        'staging-1.0.0',         // should be 'stag'
        'production-1.0.0',      // should be 'prod'
        'stag-1.0.0.0',          // too many version parts
        'stag-1.a.0',            // non-numeric version
        'prod-01.0.0',           // leading zeros not allowed
      ]

      invalidReleaseTags.forEach(branchName => {
        it(`should reject invalid release tag: ${branchName}`, () => {
          const result = runValidation(branchName)
          expect(result.passed).toBe(false)
        })
      })
    })

    describe('Empty and special cases', () => {
      it('should reject empty branch name', () => {
        // validate-branch-name might default to current branch for empty string
        // so we'll test with a space instead
        const result = runValidation(' ')
        expect(result.passed).toBe(false)
      })

      it('should reject branch with only type', () => {
        const result = runValidation('feat/')
        expect(result.passed).toBe(false)
      })

      it('should reject branch with only type and issue', () => {
        const result = runValidation('feat/123-')
        expect(result.passed).toBe(false)
      })

      it('should reject random string', () => {
        const result = runValidation('random-branch-name')
        expect(result.passed).toBe(false)
      })

      it('should reject branch starting with hyphen', () => {
        const result = runValidation('-feat/123-test')
        expect(result.passed).toBe(false)
      })
    })
  })

  describe('Error Message Validation', () => {
    it('should provide helpful error message', () => {
      const result = runValidation('invalid-branch-name')
      expect(result.passed).toBe(false)
      expect(result.error).toContain('Branch name must follow pattern')
      expect(result.error).toContain('feat, fix, refactor, test')
      expect(result.error).toContain('Example:')
    })
  })
})