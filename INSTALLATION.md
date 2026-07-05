# 📱 Guía de Instalación - GymTracker

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (v14 o superior)
   - Descarga desde: https://nodejs.org/
   - Verifica: `node --version` en terminal

2. **npm o yarn**
   - npm viene con Node.js
   - Verifica: `npm --version`

## Opción 1: Para Android 📱

### Paso 1: Instalar Android Studio
1. Descarga Android Studio desde: https://developer.android.com/studio
2. Sigue las instrucciones de instalación
3. Abre Android Studio y descarga el SDK necesario

### Paso 2: Configurar Variables de Entorno
```bash
# En Windows (Agregalo a Variables de Entorno):
ANDROID_HOME = C:\Users\TuUsuario\AppData\Local\Android\Sdk

# En Mac/Linux (Agregalo a .bash_profile o .zshrc):
export ANDROID_HOME=$HOME/Library/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
```

### Paso 3: Clonar y Instalar
```bash
# Clonar el repositorio
git clone https://github.com/gueyepapematar2007-star/gym-tracker-app.git
cd gym-tracker-app

# Instalar dependencias
npm install

# Ejecutar en Android
npx react-native run-android
```

## Opción 2: Para iOS 🍎 (Solo Mac)

### Paso 1: Instalar Xcode
```bash
# Desde App Store o
xcode-select --install
```

### Paso 2: Instalar CocoaPods
```bash
sudo gem install cocoapods
```

### Paso 3: Clonar e Instalar
```bash
git clone https://github.com/gueyepapematar2007-star/gym-tracker-app.git
cd gym-tracker-app

# Instalar dependencias
npm install

# Instalar pods
cd ios
pod install
cd ..

# Ejecutar en iOS
npx react-native run-ios
```

## Opción 3: Usar Expo (La más Fácil) ⚡

### Paso 1: Instalar Expo CLI
```bash
npm install -g expo-cli
```

### Paso 2: Crear Proyecto
```bash
git clone https://github.com/gueyepapematar2007-star/gym-tracker-app.git
cd gym-tracker-app
npm install
```

### Paso 3: Ejecutar
```bash
npm start
```

Luego:
- **Para Android**: Presiona `a` en la terminal o escanea el QR con la app Expo
- **Para iOS**: Presiona `i` en la terminal o escanea el QR con la cámara

## 🚨 Solución de Problemas

### Error: "Android SDK not found"
```bash
# Reinstala Android SDK
android update sdk --no-ui
```

### Error: "CocoaPods not installed"
```bash
sudo gem install cocoapods
cd ios && pod install && cd ..
```

### Error: "Metro bundler not found"
```bash
rm -rf node_modules
npm install
npm start -- --reset-cache
```

### App se congela
```bash
# Detén el servidor (Ctrl+C)
# Limpia caché
npm start -- --reset-cache
```

## ✅ Verificación

Una vez instalada, deberías ver:
- ✅ Pantalla de inicio con "¡Hola, campeón!"
- ✅ Plan de entrenamientos visible
- ✅ Botones de ejercicios funcionales
- ✅ Almacenamiento local funcionando

## 📞 Soporte

Si tienes problemas:
1. Verifica que Node.js está instalado: `node --version`
2. Limpia todo: `rm -rf node_modules && npm install`
3. Reinicia el servidor Metro: `npm start`

**¡Listo! Ya tienes GymTracker instalado en tu móvil. ¡A entrenar! 💪**