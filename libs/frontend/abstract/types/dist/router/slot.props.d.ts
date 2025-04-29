import type { ReactNode } from 'react';
import type { DashboardSlots } from './layout.props';
export type SlotProps<SlotKey extends keyof DashboardSlots = never> = {
    [K in SlotKey]: ReactNode;
};
//# sourceMappingURL=slot.props.d.ts.map