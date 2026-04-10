import { useState } from 'react';
import { sleep, validate } from './utils/index.js';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors(null);

    try {
      const validationErrors = validate({ name, email, message });
      if (Object.keys(validationErrors).length !== 0) {
        setErrors(validationErrors);
        return;
      }
      await sleep(1000);

      setName('');
      setEmail('');
      setMessage('');
      alert('Message sent successfully!');
    } catch (err) {
      setErrors({ general: err.message || 'Something went wrong.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 p-8 font-sans">
      <div className="mx-auto max-w-xl space-y-6 rounded-lg bg-gray-950 p-6 shadow">
        <h2 className="text-center text-2xl font-bold text-gray-200">
          Contact Us
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-200"
              htmlFor="name"
            >
              Name
            </label>
            <input
              name="name"
              id="name"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="Leia Organa"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors?.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              name="email"
              id="email"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="leia@rebellion.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors?.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="Tell us how we can help..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors?.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          {errors?.general && (
            <p className="text-sm text-red-500">{errors.general}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 ${
              isSubmitting ? 'cursor-not-allowed opacity-70' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </main>
  );
}
