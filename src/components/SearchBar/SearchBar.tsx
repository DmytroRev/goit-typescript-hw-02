import { FC, FormEvent, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (value: string) =>void
}

export const SearchBar: FC<SearchBarProps> = ({ onSubmit }) => {
  const [searchImage, setSearchImage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchImage(event.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchImage.trim() === "") {
      toast.error("Type something:)");
      return;
    } else {
      setSearchImage("");
      onSubmit(searchImage);
    }
  };

  return (
    <header className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.inputWrapper}>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchImage}
            onChange={handleChange}
          />

          <button className={css.btn} type="submit">
            <IoSearchOutline />
          </button>
        </div>
      </form>
    </header>
  );
};
