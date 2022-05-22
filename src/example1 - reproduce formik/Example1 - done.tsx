import React, { useState } from "react";

type OnSubmit = (_: React.SyntheticEvent) => void;
type OnChange = (_: React.ChangeEvent<HTMLInputElement>) => void;
interface UseFormProps<TState> {
  initState: TState;
  onSubmit: (_: TState) => void;
}
type UseForm = <TState>(_: UseFormProps<TState>) => any;

const useForm: UseForm = ({ initState, onSubmit }) => {
  const [formState, setFormState] = useState({ ...initState });

  const onChange: OnChange = ({ currentTarget: { id, value } }) => {
    setFormState({ ...formState, [id]: value });
  };

  const onSubmitHandler: OnSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(formState);
  };

  return {
    values: { ...initState, ...formState },
    onChange,
    onSubmit: onSubmitHandler,
  };
};

export default () => {
  const form = useForm({
    initState: { name: "Peter", email: "peter@mail.com" },
    onSubmit: (result) => console.log("submit:", result.notexist),
  });

  return (
    <form onSubmit={form.onSubmit}>
      <br />
      <input
        id="name"
        type="text"
        onChange={form.onChange}
        value={form.values.name}
      />
      <br />
      <input
        id="email"
        type="text"
        onChange={form.onChange}
        value={form.values.email}
      />
      <br />
      <button>Submit</button>
    </form>
  );
};
