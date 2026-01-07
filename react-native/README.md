# NitroSense - React Native (Expo)

A medical wearable monitoring app built with React Native and Expo.

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (for testing)

### Installation

1. Navigate to the react-native folder:
   ```bash
   cd react-native
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Scan the QR code with Expo Go (Android) or Camera app (iOS)

## Demo Mode

To toggle between safe and high-risk states for demo purposes, edit \`constants/dummy-data.ts\`:

```ts
export const IS_HIGH_RISK = true  // Set to true for danger mode
```

## Features

- **Dashboard**: Real-time health metrics with visual indicators
- **3D Device Viewer**: Interactive 3D models of wearable devices (drag to rotate)
- **Trends**: Historical data visualization with explanations
- **Settings**: Customizable alerts and device preferences
- **Profile**: User stats and account management

## Tech Stack

- Expo SDK 50
- React Navigation (Bottom Tabs)
- expo-three + expo-gl (3D rendering)
- react-native-gesture-handler (Touch interactions)
- react-native-svg (Charts)
- TypeScript

## Building for Production

```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```
