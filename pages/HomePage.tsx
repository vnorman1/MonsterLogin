import React from 'react';
import { Link } from 'react-router-dom';
import { STYLES } from '../constants';

const HomePage: React.FC = () => {
  return (
    <div className={`h-screen w-full flex flex-col items-center justify-center p-6 ${STYLES.FONT_FAMILY}`}>
      <h1 className="text-4xl font-bold mb-6">Welcome Home</h1>
      <Link 
        to="/login" 
        className="bg-black text-white px-6 py-3 font-bold rounded-sm hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none border-2 border-black"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default HomePage;