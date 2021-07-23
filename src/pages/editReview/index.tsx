import { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import GameInfo from "../../components/gameInfo";
import { Header } from "../../components/header";
import { UserReview } from "../../components/userReview";
import { AuthenticationContext } from "../../context/AuthentionContext";

import { useReview } from "../../hooks/useReview";
import { database } from "../../services/firebase";

import styles from "./styles.module.scss";
import { ModalConfirm } from "../../components/modalConfirm";

interface ParamsProps {
  id: string;
}

export function EditReview() {
  const history = useHistory();
  const { user } = useContext(AuthenticationContext); 
  const params = useParams<ParamsProps>();
  const reviewId = params.id;
  const { reviewAndGame } = useReview(reviewId);

  const [review, setReview] = useState(reviewAndGame.review);
  const [rating, setRating] = useState(reviewAndGame.rating);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  useEffect(() => {
    if (reviewAndGame.authorId !== undefined) {
      if (user.id !== reviewAndGame.authorId) {
        history.push("/");
      }
    }

    setReview(reviewAndGame.review);
    setRating(reviewAndGame.rating);
  }, [reviewAndGame]);

  function handleChangeRating(rating: number) {
    setRating(rating);
  }

  function handleSetReview(review: string) {
    setReview(review);
  }

  function openModalEdit() {
    if (review === "") {
      toast.error("Preencha com sua review.");
      return;
    }

    setIsModalEditOpen(true);
  }

  function openModalDelete() {
    setIsModalDeleteOpen(true);
  }

  function handleDeleteReview() {
    const reviewRef = database.ref(`reviews/${reviewId}`);
    reviewRef.remove();

    history.push(`/`);
  }

  function closeModalEdit() {
    setIsModalEditOpen(false);
  }

  function closeModalDelete() {
    setIsModalDeleteOpen(false);
  }

  function handleEditReview() {
    const reviewRef = database.ref(`reviews/${reviewId}`);
    reviewRef.update({"review": review});
    reviewRef.update({"rating": rating});

    history.push(`/review/${reviewId}`);
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <ModalConfirm 
        text="Editar review?"
        closeModal={closeModalEdit}
        confirm={handleEditReview}
        isModalOpen={isModalEditOpen}
      />

      <ModalConfirm 
        text="Excluir review?"
        closeModal={closeModalDelete}
        confirm={handleDeleteReview}
        isModalOpen={isModalDeleteOpen}
      />

      {Object.keys(reviewAndGame).length > 0 && (
        <>
          <GameInfo
            info={reviewAndGame.game}
          />

          <UserReview
            review={review}
            handleSetGameReview={handleSetReview}
            starOnChange={handleChangeRating}
            selectedGame={reviewAndGame.game}
            rating={rating}
          />

          <div className={styles.excludeAndEditReview}>
            <button onClick={openModalEdit}>Editar</button>
            <button onClick={openModalDelete}>Deletar review</button>
          </div>
        </>
      )}
    </>
  );
}
