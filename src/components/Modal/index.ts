import { isWeb } from '@layout';
import { ModalMobile } from './ModalMobile';
import { ModalWeb } from './ModalWeb';

export interface IModal {
    onClose: (label: string) => void;
    isVisible: boolean;
    label: string;
    children: object;
}

const Modal = isWeb ? ModalWeb : ModalMobile;

export { Modal };
