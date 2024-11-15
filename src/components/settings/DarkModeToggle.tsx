import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setTheme } from '../../store/slices/settingsSlice';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function DarkModeToggle() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.settings);
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {t('Dark Mode')}
      </span>
      <button
        onClick={toggleTheme}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isDark ? 'bg-blue-600' : 'bg-gray-200'
        }`}
        role="switch"
        aria-checked={isDark}
      >
        <span className="sr-only">{t('Toggle dark mode')}</span>
        <span
          className={`${
            isDark ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        >
          {isDark ? (
            <Moon className="h-3 w-3 text-blue-600" />
          ) : (
            <Sun className="h-3 w-3 text-gray-400" />
          )}
        </span>
      </button>
    </div>
  );
}