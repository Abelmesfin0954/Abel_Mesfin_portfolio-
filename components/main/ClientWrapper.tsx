'use client';

import StarsCanvas from './StarBackground';
import Navbar from './Navbar';
import Footer from './Footer';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <StarsCanvas />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default ClientWrapper;
