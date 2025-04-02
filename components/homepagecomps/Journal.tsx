import { Separator } from '@/components/ui/separator';
import React from 'react';

const Journal = () => {
  return (
    <div className='h-full w-full bg-gray-100 dark:bg-zinc-900 p-2 transition-colors'>
      <div className="flex -mt-1 justify-between">
        <div className="text-md text-gray-800 dark:text-white ">Journal</div>
        <div className='text-gray-400 hover:cursor-pointer'>edit</div>
      </div>
      <Separator className="bg-gray-300 dark:bg-zinc-800" />
      <div
        className='mt-1 p-1 font-light rounded-2xl bg-white dark:bg-zinc-800 overflow-y-auto scrollable-left'
        style={{ maxHeight: '220px' }}
      >
        <div className='scrollable-right '>
          <p className="text-gray-800 dark:text-white"><strong>Date:</strong> October 1, 2023</p>
          <p className="text-gray-800 dark:text-white">Today was a productive day! I managed to complete my tasks and even had some time to relax. I went for a walk in the park and enjoyed the beautiful weather.</p>

          <p className="text-gray-800 dark:text-white"><strong>Date:</strong> October 2, 2023</p>
          <p className="text-gray-800 dark:text-white">Feeling a bit overwhelmed today. There's a lot on my plate, but I'm trying to take it one step at a time. I had a nice chat with a friend that helped lift my spirits.</p>

          <p className="text-gray-800 dark:text-white"><strong>Date:</strong> October 3, 2023</p>
          <p className="text-gray-800 dark:text-white">Had a great day! I started a new book and couldn't put it down. I also tried a new recipe for dinner, and it turned out delicious!</p>

          <p className="text-gray-800 dark:text-white"><strong>Date:</strong> October 4, 2023</p>
          <p className="text-gray-800 dark:text-white">Today was challenging. I faced some setbacks at work, but I'm learning to stay positive and focus on solutions rather than problems.</p>

          <p className="text-gray-800 dark:text-white"><strong>Date:</strong> October 5, 2023</p>
          <p className="text-gray-800 dark:text-white">Ended the week on a high note! I completed all my tasks and treated myself to a movie night. Looking forward to the weekend!</p>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track your thoughts and feelings in a private space. Your journal is just for you.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Write about your day, your emotions, or anything that&apos;s on your mind.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your entries are secure and only visible to you. Take time to reflect and grow.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Start your journey of self-discovery and emotional awareness today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Journal;
