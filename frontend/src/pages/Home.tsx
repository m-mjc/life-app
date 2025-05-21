// frontend/src/pages/Home.tsx
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user] = useAuthState(auth);
  const nav = useNavigate();

  // ログインしていない場合は /login へリダイレクト
  React.useEffect(() => {
    if (!user) {
      nav("/login");
    }
  }, [user]);

  if (!user) {
    return <div>ログイン中…</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">ようこそ、{user.displayName || "ゲスト"}さん！</h1>
      <p>ここがホーム画面です。</p>
    </div>
  );
}
