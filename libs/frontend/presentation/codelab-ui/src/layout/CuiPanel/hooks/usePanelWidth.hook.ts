'use client'

import { useLayoutEffect, useState } from 'react'
import { getPanelElement } from 'react-resizable-panels'
import { useWindowSize } from 'react-use'

export enum PaneSection {
  Builder = 'Builder',
  Config = 'Config',
  Explorer = 'Explorer',
}
