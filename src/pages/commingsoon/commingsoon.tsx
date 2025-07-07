import React from "react";

const ComingSoon: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex flex-col items-center p-8 rounded-2xl shadow-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 max-w-lg w-full">
        <img
          src="/wingman-creative-logo.svg"
          alt="Wingman Creative Logo"
          className="w-24 h-24 mb-6 animate-bounce drop-shadow-lg"
        />
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2 text-center">
          Coming Soon
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-center">
          This feature will be available in the next staging release.<br />
          <span className="inline-block mt-2 px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full font-semibold text-base shadow-sm">
            Version 0.2 – Stay tuned!
          </span>
        </p>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400 dark:text-gray-500">Thank you for your patience!</span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
