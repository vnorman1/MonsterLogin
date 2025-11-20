import React, { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { TEXT_CONTENT } from '../../constants';
import { getTimeBasedGreeting } from '../../utils/greetings';
import { useToast } from '../../contexts/ToastContext';

interface LoginFormProps {
  onPasswordToggle: (revealed: boolean) => void;
  isPasswordRevealed: boolean;
  onTriggerShake: () => void;
  isFullWidth?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onPasswordToggle,
  isPasswordRevealed,
  onTriggerShake,
  isFullWidth = false
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shakeInput, setShakeInput] = useState(false);
  const [success, setSuccess] = useState(false);
  const [greeting, setGreeting] = useState(getTimeBasedGreeting());

  const navigate = useNavigate();
  const { addToast } = useToast();

  // Update greeting every minute to keep it current
  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getTimeBasedGreeting());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setShakeInput(false);

    // Validation
    if (!email || !password) {
      setTimeout(() => setShakeInput(true), 10);
      onTriggerShake();
      return;
    }

    // Dummy Login Logic
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockUser = {
        id: '1',
        username: email.split('@')[0] || 'Admin',
        email: email,
        role: 'admin'
      };

      setSuccess(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'dummy-token');

      setTimeout(() => {
        navigate('/admin');
      }, 800);

    } catch (error) {
      addToast('Hiba történt a bejelentkezés során', 'error');
      setShakeInput(true);
      onTriggerShake();
    }
  };

  const togglePassword = () => {
    const newState = !isPasswordRevealed;
    onPasswordToggle(newState);
  };

  return (
    <div className={`w-full ${isFullWidth ? 'w-full' : 'md:w-7/12'} p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative transition-all duration-500 ease-in-out`}>
      <div className="max-w-sm mx-auto w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          {TEXT_CONTENT.LOGIN_TITLE}
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mb-10">
          {greeting}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>

          <>
            {/* Email Input */}
            <div className="space-y-1">
              <label htmlFor="emailInput" className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
                {TEXT_CONTENT.EMAIL_LABEL}
              </label>
              <input
                type="email"
                id="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={TEXT_CONTENT.EMAIL_PLACEHOLDER}
                className={`w-full px-4 py-3 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white sharp-input ${shakeInput && !email ? 'input-error-shake' : ''}`}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label htmlFor="passwordInput" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {TEXT_CONTENT.PASSWORD_LABEL}
                </label>
              </div>
              <div className="relative group">
                <input
                  type={isPasswordRevealed ? 'text' : 'password'}
                  id="passwordInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={TEXT_CONTENT.PASSWORD_PLACEHOLDER}
                  className={`w-full px-4 py-3 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white sharp-input pr-10 ${shakeInput && !password ? 'input-error-shake' : ''}`}
                />

                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black focus:outline-none transition-colors"
                >
                  {isPasswordRevealed ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </>

          {/* Footer / Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 gap-3 sm:gap-0">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 border-2 border-gray-300 rounded-sm text-black focus:ring-0 cursor-pointer transition-colors checked:bg-black checked:border-black"
              />
              <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                {TEXT_CONTENT.REMEMBER_ME} <span className="text-xs text-gray-500">{TEXT_CONTENT.REMEMBER_ME_DURATION}</span>
              </span>
            </label>
            <a href="#" className="text-sm font-bold text-black hover:underline decoration-2 underline-offset-2">
              {TEXT_CONTENT.FORGOT_PASSWORD}
            </a>
          </div>

          <div className="space-y-3 pt-4">
            <button
              type="submit"
              className="w-full text-white font-bold text-base sm:text-lg py-3.5 sharp-btn"
              style={{
                backgroundColor: success ? '#10B981' : 'black',
                borderColor: success ? '#10B981' : 'black'
              }}
            >
              {success ? TEXT_CONTENT.LOGIN_SUCCESS : TEXT_CONTENT.LOGIN_BUTTON}
            </button>
          </div>
        </form>

        <div className="text-center sm:pt-1 md:pt-4">
          <button className="cursor-pointer hover:underline decoration-2 underline-offset-2 text-xs text-gray-500">
            <Link to="/">{TEXT_CONTENT.BACK_TO_SITE}</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;