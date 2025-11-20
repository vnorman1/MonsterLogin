import React, { useState } from 'react';
import MonsterPanel from '../components/login/MonsterPanel';
import LoginForm from '../components/login/LoginForm';
import { STYLES } from '../constants';

const LoginPage: React.FC = () => {
  const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showMonsters, setShowMonsters] = useState(true);

  const handleTriggerShake = () => {
    setIsShaking(true);
    // Reset state so it can be triggered again later
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <div className={`h-screen w-full flex items-center justify-center p-4 md:p-6 ${STYLES.FONT_FAMILY} relative`}>

      {/* Monster Toggle Switch */}
      <div id='monster-toggle' className="hidden md:flex absolute top-6 right-6 z-50 items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-sm shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider select-none">Szörnyek</span>
        <button
          onClick={() => setShowMonsters(!showMonsters)}
          className={`w-12 h-6 rounded-sm p-1 transition-colors duration-300 ease-in-out focus:outline-none ${showMonsters ? 'bg-black' : 'bg-gray-200'}`}
          aria-label="Toggle Monsters"
        >
          <div className={`w-4 h-4 bg-white rounded-sm shadow-sm transform transition-transform duration-300 ease-in-out ${showMonsters ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
      </div>

      <div className={`bg-white w-full ${showMonsters ? 'max-w-[1000px]' : 'max-w-[500px]'} h-auto md:h-[620px] flex flex-col md:flex-row rounded-xl overflow-hidden opacity-0 animate-card-enter ${STYLES.SHADOW_CLEAN} transition-all duration-500 ease-in-out`}>

        {showMonsters && (
          <MonsterPanel
            passwordRevealed={isPasswordRevealed}
            shaking={isShaking}
          />
        )}

        <LoginForm
          onPasswordToggle={setIsPasswordRevealed}
          isPasswordRevealed={isPasswordRevealed}
          onTriggerShake={handleTriggerShake}
          isFullWidth={!showMonsters}
        />

      </div>
    </div>
  );
};

export default LoginPage;