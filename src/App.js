import "./styles/App.css";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";
import { useEffect, useState } from "react";
import SignUpForm from "./components/SignUpForm";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      console.log(authUser);
      if (authUser) {
        setUser(authUser);
      }
    });
  }, []);

  function handleGoogleLogin() {
    signInWithPopup(auth, provider).catch((err) => {
      alert(err);
    });
  }

  function handleLogout() {
    signOut(auth).then(() => {
      setUser(null);
    });
  }

  return (
    <div className="app">
      <h1>Hello React</h1>
      <button onClick={handleGoogleLogin}> Sign in with Google</button>
      <button onClick={handleLogout}> Logout</button>
      {user && <h2>{user.displayName}</h2>}
      {user && <h2>{user.email}</h2>}

      {!user && <SignUpForm />}
    </div>
  );
}

export default App;
