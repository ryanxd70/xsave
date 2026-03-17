import React from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-none bg-white dark:bg-gray-800">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 dark:text-gray-100 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDownIcon className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-5 pt-0 text-base text-gray-900 dark:text-gray-300">
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;