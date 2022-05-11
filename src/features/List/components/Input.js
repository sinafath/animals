import { useFormContext } from "react-hook-form";

function Input({ title, type, classNames, ...rest }) {
  const { register } = useFormContext();
  return (
    <input
      type={type || "text"}
      {...register(title)}
      className={classNames}
      {...rest}
    />
  );
}

export default Input;
