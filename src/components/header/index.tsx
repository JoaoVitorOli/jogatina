import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";

import windowDimensions from "../../hooks/useWindowDimensions";

import { AuthenticationContext } from "../../context/AuthentionContext";

import { Menu } from "../menu";

import RammusImg from "../../assets/images/rammus.png";

import styles from "./styles.module.scss";

export function Header() {
  const {
    user,
    signInWithGoogle,
    handleLogOut
  } = useContext(AuthenticationContext);

  const { width } = windowDimensions();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function setMenuToFalse() {
    setIsMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/">
          Jogatina
          <img src={RammusImg} alt="rammus joinha" />
        </Link>

        {width <= 768 ? (
          <div className={styles.divHamMobile}>
            <Hamburger 
              toggle={setIsMenuOpen}
              toggled={isMenuOpen}
              size={28}
            />

            <Menu
              isMenuOpen={isMenuOpen}
              setMenu={setMenuToFalse}
            />
          </div>
        ) : (
          <>
            {Object.keys(user).length > 0 && (
              <div className={styles.logged}>
                <img src={user.avatar} alt="avatar" />
                <Link to="/review/new">
                  Fazer nova review
                </Link>
                <button onClick={handleLogOut}>logout</button>
              </div>
            )}

            {Object.keys(user).length === 0 && (
              <button
                onClick={signInWithGoogle}
                className={styles.buttonLoginGithub}
              >
                login com Google
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
}