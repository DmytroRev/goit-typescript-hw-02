// import React, { FC } from "react";
import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { ImageDate } from "../../types";

interface ImageGalleryProps {
  images: ImageDate[];
  onImageClick: (image: ImageDate) => void
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={css.container}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery