// pages/index.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("ユーザー名とパスワードを入力してください");
      return;
    }

    setIsLoading(true);
    setMessage("ログイン処理中...");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.message === "Login successful") {
      setMessage("ログイン成功、ダッシュボードに移動中...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      setMessage(data.message || data.error || "ログイン失敗");
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!username || !password) {
      setMessage("ユーザー名とパスワードを入力してください");
      return;
    }

    setIsLoading(true);
    setMessage("サインアップ処理中...");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setMessage(data.message || data.error || "サインアップ失敗");
    setIsLoading(false);
  };

  return (
    <div>
      <h1>ログイン / サインアップ</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="ユーザー名を入力"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワードを入力"
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleLogin} disabled={isLoading}>
          ログイン
        </button>
        <button onClick={handleSignup} disabled={isLoading}>
          サインアップ
        </button>
      </div>

      {message && <p>{message}</p>}

      {isLoading && (
        <div className={styles.loaderWrapper}>
          <div className={styles.loader}>
            <div className={styles.loadingBar}></div>
            <div className={styles.loadingBar}></div>
            <div className={styles.loadingBar}></div>
            <div className={styles.loadingBar}></div>
          </div>
        </div>
      )}
    </div>
  );
}
