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
