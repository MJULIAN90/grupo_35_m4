// formulario : email y password

import { useState, type ChangeEvent, type FormEvent } from "react";

interface LoginFormState {
  email: string;
  password: string;
}

const INITIAL_STATE = {
  email: "",
  password: "",
};

type FieldErrors = Partial<Record<keyof LoginFormState, string>>;

const Form = () => {
  const [form, setForm] = useState<LoginFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmtting, setIsSubmtting] = useState(false);
  const [submitErrorm, setSubmitError] = useState("");
  const [sucessSubmit, setSuccessSubmit] = useState(false);

  const simulateSendForm = () => {
    setTimeout(() => {
      alert("se envio el formulario");
      setForm(INITIAL_STATE);
    }, 2000);
  };

  const validateError = (form: LoginFormState) => {
    const err: FieldErrors = {};

    if (!form.email.includes("@") || !form.email.includes(".")) {
      err.email = "ingrese un email valido";
    }

    if (!form.password || form.password.length < 6) {
      err.password = "Ingrese una contrasena de 6 caracteres";
    }

    return err;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessSubmit(false);

    const validateErrorData = validateError(form);
    setErrors(validateErrorData);

    if (Object.keys(validateErrorData).length > 0) return;
    setIsSubmtting(true);

    try {
      // fetch al backend
      simulateSendForm();
      setSuccessSubmit(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Error inesperado",
      );
    } finally {
      setIsSubmtting(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <h1>Formulario</h1>

      <form onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Ingrese un email valido"
            required

            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />

          {errors.email && <>{errors.email}</>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Ingrese una password segura"
            required

            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && <>{errors.password}</>}
        </div>

        {isSubmtting && <h2>Se esta enviando el formulario </h2>}
        {submitErrorm && <h2> {submitErrorm} </h2>}
        {sucessSubmit && <h2>Se envio correctamente el formulario </h2>}
        <button type="submit" disabled={isSubmtting}>
          Enviar Formulario
        </button>
      </form>
    </>
  );
};

export default Form;
