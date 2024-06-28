import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { getImages } from "../../images-api";
import { SearchBar } from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { Loader } from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { LoadMoreBtn } from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchImg, setSearchImg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectImage, setSelectImage] = useState(null);

  useEffect(() => {
    if (!searchImg) return;
    const fetchImages = async () => {
      try {
        setLoader(true);
        setIsError(false);
        const data = await getImages(searchImg, currentPage);
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

  const handleFormSubmit = (value) => {
    setSearchImg(value);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevImages) => prevImages + 1);
  };

  const openModal = (image) => {
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
