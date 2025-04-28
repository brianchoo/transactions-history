export interface UseLoginProps {
  isBiometricSupported: boolean;
  showCredentialFields: boolean;
  username: string;
  password: string;
  errorMessage: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleBiometricAuth: () => Promise<void>;
  handleLogin: () => void;
  toggleLoginFields: () => void;
  closeLoginField: () => void;
  resetFields: () => void;
}

export interface LoginButtonsProps {
  toggleLoginFields: () => void;
  handleBiometricAuth: () => void;
}

export interface LoginFormProps {
  username: string;
  password: string;
  errorMessage: string;
  setUsername: (text: string) => void;
  setPassword: (text: string) => void;
  handleLogin: () => void;
  closeLoginField: () => void;
}
