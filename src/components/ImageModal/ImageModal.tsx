import Modal from "react-modal";
import { FaUser } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import css from "./ImageModal.module.css";
import { ImageDate } from "../../types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

Modal.setAppElement("#root");

interface ImageModalProps {
  image: ImageDate | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, image }) => {
   if (!isOpen || !image) {
    return null;
  }
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        {image && (
          <div
            className={css.container}
            style={{ position: "relative", textAlign: "center" }}
          >
            <img
              src={image.regular}
              alt="imageModal"
              style={{ maxWidth: "100%", maxHeight: "80vh" }}
            />
            <ul className={css.contentList}>
              {image.username && (
                <li className={css.info}>
                  <FaUser />
                  {image.username}
                </li>
              )}
              {image.instagram_username && (
                <li className={css.info}>
                  <FaInstagram /> {image.instagram_username}
                </li>
              )}
              {image.location && (
                <li className={css.info}>
                  <CiLocationOn /> {image.location}
                </li>
              )}
              {image.total_likes !== null && (
                <li className={css.info}>
                  <FcLike /> {image.total_likes}
                </li>
              )}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ImageModal