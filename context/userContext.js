import React, { createContext } from 'react';
import { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const email = user.email;
        console.log({ email });
      } else {
        console.log('error logging in');
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
