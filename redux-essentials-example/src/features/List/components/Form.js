import { useForm, FormProvider } from "react-hook-form";

function Form({ onSubmit, children,className, ...rest }) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;