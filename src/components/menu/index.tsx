import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthenticationContext } from "../../context/AuthentionContext";

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
                  <Link to="/review/new" onClick={setMenu}>
                    Fazer nova review
                  </Link>
                  <button onClick={handleLogOut}>logout</button>
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