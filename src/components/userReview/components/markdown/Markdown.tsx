import ReactMarkdown from "react-markdown";

import styles from "./styles.module.scss";

interface MarkdownProps {
  review: string;
}

export function Markdown({ review }: MarkdownProps) {
  return(
    <ReactMarkdown
      className={styles.markdown}
      children={review}
    />
  );
}