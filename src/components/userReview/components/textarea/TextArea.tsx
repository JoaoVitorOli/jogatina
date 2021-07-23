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

interface TextAreaProps {
  setGameReview: (value: string) => void;
  text: string;
  selectedGame: GamesProps;
}

export function TextArea({ setGameReview, text, selectedGame }: TextAreaProps) {
  return(
    <textarea
      disabled={Object.keys(selectedGame).length === 0}
      onChange={event => setGameReview(event.target.value)}
      value={text}
      className={styles.textarea}
    />
  );
}