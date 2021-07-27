import { ReactNode } from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

interface ButtonProps {
  click?: () => void;
  children: ReactNode;
  color: string;
  bgColor: string;
  link?: string;
}

export function Button({
  children,
  click,
  color,
  bgColor,
  link
}: ButtonProps) {
  return(
    <>
      {link ? (
        <Link
          to={link}
          onClick={click ? click : () => {}}
          className={styles.button}
          style={{
            background: bgColor,
            color: color
          }}
        >
          {children}
        </Link>
      ) : (
        <button
          type="button"
          onClick={click}
          className={styles.button}
          style={{
            background: bgColor,
            color: color
          }}
        >
          {children}
        </button>
      )}
      
    </>
  );
}
