// src/pages/ProfileSetup.tsx

import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";               // ← db をインポート
import { doc, setDoc } from "firebase/firestore";      // ← Firestore 操作用

import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const save = async () => {
    if (!user) return;
    // users コレクションにドキュメントを作成
    await setDoc(doc(db, "users", user.uid), {
      name,
      photoURL: user.photoURL ?? "",
    });
    navigate("/"); // 完了したら Home へ
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-xl">ニックネームを教えてね</h2>
      <input
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={save}
      >
        決定！
      </button>
    </div>
  );
}
