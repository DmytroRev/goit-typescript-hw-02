import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { getImages } from "../../images-api";
import { SearchBar } from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { Loader } from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { LoadMoreBtn } from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { ImageDate } from "../../types";

export default function App() {
  const [images, setImages] = useState<ImageDate[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchImg, setSearchImg] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectImage, setSelectImage] = useState<ImageDate | null>(null);

  useEffect(() => {
    if (!searchImg) return;
    const fetchImages = async () => {
      try {
        setLoader(true);
        setIsError(false);
        const data = await getImages({ topic: searchImg, currentPage });
        setImages((prevImages) =>
          currentPage === 1 ? data : [...prevImages, ...data]
        );
      } catch (error) {
        setIsError(true);
        toast.error("Failed to fetch images");
      } finally {
        setLoader(false);
      }
    };
    fetchImages();
  }, [searchImg, currentPage]);

  const handleFormSubmit = (value: string) => {
    setSearchImg(value);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevImages) => prevImages + 1);
  };

  const openModal = (image: ImageDate) => {
    setSelectImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectImage(null);
  };
  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleFormSubmit} />
      {isError && <ErrorMessage />}
      {loader && <Loader />}
      <ImageGallery images={images} onImageClick={openModal} />
      {images.length > 0 &&
        !loader &&
        !isError &&
        images.length === currentPage * 12 && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          image={selectImage}
        />
      )}
    </>
  );
}
