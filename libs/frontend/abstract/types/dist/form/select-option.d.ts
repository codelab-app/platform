import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { IElementRenderTypeKind } from '@codelab/shared-abstract-core';
import { DefaultOptionType } from 'antd/lib/select';
import { ForwardRefExoticComponent } from 'react';
export interface SelectOption extends DefaultOptionType {
    label: string;
    value: string;
}
export interface RenderTypeSelectOption extends SelectOption {
    __typename: IElementRenderTypeKind;
    icon: ForwardRefExoticComponent<AntdIconProps>;
}
//# sourceMappingURL=select-option.d.ts.map