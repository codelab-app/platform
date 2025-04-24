import { ObjectLike } from '@codelab/shared-abstract-types';
import { ModalProps } from 'antd/lib/modal';
import { ReactElement } from 'react';
import { FormProps, SubmitRef } from './form.interface';
export type FormModalProps<TData extends ObjectLike> = ModalProps & {
    /**
     * SubmitRef is created inside modal, and passed down to form
     */
    children(props: SubmitRef): ReactElement<FormProps<TData>>;
};
//# sourceMappingURL=modal.d.ts.map