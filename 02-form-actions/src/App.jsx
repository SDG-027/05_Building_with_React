import { sleep, validate } from './utils/index.js';
// NEU: useActionState kommt aus React 19 — ersetzt hier useState + handleSubmit
import { useActionState } from 'react';

// ✦ NEU: Die Submit-Logik lebt jetzt *außerhalb* der Komponente, als eigenständige Funktion.
// Vorher: handleSubmit war eine Funktion innerhalb von App(), hatte Zugriff auf State-Setter.
// Jetzt: action bekommt alles was sie braucht als Parameter übergeben.
//
// Parameter:
//   prevState  → der State-Wert vom letzten Aufruf
//   formData   → ein FormData-Objekt, das der Browser automatisch aus der <form> baut
async function action(prevState, formData) {
  // Object.fromEntries() liest alle name/value-Paare aus dem Formular aus —
  const data = Object.fromEntries(formData);

  const validationErrors = validate(data);
  if (Object.keys(validationErrors).length !== 0) {
    // Bei Fehlern: neuen State zurückgeben.
    // React übergibt diesen Rückgabewert als nächstes 'state' an die Komponente.
    // 'input' speichert die eingegebenen Werte, damit die Felder nicht geleert werden.
    return {
      input: data,
      errors: validationErrors,
    };
  }
  await sleep(1000); // simuliert fetch()

  // Bei Erfolg: State signalisiert success.
  // Wenn wir keinen input oder errors zurückgeben, bleiben diese Elemente leer
  return {
    success: true,
  };
}

export default function App() {
  // ✦ NEU: useActionState ersetzt mehrere useState-Aufrufe auf einmal.
  //   state     → das aktuelle Ergebnis der action-Funktion (oder der Initialwert)
  //   formAction → wird direkt an action={} der <form> übergeben
  //   isPending  → true solange die action noch läuft (ersetzt isSubmitting)
  const [state, formAction, isPending] = useActionState(action, {
    // Initialwert — wird als 'state' verwendet bevor das Formular zum ersten Mal abgeschickt wird.
    // 'input' speichert die letzten Eingaben (für den Fehlerfall, damit sie erhalten bleiben).
    input: {
      name: '',
      email: '',
      message: '',
    },
    errors: {
      name: '',
      email: '',
      message: '',
    },
    success: null,
  });

  return (
    <main className="min-h-screen bg-gray-900 p-8 font-sans">
      <div className="mx-auto max-w-xl space-y-6 rounded-lg bg-gray-950 p-6 shadow">
        <h2 className="text-center text-2xl font-bold text-gray-200">
          Contact Us
        </h2>

        {/*
          ✦ NEU: action={formAction} statt onSubmit={handleSubmit}
        */}
        <form className="space-y-4" action={formAction}>
          <div>
            <label
              className="block text-sm font-medium text-gray-200"
              htmlFor="name"
            >
              Name
            </label>
            {/*
              ✦ UNTERSCHIED: defaultValue statt value + onChange
              - Vorher (kontrolliert): value={name} onChange={(e) => setName(e.target.value)}
              - Jetzt (unkontrolliert): defaultValue={state?.input?.name}
              Der Input verwaltet seinen Wert selbst — React liest ihn nur über FormData aus.
              defaultValue setzt den Startwert (wichtig: zeigt die alten Eingaben bei Fehlern).
            */}
            <input
              name="name"
              id="name"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="Leia Organa"
              defaultValue={state?.input?.name}
            />
            {/* Fehlermeldung kommt jetzt aus state.errors statt aus einem eigenen errors-State */}
            {state?.errors?.name && (
              <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
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
              defaultValue={state?.input?.email}
            />
            {state?.errors?.email && (
              <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
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
              defaultValue={state?.input?.message}
            />
            {state?.errors?.message && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.message}
              </p>
            )}
          </div>

          {/* Beispiel für Erfolgsnachricht*/}
          {state?.success && (
            <p className="text-sm text-green-500">Thanks for your Message!</p>
          )}

          {/* isPending kommt direkt aus useActionState — kein eigenes isSubmitting-State nötig */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 ${
              isPending ? 'cursor-not-allowed opacity-70' : ''
            }`}
          >
            {isPending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </main>
  );
}
