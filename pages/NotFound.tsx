import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

const NotFound: React.FC = () => {
  return (
    <>
      <Seo title="Page Not Found" description="The page you are looking for could not be found." />
      <section className="min-h-[60vh] flex items-center justify-center px-6 py-20 bg-white">
        <div className="text-center max-w-lg">
          <p className="text-[#b8860b] uppercase tracking-[0.25em] text-sm mb-4">404 Error</p>
          <h1 className="font-display text-4xl md:text-5xl mb-5 text-[#1f1f1f]">Page not found</h1>
          <p className="text-[#555] mb-8">
            The page may have been moved, deleted, or the URL may be incorrect.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-[#b8860b] text-white hover:bg-[#a77a09] transition-colors rounded-md shadow-soft"
          >
            Return Home
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFound;
