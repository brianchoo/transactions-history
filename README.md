## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed on your system.
- [Android Studio](https://developer.android.com/studio) for Android emulator setup.
- [Expo Go](https://expo.dev/client) app on your mobile device (iOS/Android).

### Installation

1. **Install Node.js**  
   Make sure Node.js is installed. You can download it [here](https://nodejs.org/).

2. **Clone the repository**

3. **Install project dependencies**

   ```bash
   npm install
   ```

4. **Start the project**

   ```bash
   npm start
   ```

5. **Switch to Expo mode**  
   After starting the project, press `s` in the terminal to switch to Expo mode.

---

## Running the App

### Running on a physical device (using Expo Go)

1. Download **Expo Go** from the [App Store](https://apps.apple.com/app/expo-go/id982107779) (iOS) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android).
2. Open **Expo Go** and scan the QR code displayed in your terminal after running `npm start`.
3. The app will load and run locally on your device.

### Running on an Android emulator

1. **Install Android Studio** if you haven't already.  
   Download it [here](https://developer.android.com/studio).

2. **Set up a virtual device**

   - Open Android Studio.
   - Navigate to **Virtual Device Manager**.
   - Create and select a device to emulate.

3. **Configure Biometric Authentication**

   - Open the settings on the emulated device.
   - Create a **PIN** and set up a **Fingerprint** under security settings for biometric authentication.

4. **Run the app on the emulator**
   - After running `npm start`, press `a` in the terminal to open the app in the Android emulator.

---

## Notes

- Ensure your system and mobile device are on the same network when using Expo Go.

---
