import React, { useEffect, useRef } from 'react';
import { ANIMATION_DELAYS } from '../../constants';

interface MonsterPanelProps {
  passwordRevealed: boolean;
  shaking: boolean;
}

const MonsterPanel: React.FC<MonsterPanelProps> = ({ passwordRevealed, shaking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const monstersRef = useRef<(HTMLDivElement | null)[]>([]);

  // Eye and Body tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (passwordRevealed || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;

      // Move Monsters
      const speeds = [0.001, 0.002, 0.003, 0.004]; // Different speeds for each monster

      monstersRef.current.forEach((monster, index) => {
        if (!monster) return;

        const speed = speeds[index] || 0.05;

        // Calculate move based on cursor position relative to container center
        const moveX = (e.clientX - containerCenterX) * speed;
        const moveY = (e.clientY - containerCenterY) * speed;

        // Get rotation from CSS variable or class if possible, but for now hardcode based on known styles
        // Purple monster has -12deg rotation
        let rotation = '0deg';
        if (monster.classList.contains('m-purple')) {
          rotation = '-12deg';
        }

        monster.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotation})`;
      });

      // Move Eyes
      const eyes = containerRef.current.querySelectorAll('.eye');
      eyes.forEach((eye) => {
        const pupil = eye.querySelector('.pupil') as HTMLElement;
        if (!pupil) return;

        const rect = eye.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const radian = Math.atan2(e.clientY - y, e.clientX - x);
        const radius = rect.width * 0.25;
        const moveX = Math.cos(radian) * radius;
        const moveY = Math.sin(radian) * radius;

        pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Reset positions if password is revealed
    if (passwordRevealed && containerRef.current) {
      const pupils = containerRef.current.querySelectorAll('.pupil');
      pupils.forEach(p => {
        (p as HTMLElement).style.transform = 'translate(-50%, -50%)';
      });

      monstersRef.current.forEach((monster) => {
        if (monster) {
          let rotation = '0deg';
          if (monster.classList.contains('m-purple')) {
            rotation = '-12deg';
          }
          monster.style.transform = `translate(0, 0) rotate(${rotation})`;
        }
      });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [passwordRevealed]);

  // Shaking effect
  useEffect(() => {
    if (shaking) {
      monstersRef.current.forEach((monster, i) => {
        if (monster) {
          monster.classList.remove('shaking');
          // Trigger reflow
          void monster.offsetWidth;
          setTimeout(() => {
            monster.classList.add('shaking');
          }, i * ANIMATION_DELAYS.MONSTER_SHAKE_STAGGER_MS);
        }
      });
    }
  }, [shaking]);

  // Helper to collect monster refs
  const setMonsterRef = (el: HTMLDivElement | null, index: number) => {
    monstersRef.current[index] = el;
  };

  return (
    <div
      ref={containerRef}
      className={`hidden md:block w-5/12 relative bg-[#EEF2FF] illustration-area border-r-2 border-gray-100 ${passwordRevealed ? 'password-revealed' : ''} overflow-hidden`}
    >
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="text-[600px] rotate-90 font-bold text-black/[0.02] select-none leading-none tracking-tighter transform">
          VN
        </span>
      </div>
      <div className="monster-wrapper">
        {/* Black Monster */}
        <div ref={el => setMonsterRef(el, 0)} className="monster m-black animate-spring js-monster">
          <div className="eye eye-l"><div className="pupil"></div><div className="eyelid"></div></div>
          <div className="eye eye-r"><div className="pupil"></div><div className="eyelid"></div></div>
        </div>
        {/* Purple Monster */}
        <div ref={el => setMonsterRef(el, 1)} className="monster m-purple animate-spring js-monster">
          <div className="eye eye-l"><div className="pupil"></div><div className="eyelid"></div></div>
          <div className="eye eye-r"><div className="pupil"></div><div className="eyelid"></div></div>
          <div className="mouth"></div>
        </div>
        {/* Yellow Monster */}
        <div ref={el => setMonsterRef(el, 2)} className="monster m-yellow animate-spring js-monster">
          <div className="eye eye-l"><div className="pupil"></div><div className="eyelid"></div></div>
          <div className="eye eye-r"><div className="pupil"></div><div className="eyelid"></div></div>
          <div className="mouth"></div>
        </div>
        {/* Orange Monster */}
        <div ref={el => setMonsterRef(el, 3)} className="monster m-orange animate-spring js-monster">
          <div className="eye eye-l"><div className="pupil"></div><div className="eyelid"></div></div>
          <div className="eye eye-r"><div className="pupil"></div><div className="eyelid"></div></div>
          <div className="mouth"></div>
        </div>
      </div>
    </div>
  );
};

export default MonsterPanel;