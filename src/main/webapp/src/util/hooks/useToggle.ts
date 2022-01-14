import { useCallback, useState } from "react";

/**
 * Takes a parameter with value true or false and toggles that value to opposite.
 * @param initialState is the boolean, with default "false" value
 * @returns state value and a toggler function
 */
const useToggle = (initialState: boolean = false): [boolean, any] => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback((): void => setState((state) => !state), []);

  return [state, toggle];
};

export default useToggle;
