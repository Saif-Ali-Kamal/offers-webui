import { Image, Modal } from "antd";
import React from "react";

const ImageModal = ({
  visible,
  handleClose,
  image,
  title
}) => {
  return(
    <Modal
      visible={visible}
      onCancel={handleClose}
      footer={false}
      title={title}
    >
      <Image 
        src={image}
        height="100%" 
        width="100%" 
        preview={false} 
      />
    </Modal>
  );
}

export default ImageModal;