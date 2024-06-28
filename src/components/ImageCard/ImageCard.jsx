import css from "./ImageCard.module.css";

export default function ImageCard({ image, onClick }) {
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
