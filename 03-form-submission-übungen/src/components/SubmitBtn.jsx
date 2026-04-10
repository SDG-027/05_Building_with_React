import { useFormStatus } from 'react-dom';

export default function SubmitBtn({ children }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="btn btn-neutral disabled:btn-ghost mt-4"
    >
      {pending ? 'Submitting...' : children}
    </button>
  );
}
