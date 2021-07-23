import { useState } from "react";
import { StarRatin } from "./components/StarRating";
import { TextArea } from "./components/textarea/TextArea";
import { Markdown } from "./components/markdown/Markdown";

import styles from "./styles.module.scss";

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

interface UserReviewProps {
  handleSetGameReview: (review: string) => void;
  review: string;
  starOnChange: (rating: number) => void;
  selectedGame: GamesProps;
  rating: number;
}

export function UserReview({ 
  handleSetGameReview,
  review,
  starOnChange,
  selectedGame,
  rating
}: UserReviewProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  function togglePreviewComponenet() {
    setIsPreviewOpen(isPreviewOpen === true ? false : true);
  }

  return(
    <div className={styles.userInputReview}>
      <h3>Conte sobre sua experiência:</h3>

      <div className={styles.markdownHelp}>
        <div>
          <p>
            Este campo pode usar o Markdown Syntax para padronizar a formatação de texto e deixar sua review mais bonita. <a href="https://docs.pipz.com/central-de-ajuda/learning-center/guia-basico-de-markdown#open" rel="noreferrer" target="_blank">Click aqui</a> para entender como utilizar.
          </p>
        </div>
      </div>

      <TextArea
        text={review}
        setGameReview={handleSetGameReview}
        selectedGame={selectedGame}
      />

      <button
        type="button"
        onClick={togglePreviewComponenet}
        className={styles.buttonShowPreview}
      >
        {isPreviewOpen ? (<p>Recolher preview</p>) : (<p>Mostrar preview</p>)}
      </button>

      {isPreviewOpen && (
        <div className={styles.previewBackground}>
          <Markdown review={review} />
        </div>
      )}

      <h3 className={styles.h3Rating}>Por fim, dê sua nota final:</h3>

      <div className={styles.ratingDiv}>
        <StarRatin
          onChangeFunction={starOnChange}
          rating={rating}
        />
      </div>
    </div>
  );
}