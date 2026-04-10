import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback, Instructions } from '../components';
import { registerNewsletter } from '../api';
import { toast } from 'react-toastify';
import SubmitBtn from '../components/SubmitBtn';

async function registerAction(formData) {
  const email = formData.get('email');
  const result = await registerNewsletter(email);
  toast.success(result);
}

const Register = () => {
  return (
    <div className="flex flex-col items-center">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <form action={registerAction}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4">
            <legend className="fieldset-legend">
              Register to our newsletter
            </legend>
            <label className="label">Email</label>
            <input className="input w-full" name="email" placeholder="Email" />
            <SubmitBtn>Register!</SubmitBtn>
          </fieldset>
        </form>
      </ErrorBoundary>
      <Instructions path="/register.md" />
    </div>
  );
};

export default Register;
