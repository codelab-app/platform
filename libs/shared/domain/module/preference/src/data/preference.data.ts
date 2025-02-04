import { v4 } from 'uuid';
import { breakpoints, DEFAULT_BUILDER_BREAKPOINT } from '@codelab/shared/config/builder';
import { IPreferenceDto } from "@codelab/shared/abstract/core";

/**
 * Initial default data
 */
export const preferenceDefault: IPreferenceDto = {
  builderBreakpointType: DEFAULT_BUILDER_BREAKPOINT,
  builderWidth: breakpoints[DEFAULT_BUILDER_BREAKPOINT].default,
  id: v4(),
}
