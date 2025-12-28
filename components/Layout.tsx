import React from "react";
import Header from "./Header";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-6 w-full max-w-5xl">
        {children}
      </main>
      <footer className="text-center py-6 text-sm opacity-70">© BTG Exchange</footer>
    </div>
  );
};

export default Layout;
