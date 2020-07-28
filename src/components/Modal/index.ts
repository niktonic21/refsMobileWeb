import { isWeb } from '@layout';
import { ModalMobile } from './ModalMobile';
import { ModalWeb } from './ModalWeb';

const Modal = isWeb ? ModalWeb : ModalMobile;

export { Modal };
