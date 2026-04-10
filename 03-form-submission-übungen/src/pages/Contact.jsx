import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback, Instructions } from '../components';
import { sendContactForm } from '../api';
import { toast } from 'react-toastify';
import SubmitBtn from '../components/SubmitBtn';
import { useActionState } from 'react';

async function contactAction(prevState, formData) {
  const data = Object.fromEntries(formData);
  try {
    const result = await sendContactForm(data);
    toast.success(result);
    return {
      success: result,
    };
  } catch (error) {
    return {
      input: data,
      error: error.message,
    };
  }
}

const Contact = () => {
  const [state, formAction] = useActionState(contactAction, {});

  return (
    <div className="flex flex-col items-center">
      {/* <ErrorBoundary FallbackComponent={ErrorFallback}>*/}
      <form action={formAction}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4">
          <legend className="fieldset-legend">Contact Us</legend>
          <label className="label">First Name</label>
          <input
            className="input w-full"
            name="firstName"
            placeholder="First Name"
            defaultValue={state.input?.firstName}
          />
          <label className="label">Last Name</label>
          <input
            className="input w-full"
            name="lastName"
            placeholder="Last Name"
            defaultValue={state.input?.lastName}
          />
          <label className="label">Email</label>
          <input
            className="input w-full"
            name="email"
            placeholder="Email"
            defaultValue={state.input?.email}
          />
          <label className="label">Message</label>
          <textarea
            className="textarea w-full"
            name="message"
            placeholder="Your message"
            rows={4}
            defaultValue={state.input?.message}
          />
          <SubmitBtn>Send</SubmitBtn>
        </fieldset>
        {state.error && <p>{state.error}</p>}
      </form>
      {/* </ErrorBoundary>*/}
      <Instructions path="/contact.md" />
    </div>
  );
};

export default Contact;
