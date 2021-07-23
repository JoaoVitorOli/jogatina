import { memo } from "react";

import styles from "./styles.module.scss";

interface InfoProps {
  info: {
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
}

function GameInfo(info: InfoProps) {
  console.log("info")
  console.log(info.info)

  return(
    <div className={styles.showGameInfo}>
      <img src={info.info.cover.url} alt="Capa do jogo" />

      <div className={styles.gameDetails}>
        <h2>{info.info.name}</h2>

        <div className={styles.itemDisplayFlex}>
          {info.info.platforms !== undefined && (
            <div>
              <span>plataformas:</span>
              {typeof info.info.platforms !== "string" && (
                info.info.platforms.map((plat) => (
                  <p key={plat.id}>{plat.name}</p>
                ))
              )}
              
            </div>
          )}
        </div>

        <div className={styles.itemDisplayFlex}>
          <p>
            <span>Sumário:</span>
            {info.info.summary}
          </p>
        </div>

        {info.info.themes !== undefined && (
          info.info.themes === "Sem tema." ? (
            <div className={styles.itemDisplayFlex}>
              <span>Temas:</span>
              <div>
                <p>{info.info.themes}</p>
              </div>
            </div>
          ) : (
            <div className={styles.itemDisplayFlex}>  
              <span>Temas:</span>
              <div>
                {typeof info.info.themes !== "string" && (
                  info.info.themes.map((theme) => (
                    <p key={theme.id}>{theme.name}</p>
                  ))
                ) }
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default memo(GameInfo);
