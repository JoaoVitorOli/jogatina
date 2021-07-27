import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";

import windowDimensions from "../../hooks/useWindowDimensions";

import { AuthenticationContext } from "../../context/AuthenticationContext";

import { Menu } from "../menu";
import { Button } from "../button";

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
                <Button 
                  link="/review/new"
                  color="black"
                  bgColor="rgb(231, 231, 231)"
                >
                  Fazer nova review
                </Button>
                <Button 
                  click={handleLogOut}
                  color="white"
                  bgColor="rgb(209, 64, 64)"
                >
                  logout
                </Button>
              </div>
            )}

            {Object.keys(user).length === 0 && (
              <Button
                click={signInWithGoogle}
                color="black"
                bgColor="rgb(231, 231, 231)"
              >
                login com Google
              </Button>
            )}
          </>
        )}
      </div>
    </header>
  );
}