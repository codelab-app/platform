import { ReactNode } from 'react';
import { DashboardSlots } from './layout.props';
export type SlotProps<SlotKey extends keyof DashboardSlots = never> = {
    [K in SlotKey]: ReactNode;
};
