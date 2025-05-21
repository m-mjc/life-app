// src/pages/Login.tsx
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithRedirect,
  signInAnonymously,
} from "firebase/auth";

export default function Login() {
  const googleSignIn = () => {
    signInWithRedirect(auth, new GoogleAuthProvider());
  };

  const appleSignIn = () => {
    signInWithRedirect(auth, new OAuthProvider("apple.com"));
  };

  const guestSignIn = () => {
    signInAnonymously(auth).catch((err) =>
      alert("ゲストログインに失敗しました: " + err.message)
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">ようこそ！</h1>

      <button
        className="px-4 py-2 rounded bg-white shadow flex items-center gap-2"
        onClick={googleSignIn}
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          width={24}
          alt="Googleロゴ"
        />
        Google でログイン
      </button>

      <button
        className="px-4 py-2 rounded bg-black text-white flex items-center gap-2"
        onClick={appleSignIn}
      >
        <img src="/apple.svg" width={24} alt="Appleロゴ" />
        Apple でログイン
      </button>

      <button
        className="underline text-blue-600"
        onClick={guestSignIn}
      >
        ゲストで試す
      </button>
    </div>
  );
}
