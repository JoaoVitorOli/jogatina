import { useContext } from "react";

import { AuthenticationContext } from "../../context/AuthenticationContext";
import { Button } from "../button";

import styles from "./styles.module.scss";

interface MenuProps {
  isMenuOpen: boolean;
  setMenu: () => void;
}

export function Menu({ isMenuOpen, setMenu }: MenuProps) {
  const {
    user,
    signInWithGoogle,
    handleLogOut
  } = useContext(AuthenticationContext);

  return (
    <>
      {isMenuOpen && (
        <>
          <div className={styles.container}>
            <div className={styles.content}>
              {Object.keys(user).length > 0 && (
                <div className={styles.logged}>
                  <img src={user.avatar} alt="avatar" />
                  <Button 
                    link="/review/new"
                    color="black"
                    bgColor="rgb(231, 231, 231)"
                    click={setMenu}
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
                <div className={styles.divLoginGithub}>
                  <button
                    onClick={signInWithGoogle}
                  >
                    login com Google
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}