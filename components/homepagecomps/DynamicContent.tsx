import React from 'react';

const DynamicContent = () => {
  return (
    <div className="h-full w-full bg-gray-100 dark:bg-zinc-900 p-4 rounded-lg shadow-md transition-colors duration-300">
      <h2 className="text-lg text-gray-800 dark:text-white">Dynamic Content</h2>
      <p className="text-gray-700 dark:text-gray-300">
        This is a placeholder for dynamic content. You can replace this text
        with any content that changes based on user interaction or other
        factors.
      </p>
    </div>
  );
};

export default DynamicContent;
