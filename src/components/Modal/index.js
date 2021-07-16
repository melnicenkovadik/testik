import React from 'react';
import {createPortal} from 'react-dom';
import {ModalContext} from '../../utils/modalContext';

const Modal = () => {
    const {modalContent, handleModal, modal, setModalContent} = React.useContext(ModalContext);
    if (modal) {
        return createPortal(
            <div className='table__gallery-scale'>
                <div className='table__gallery-wrap'>
                    <p>{modalContent}</p>
                </div>
                <div className='table__gallery-bg' onClick={() => {
                    setModalContent(null);
                    handleModal();
                }}/>
            </div>,
            document.querySelector('#modal-root')
        );
    }
    return null;
};

export default Modal;
