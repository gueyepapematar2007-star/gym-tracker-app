#!/bin/bash

# GymTracker APK Build Script

echo "🏋️ Building GymTracker APK..."
echo "================================"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build APK
echo "🔨 Compiling APK..."
cd android
./gradlew assembleRelease
cd ..

echo "✅ APK Built Successfully!"
echo "📁 Location: android/app/build/outputs/apk/release/app-release.apk"
echo "================================"
echo "Move the APK to your phone and install!"
