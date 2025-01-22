"use client";

import { usePrivy } from "@privy-io/react-auth";

function AuthButton() {
  const { ready, authenticated, login, logout } = usePrivy();

  return (
    <div>
      {authenticated && ready ? (
        <button
          type="button"
          onClick={logout}
          className="bg-primary text-background font-bold py-2 px-4 rounded-lg"
        >
          Disconnect
        </button>
      ) : (
        <button
          type="button"
          onClick={login}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
      >
        Connect Wallet
        </button>
      )}
    </div>
  );
}

export default AuthButton;