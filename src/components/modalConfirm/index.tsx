import Modal from 'react-modal';
import { Button } from '../button';

import styles from "./styles.module.scss";

type ModalConfirmProps = {
  closeModal: () => void;
  confirm: () => void;
  text: string;
  isModalOpen: boolean;
}

export function ModalConfirm({
  closeModal,
  confirm,
  text,
  isModalOpen
}: ModalConfirmProps) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "rgb(32, 32, 32)",
    },
    overlay: {
      backgroundColor: 'rgba(32, 32, 32, 0.61)'
    },
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal de confimação"
      
    >
      <div className={styles.modalContent}>
        <h1>{text}</h1>
        <div>
          <Button 
            click={confirm}
            color="black"
            bgColor="rgb(231, 231, 231)"
          >
            Confirmar
          </Button>
          <Button 
            click={closeModal}
            color="white"
            bgColor="rgb(209, 64, 64)"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
}