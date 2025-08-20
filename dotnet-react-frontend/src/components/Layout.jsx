import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import NotificationBar from "./NotificationBar";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      <NotificationBar />

      <main className="main-content">
        {children}
      </main>

      <ScrollToTopButton />
      <Footer />
    </>
  );
};

export default Layout;
