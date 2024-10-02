'use client'

import { Panel, PanelGroup } from 'react-resizable-panels'

/**
 * Re-export with `use client`
 *
 * https://www.martin-paucot.fr/blog/how-to-properly-use-third-parties-libraries-with-react-server-components-5ep8
 */
export const CuiPanel = Panel

export type CuiPanelProps = React.ComponentProps<typeof CuiPanel>

export const CuiPanelGroup = PanelGroup
