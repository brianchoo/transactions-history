import { Alert } from "react-native";

const showAlert = (
  title: string,
  message: string,
  btnText: string,
  btnFunc: () => void
) => {
  Alert.alert(title, message, [{ text: btnText, onPress: btnFunc }]);
};

const showSuccessAlert = (onCancel: () => void, onProceed: () => void) => {
  Alert.alert("You are logged in", "You can now check your transactions", [
    {
      text: "Back",
      onPress: onCancel,
    },
    {
      text: "Proceed",
      onPress: onProceed,
    },
  ]);
};

const showBiometricNotSupportedAlert = (onFallback: () => void) => {
  showAlert(
    "Please enter your password",
    "Biometric not supported",
    "OK",
    onFallback
  );
};

const showNoBiometricsAlert = (onFallback: () => void) => {
  showAlert(
    "Biometric record not found",
    "Please login with your password",
    "OK",
    onFallback
  );
};

export {
  showAlert,
  showSuccessAlert,
  showBiometricNotSupportedAlert,
  showNoBiometricsAlert,
};
