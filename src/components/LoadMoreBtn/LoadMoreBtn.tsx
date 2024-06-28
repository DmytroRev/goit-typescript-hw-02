import css from "./LoadMore.module.css";

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={css.container}>
      <button className={css.btn} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
