# Development Builds Setup Guide

This document explains how to build and run Patio using Expo development builds (required for expo-maps and other native features).

## Why Development Builds?

- **expo-maps** is an alpha library not available in Expo Go
- Native modules like maps, camera, and payments require custom native code
- Development builds give you full access to native APIs while keeping the Expo workflow

## Prerequisites

✅ Already Completed:
- expo-dev-client installed (v6.0.16)
- eas-cli installed globally (v16.6.2)
- Logged in as: kidohka
- eas.json created with build profiles
- app.json configured with expo-maps plugin

## Build Commands

### iOS Development Build (Simulator)

```bash
eas build --profile development --platform ios
```

**What this does:**
- Creates a development build for iOS Simulator
- Takes ~10-15 minutes
- No API keys needed (uses Apple Maps)
- Works on macOS with Xcode installed

**After build completes:**
1. Download from expo.dev dashboard or use CLI prompt
2. Drag .app file to iOS Simulator
3. Or use: `eas build:run -p ios`

### Android Development Build (Emulator/Device)

```bash
eas build --profile development --platform android
```

**What this does:**
- Creates APK for Android emulator or physical device
- Takes ~10-15 minutes
- Generates SHA-1 fingerprint for Google Maps setup
- Can run on any Android device/emulator

**After build completes:**
1. Download APK from expo.dev dashboard
2. Install on emulator: Drag APK to emulator window
3. Or install on device: `adb install path/to/app.apk`
4. Or use: `eas build:run -p android`

### Build Both Platforms

```bash
eas build --profile development --platform all
```

## Google Maps API Setup (Android Only)

**IMPORTANT**: You must complete at least one Android build first to get the SHA-1 fingerprint.

### Step 1: Get SHA-1 Fingerprint

After your first Android development build:

1. Go to https://expo.dev
2. Navigate to: Your Project → Credentials → Android
3. Find "Application Identifiers" section
4. Copy the **SHA-1 certificate fingerprint**

### Step 2: Create Google Cloud Project

1. Go to: https://console.cloud.google.com/
2. Create a new project (e.g., "Patio Maps")
3. Enable "Maps SDK for Android":
   - Go to: APIs & Services → Library
   - Search for "Maps SDK for Android"
   - Click "Enable"

### Step 3: Create API Key

1. Go to: APIs & Services → Credentials
2. Click "Create Credentials" → "API Key"
3. Click "Restrict Key"
4. Set "Application restrictions":
   - Select "Android apps"
   - Click "Add an item"
   - Package name: `com.patio.app` (from app.json)
   - SHA-1: (paste from Step 1)
5. Set "API restrictions":
   - Select "Restrict key"
   - Check "Maps SDK for Android"
6. Click "Save"
7. Copy the API key

### Step 4: Add API Key to app.json

Replace the placeholder in `app.json`:

```json
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_ACTUAL_API_KEY_HERE"
        }
      }
    }
  }
}
```

### Step 5: Rebuild Android

After adding the real API key:

```bash
eas build --profile development --platform android
```

The new build will have Google Maps enabled!

## Running Development Builds

### Start the Development Server

```bash
pnpm start
```

This will show a QR code and options to open on different platforms.

### Open in Development Build

**IMPORTANT**: You CANNOT use Expo Go. You must use the development build you created.

**iOS**:
- Open your installed development build app on the simulator
- Scan the QR code OR
- Press 'i' in the terminal to open directly

**Android**:
- Open your installed development build app on the emulator/device
- Scan the QR code OR
- Press 'a' in the terminal to open directly

### Testing Without Building

If you haven't built yet, you can still:
1. Develop other features that don't need maps
2. Comment out the map screen temporarily
3. Use Expo Go for non-native features

## Build Profiles Explained

### development
- For active development and testing
- Includes dev menu and debugging tools
- iOS: Simulator-compatible
- Android: APK (not app bundle)
- Distribution: Internal only

### preview
- For internal testing before production
- Optimized but still debuggable
- iOS: Works on devices (TestFlight)
- Android: APK for easy distribution
- Distribution: Internal only

### production
- For app store releases
- Fully optimized, no dev tools
- iOS: App Store build
- Android: App bundle (AAB)
- Distribution: App stores

## Common Commands

```bash
# Check build status
eas build:list

# View build logs
eas build:view <build-id>

# Run latest build
eas build:run -p ios     # or -p android

# Cancel a build
eas build:cancel <build-id>

# Update credentials
eas credentials

# Check project info
eas project:info
```

## Troubleshooting

### Build Fails
- Check build logs: `eas build:view <build-id>`
- Ensure all dependencies are compatible with your Expo SDK version
- Check for platform-specific issues in native modules

### Maps Don't Show
- **iOS**: Should work immediately with Apple Maps (no setup needed)
- **Android**: Verify API key is correct and SHA-1 matches
- Check that location permissions are granted
- Ensure you're using the development build (not Expo Go)

### Can't Install Build
- **iOS Simulator**: Drag .app to simulator or use `eas build:run`
- **Android**: Enable "Install from unknown sources" in emulator/device settings

### Development Build Crashes
- Check Metro bundler logs
- Ensure dev server is running (`pnpm start`)
- Try clearing cache: `pnpm start --clear`

## Next Steps

1. **Build iOS first** (simpler, no API key needed)
2. **Test map functionality** on iOS Simulator
3. **Build Android** and get SHA-1
4. **Configure Google Maps** with API key
5. **Rebuild Android** with API key
6. **Test on both platforms**

## Important Notes

- Development builds are separate from Expo Go - you'll have TWO apps
- Rebuilding is only needed when changing native code (plugins, native modules)
- Metro bundler updates (JS/TS code changes) work instantly without rebuilding
- Keep your Google Maps API key secret - don't commit to git!

## Resources

- EAS Build Docs: https://docs.expo.dev/build/introduction/
- expo-maps Docs: https://docs.expo.dev/versions/latest/sdk/maps/
- Google Maps Platform: https://console.cloud.google.com/

---

**Ready to build?** Run: `eas build --profile development --platform ios`
