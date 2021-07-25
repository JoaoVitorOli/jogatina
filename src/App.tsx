import { BrowserRouter } from "react-router-dom";

import { Header } from "./components/header";

import { AuthenticationProvider } from "./context/AuthenticationContext";

import { Routes } from "./routes";

import styles from "./styles/app.module.scss";

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <Header />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <Routes />
          </div>
        </div>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
