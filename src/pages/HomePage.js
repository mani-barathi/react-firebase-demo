import React from "react";

function HomePage({ user }) {
  return (
    <div className="app">
      <h1>HomePage</h1>

      {user && <h2>{user.displayName}</h2>}
      {user && <h2>{user.email}</h2>}
    </div>
  );
}

export default HomePage;
