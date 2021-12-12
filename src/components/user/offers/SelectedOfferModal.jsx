import React from "react";
import { Image, Modal } from "antd";

const SelectedOfferModal = ({ visible, handleCancel, offer }) => {
  return(
    <Modal
      visible={visible}
      onCancel={handleCancel}
      title={offer.image ? 
        <Image   
          src={offer.image[0]} 
          style={{ 
            width: '100%',
            height: '100%'
          }}
          preview={false}
        /> : 
      ''}
    >

    </Modal>
  );
}

export default SelectedOfferModal;