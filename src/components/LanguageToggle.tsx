import React from 'react';

// Since we're only using German now, this component is simplified to just show the current language
export default function LanguageToggle() {
  return (
    <div className="flex items-center gap-2">
      <button
        className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-white border border-gray-300 shadow-sm"
      >
        <span className="font-bold">DE</span>
      </button>
    </div>
  );
}