import React, { createContext, useContext, useState } from "react";

type MaskedContextType = {
  masked: boolean;
  toggleMasked: () => void;
  setMasked: (value: boolean) => void;
};

export const MaskedContext = createContext<MaskedContextType>({
  masked: false,
  toggleMasked: () => {},
  setMasked: (value) => {},
});

const MaskedContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [masked, setMaskedState] = useState<boolean>(true);

  const toggleMasked = () => {
    setMaskedState((prev) => !prev);
  };

  const setMasked = (value: boolean) => {
    setMaskedState(value);
  };

  return (
    <MaskedContext.Provider value={{ masked, toggleMasked, setMasked }}>
      {children}
    </MaskedContext.Provider>
  );
};

export default MaskedContextProvider;
