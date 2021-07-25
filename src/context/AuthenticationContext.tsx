import { createContext, useState, ReactNode  } from "react";
import { useHistory } from "react-router-dom";

import { firebase, auth } from "../services/firebase";

interface AuthenticationProviderProps {
  children: ReactNode;
}

interface UserProps {
  id: string;
  name: string;
  avatar: string;
}

interface AuthenticationContextProps {
  user: UserProps;
  signInWithGoogle: () => Promise<void>;
  handleLogOut: () => void;
}

export const AuthenticationContext = createContext({} as AuthenticationContextProps);

export function AuthenticationProvider({ children }: AuthenticationProviderProps) {
  const [user, setUser] = useState<UserProps>(() => {
    const value = localStorage.getItem("user@jogatina");

    if (value) {
      return JSON.parse(value);
    }

    return {} as UserProps;
  });
  
  const history = useHistory();

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Github Account");
      }

      const resultFiltered = {
        id: uid,
        name: displayName,
        avatar: photoURL
      };

      setUser(resultFiltered);

      localStorage.setItem("user@jogatina", JSON.stringify(resultFiltered));
    }
  }

  function handleLogOut() {
    setUser({} as UserProps);
    localStorage.removeItem("user@jogatina");

    history.push("/");
  }

  return(
    <AuthenticationContext.Provider value={{
      user,
      signInWithGoogle,
      handleLogOut
    }}>
      {children}
    </AuthenticationContext.Provider>
  );
}