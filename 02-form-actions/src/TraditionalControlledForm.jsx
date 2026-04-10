import { useState } from 'react';
import { sleep, validate } from './utils/index.js';

export default function App() {
  // --- Formularfelder als einzelne State-Variablen ---
  // Jedes Eingabefeld hat seinen eigenen State.
  // React hält diese Werte aktuell und zeigt sie im Input an ("kontrolliertes Formular").
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // --- UI-Zustand: Wird das Formular gerade abgeschickt? ---
  // Solange isSubmitting true ist, deaktivieren wir den Submit-Button.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Validierungsfehler ---
  // errors ist entweder null (keine Fehler) oder ein Objekt wie { name: "...", email: "..." }.
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    // Verhindert das Standard-Browserverhalten (Seite neu laden)
    e.preventDefault();

    // Ladestate aktivieren, alte Fehler zurücksetzen
    setIsSubmitting(true);
    setErrors(null);

    try {
      // validate() prüft alle Felder und gibt ein Objekt mit Fehlermeldungen zurück.
      // Wenn das Objekt leer ist, sind alle Felder gültig.
      const validationErrors = validate({ name, email, message });
      if (Object.keys(validationErrors).length !== 0) {
        // Fehler in den State schreiben → React rendert die Fehlermeldungen im JSX
        setErrors(validationErrors);
        return; // Abbruch: nicht weiter senden
      }

      // Simuliert eine Netzwerkanfrage (z. B. fetch an ein Backend)
      await sleep(1000);

      // Nach erfolgreichem Absenden: alle Felder zurücksetzen
      // Da die Inputs ihren Wert aus dem State lesen, werden sie damit geleert.
      setName('');
      setEmail('');
      setMessage('');
      alert('Message sent successfully!');
    } catch (err) {
      // Allgemeiner Fehler (z. B. Netzwerkproblem) → wird unter dem Formular angezeigt
      setErrors({ general: err.message || 'Something went wrong.' });
    } finally {
      // finally läuft immer – egal ob Fehler oder Erfolg.
      // Ladestate wieder deaktivieren.
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 p-8 font-sans">
      <div className="mx-auto max-w-xl space-y-6 rounded-lg bg-gray-950 p-6 shadow">
        <h2 className="text-center text-2xl font-bold text-gray-200">
          Contact Us
        </h2>

        {/* onSubmit zeigt auf unsere handleSubmit-Funktion */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* --- Feld: Name --- */}
          <div>
            <label
              className="block text-sm font-medium text-gray-200"
              htmlFor="name"
            >
              Name
            </label>
            {/*
              value={name}    → Input liest seinen Wert aus dem State (kontrolliert)
              onChange={...}  → Bei jeder Eingabe wird der State aktualisiert
              Dadurch sind Input und State immer synchron.
            */}
            <input
              name="name"
              id="name"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="Leia Organa"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* Fehleranzeige: wird nur gerendert, wenn errors.name existiert */}
            {errors?.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* --- Feld: Email --- */}
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

          {/* --- Feld: Message (Textarea) --- */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="message"
            >
              Message
            </label>
            {/* Textarea funktioniert genauso wie ein Input: value + onChange */}
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

          {/* Allgemeiner Fehler (kein feldbezogener Fehler, z. B. Serverfehler) */}
          {errors?.general && (
            <p className="text-sm text-red-500">{errors.general}</p>
          )}

          {/*
            disabled={isSubmitting} → Button nicht klickbar während des Absendens
            Der Klassen-String wechselt dynamisch: bei isSubmitting wird Opacity reduziert
          */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 ${
              isSubmitting ? 'cursor-not-allowed opacity-70' : ''
            }`}
          >
            {/* Ternärer Operator: zeigt je nach State einen anderen Text */}
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </main>
  );
}
