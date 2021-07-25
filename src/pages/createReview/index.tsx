import { useState, useContext, FormEvent } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useVirtual from "react-cool-virtual";
import ReactLoading from "react-loading";
import { Toaster, toast } from "react-hot-toast";

import GameInfo from "../../components/gameInfo";
import { UserReview } from "../../components/userReview";
import { AuthenticationContext } from "../../context/AuthenticationContext";

import NoImage from "../../assets/images/no-image.png";

import { database } from "../../services/firebase";

import styles from "./styles.module.scss";
import { ModalConfirm } from "../../components/modalConfirm";

interface GamesProps {
  name: string;
  summary: string;
  cover: {
    url: string;
  };
  platforms: {
    id: string;
    name: string;
  }[] | string;
  themes: {
    id: string;
    name: string;
  }[] | string;
}

export function CreateReview() {
  const history = useHistory();
  const { user } = useContext(AuthenticationContext);

  const [searchGame, setSearchGame] = useState("");
  const [games, setGames] = useState<GamesProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [gameRating, setGameRating] = useState(0);
  const [gameReview, setGameReview] = useState("");
  const [selectedGame, setSelectedGame] = useState<GamesProps>({} as GamesProps);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { outerRef, innerRef, items } = useVirtual({
    itemCount: games.length,
    itemSize: 150
  });


  function handleSearchGame() {
    if (!searchGame) {
      return;
    }

    setLoading(true);

    axios({
      url: `https://aqueous-hollows-66552.herokuapp.com/https://api.igdb.com/v4/games`,
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Client-ID': `${process.env.REACT_APP_CLIENT_ID}`,
          'Authorization': `Bearer ${process.env.REACT_APP_AUTHORIZATION}`,
          'Access-Control-Allow-Origin': '*'
      },
      data: `
        fields id,name,cover.*,summary,themes.*,platforms.*,screenshots.*;
        search "${searchGame}";
      `
    }).then(response => {
      setLoading(false);
      setGames(response.data);
    })
    .catch(err => {
      console.error(err);
    });
  }

  async function handleSubmitReview() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const dateNow = `${day}/${month}/${year}`;

    const reviewRef = database.ref("reviews");
    const firebaseReview = await reviewRef.push({
      authorId: user?.id,
      authorAvatar: user?.avatar,
      authorName: user?.name,
      review: gameReview,
      rating: gameRating,
      createdAt: dateNow,
      game: {
        name: selectedGame.name,
        summary: selectedGame.summary || "Nenhum sumário.",
        cover:  {
          url: selectedGame.cover.url,
        },
        platforms: selectedGame.platforms || "Nenhuma plataforma informada.",
        themes: selectedGame.themes || "Sem tema."
      }
    });

    history.push(`/review/${firebaseReview.key}`);
  }

  function handleChangeGameRating(rating: number) {
    setGameRating(rating);
  }

  function openModal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (Object.keys(user).length === 0) {
      toast.error("Ocorreu um erro.");
      return;
    }

    if (gameReview === "") {
      toast.error("Preencha com sua review.");
      return;
    }

    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleSelectGame(game: GamesProps) {
    let bigCover = NoImage;
    let filteredGames = game;

    if (game.cover !== undefined) {
      let cover = game.cover.url;
      bigCover = `https:${cover.replace("thumb", "cover_big")}`;
      filteredGames.cover.url = bigCover;
    }

    if (game.cover === undefined) {
      const cover = {
        url: bigCover,
      }

      filteredGames = {...filteredGames, cover}
    }

    setSelectedGame(filteredGames);
    setGames([]);
  }

  function handleSetGameReview(review: string) {
    setGameReview(review);
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <ModalConfirm 
        text="Enviar review?"
        closeModal={closeModal}
        confirm={handleSubmitReview}
        isModalOpen={isModalOpen}
      />

      <h1 className={styles.heading}>Sua Review</h1>

      <form onSubmit={openModal}>
        <div className={styles.divSearchGame}>
          <input
            type="text"
            placeholder="Digite o nome do jogo..."
            onChange={event => setSearchGame(event.target.value)}
            value={searchGame}
          />
          <button type="button" onClick={handleSearchGame}>
            {loading ? (
              <ReactLoading
                type="spin"
                color="white"
                height={20}
                width={20}
              />
            ) : (
              <p>Pesquisar jogo</p>
            )}
          </button>

          {games.length > 0 && (
            <div
              className={styles.gameResults}
              ref={(el) => {
                outerRef.current = el;
              }}
              style={{ width: "300px", height: "500px", overflow: "auto" }}
            >
              <div ref={(el) => {
                innerRef.current = el;
              }}>
                {items.map(({index, size}) => {
                  let bigCover = NoImage;

                  if (games[index].cover !== undefined) {
                    let cover = games[index].cover.url;
                    bigCover = `https:${cover.replace("thumb", "cover_big")}`;
                  }

                  return(
                    <span
                      key={index}
                      onClick={() => handleSelectGame(games[index])}
                      style={{ height: `${size}px` }}
                      className={styles.results}
                    >
                      <img src={bigCover} alt="cover" />
                      <p>{games[index].name}</p>
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {Object.keys(selectedGame).length > 0 && (
          <GameInfo 
            info={selectedGame}
          />
        )}

        <UserReview
          review={gameReview}
          handleSetGameReview={handleSetGameReview}
          starOnChange={handleChangeGameRating}
          selectedGame={selectedGame}
          rating={gameRating}
        />

        <button
          disabled={selectedGame === null}
          type="submit"
          className={styles.buttonSubmit}
        >
          Enviar review
        </button>
      </form>
    </>
  );
}
