import { useState, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TEST_USERNAME, TEST_PASSWORD } from "../constants/credentials";
import { UseLoginProps } from "../types/LoginTypes";

export const useLogin = (): UseLoginProps => {
  const [showCredentialFields, setShowCredentialFields] =
    useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

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

  const alertComponent = (
    title: string,
    message: string,
    btnText: string,
    btnFunc: () => void
  ) => {
    return Alert.alert(title, message, [{ text: btnText, onPress: btnFunc }]);
  };

  const showSuccessAlert = () => {
    Alert.alert("You are logged in", "You can now check your transactions", [
      {
        text: "Back",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "Proceed",
        onPress: () => navigation.navigate("TransactionsHistory" as never),
      },
    ]);
  };

  const handleBiometricAuth = async () => {
    if (!isBiometricSupported) {
      return alertComponent(
        "Please enter your password",
        "Biometric not supported",
        "OK",
        () => fallBackToDefaultLogin()
      );
    }

    // Check if biometrics are supported and which ones
    if (isBiometricSupported) {
      const supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      console.log("Supported biometrics:", supportedBiometrics);
    }

    // Check if the user has saved biometrics
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return alertComponent(
        "Biometric record not found",
        "Please login with your password",
        "OK",
        () => fallBackToDefaultLogin()
      );
    }

    // Authenticate with biometrics
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Logged In",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    if (biometricAuth) {
      showSuccessAlert();
    }
  };

  const handleLogin = (): void => {
    if (username === TEST_USERNAME && password === TEST_PASSWORD) {
      setErrorMessage("");
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

  const getBiometricIconName = (): string => {
    return Platform.OS === "ios" ? "face-recognition" : "fingerprint";
  };

  return {
    isBiometricSupported,
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
    getBiometricIconName,
  };
};
