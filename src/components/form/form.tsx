import style from './form.module.css';

type TFormProps = {
  children?: React.ReactNode;
  onSubmit?: () => void;
};

export const Form = ({ children, onSubmit }: TFormProps): React.JSX.Element => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};
