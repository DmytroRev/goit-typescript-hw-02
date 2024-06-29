import React from "react";
import css from "./LoadMore.module.css";

interface LoadMoreBtnProps {
  onClick: () => void
}

export const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={css.container}>
      <button className={css.btn} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
