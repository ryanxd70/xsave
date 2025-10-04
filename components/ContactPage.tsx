import React, { useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const ContactPageContent: React.FC = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const validate = useCallback(() => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = t('contact_form_error_name');
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = t('contact_form_error_email');
    if (!message.trim()) newErrors.message = t('contact_form_error_message');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, message, t]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('loading');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');

  }, [validate]);

  if (status === 'success') {
    return (
        <section id="contact" className="text-center max-w-3xl mx-auto animate-fade-in">
             <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 px-4 py-6 rounded-lg text-center">
                <CheckCircleIcon className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h2 className="text-2xl font-bold mb-2">{t('contact_form_success_message_title')}</h2>
                <p>{t('contact_form_success_message_body')}</p>
            </div>
        </section>
    )
  }

  return (
    <section id="contact" className="text-left max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
        {t('contact_us')}
      </h1>
      <p className="text-center text-base text-gray-900 dark:text-gray-300 mb-12">
        {t('contact_intro')}
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('contact_form_name_label')}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('contact_form_name_placeholder')}
            className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('contact_form_email_label')}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('contact_form_email_placeholder')}
            className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
           {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('contact_form_message_label')}
          </label>
          <textarea
            id="message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('contact_form_message_placeholder')}
            className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
           {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <div>
           <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('contact_form_submitting_button')}
                  </>
                ) : t('contact_form_submit_button')}
            </button>
        </div>
      </form>
    </section>
  );
};

export default ContactPageContent;