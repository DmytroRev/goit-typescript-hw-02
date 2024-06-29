import React from "react";
import css from "./ImageCard.module.css";
import { ImageDate } from "../../types";

interface ImageCardProps {
  image: ImageDate;
  onClick: () => void
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) =>  {
  return (
    <div className={css.card} onClick={onClick}>
      <img
        className={css.photo}
        src={image.small}
        alt="Image"
        style={{
          width: 400,
          height: 280,
          objectFit: "cover",
          overflow: "hidden",
        }}
      />
    </div>
  );
}

export default ImageCard