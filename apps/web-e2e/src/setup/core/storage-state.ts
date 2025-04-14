import type { BrowserContext } from '@playwright/test'

import { test as base, expect } from '@playwright/test'
import { ensureFile } from 'fs-extra'

/**
 * Class for managing browser storage state
 */
export class StorageState {
  constructor(context: BrowserContext) {
    this.context = context
  }

  async checkFileExists(file: string) {
    return base.step('ensureStorageFileExists', async () => {
      // Ensure the directory and file exist
      await ensureFile(file)
    })
  }

  /**
   * Get current storage state
   */
  async get(options?: { path?: string }) {
    return base.step('getStorageState', async () => {
      return this.context.storageState(options)
    })
  }

  /**
   * Save storage state to file
   */
  async save(filePath: string) {
    return base.step('saveStorageState', async () => {
      await this.context.storageState({ path: filePath })
    })
  }

  private context: BrowserContext
}
