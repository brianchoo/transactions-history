import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TEST_USERNAME, TEST_PASSWORD } from "../constants/credentials";
import { UseLoginProps } from "../types/LoginTypes";
import {
  showSuccessAlert,
  showBiometricNotSupportedAlert,
  showNoBiometricsAlert,
} from "../utils/alert";
import * as LocalAuthentication from "expo-local-authentication";

export const useLogin = (): UseLoginProps => {
  const [showCredentialFields, setShowCredentialFields] =
    useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricAuthenticated, setIsBiometricAuthenticated] =
    useState<boolean>(false);

  const navigation = useNavigation();

  // Check if device supports biometrics
  useEffect(() => {
    async function checkBiometricSupport() {
      const isBiometricsAvailable =
        await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(isBiometricsAvailable);
    }

    checkBiometricSupport();
  }, []);

  const fallBackToDefaultLogin = () => {
    setShowCredentialFields(true);
  };

  const handleBiometricAuth = async () => {
    if (!isBiometricSupported) {
      return showBiometricNotSupportedAlert(fallBackToDefaultLogin);
    }

    // Check if biometrics are supported and which ones
    if (isBiometricSupported) {
      const supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
    }

    // Check if the user has saved biometrics
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return showNoBiometricsAlert(fallBackToDefaultLogin);
    }

    // Authenticate with biometrics
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Logged In",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    if (biometricAuth) {
      setIsBiometricAuthenticated(true);
      showSuccessAlert(
        () => console.log("Cancel Pressed"),
        () => navigation.navigate("TransactionsHistory" as never)
      );
    }
  };

  const handleLogin = (): void => {
    if (username === TEST_USERNAME && password === TEST_PASSWORD) {
      resetFields();
      navigation.navigate("TransactionsHistory" as never);
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  const toggleLoginFields = (): void => {
    setShowCredentialFields(!showCredentialFields);
    setErrorMessage("");
  };

  const resetFields = (): void => {
    setShowCredentialFields(false);
    setUsername("");
    setPassword("");
    setErrorMessage("");
  };

  const closeLoginField = (): void => {
    resetFields();
  };

  return {
    isBiometricSupported,
    isBiometricAuthenticated,
    showCredentialFields,
    username,
    password,
    errorMessage,
    setUsername,
    setPassword,
    handleBiometricAuth,
    handleLogin,
    toggleLoginFields,
    closeLoginField,
    resetFields,
  };
};
