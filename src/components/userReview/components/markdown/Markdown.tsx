import { useEffect } from "react";
import ReactMarkdown from "react-markdown";

import styles from "./styles.module.scss";

interface MarkdownProps {
  review: string;
}

export function Markdown({ review }: MarkdownProps) {
  useEffect(() => {
    console.log(review);
  }, [review]);

  return(
    <ReactMarkdown
      className={styles.markdown}
      children={review}
    />
  );
}