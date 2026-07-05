# 💪 GymTracker - Tu App de Entrenamiento Personal

Aplicación móvil gratuita para gestionar tu rutina de entrenamiento en el gimnasio.

## 🎯 Características

✅ **Plan de 3 días/semana** optimizado para futbolistas  
✅ **Ejercicios con videos tutoriales** integrados  
✅ **Progreso persistente** - Los ejercicios se quedan hasta marcar como completado  
✅ **Detalles completos** - Reps, series, tiempo, posición de cada ejercicio  
✅ **Almacenamiento local** - Sin necesidad de internet  
✅ **100% Gratis** - Descargable en Android e iOS  

## 📱 Instalación

### Requisitos:
- Node.js (v14+)
- npm o yarn
- Android Studio (para Android) o Xcode (para iOS)
- React Native CLI

### Pasos:

```bash
# 1. Clonar el repositorio
git clone https://github.com/gueyepapematar2007-star/gym-tracker-app.git
cd gym-tracker-app

# 2. Instalar dependencias
npm install

# 3. Para Android
npx react-native run-android

# 4. Para iOS (Mac)
npx react-native run-ios
```

## 🏋️ Plan de Entrenamiento - 3 DÍAS/SEMANA

### DÍA 1: PUSH (Pecho, Hombros, Tríceps) 🔵
**Duración:** ~50 minutos | **Objetivo:** Fuerza + Masa muscular

1. **Flexiones de Pecho**
   - 4 series x 8-10 reps
   - Tiempo: 60 segundos descanso
   - Posición: Manos al ancho de hombros
   - Video: Ver tutorial completo

2. **Press de Hombro (Mancuernas)**
   - 4 series x 8-10 reps
   - Tiempo: 60 segundos descanso
   - Posición: Sentado, espalda recta
   - Video: Ver tutorial completo

3. **Fondos en Paralelas**
   - 3 series x 6-8 reps
   - Tiempo: 90 segundos descanso
   - Posición: Cuerpo recto, codos a 90°
   - Video: Ver tutorial completo

4. **Extensiones de Tríceps**
   - 3 series x 10-12 reps
   - Tiempo: 45 segundos descanso
   - Posición: De pie, brazo arriba
   - Video: Ver tutorial completo

### DÍA 2: PULL (Espalda, Bíceps) 🟢
**Duración:** ~50 minutos | **Objetivo:** Volumen + Espalda fuerte

1. **Dominadas**
   - 4 series x 6-8 reps
   - Tiempo: 90 segundos descanso
   - Posición: Agarre ancho, cuerpo recto
   - Video: Ver tutorial completo

2. **Remo en T (Mancuernas)**
   - 4 series x 8-10 reps
   - Tiempo: 60 segundos descanso
   - Posición: Inclinado, espalda recta
   - Video: Ver tutorial completo

3. **Curl de Bíceps**
   - 3 series x 10-12 reps
   - Tiempo: 45 segundos descanso
   - Posición: De pie, codos fijos
   - Video: Ver tutorial completo

4. **Face Pulls (Polea)**
   - 3 series x 12-15 reps
   - Tiempo: 45 segundos descanso
   - Posición: De pie, brazos a la altura de la cara
   - Video: Ver tutorial completo

### DÍA 3: LEGS + VELOCIDAD (Piernas, Glúteos, Explosividad) 🟡
**Duración:** ~60 minutos | **Objetivo:** Fuerza piernas + velocidad + salto

1. **Sentadillas Completas**
   - 4 series x 8-10 reps
   - Tiempo: 90 segundos descanso
   - Posición: Pies al ancho de hombros, espalda recta
   - Video: Ver tutorial completo

2. **Peso Muerto**
   - 4 series x 6-8 reps
   - Tiempo: 120 segundos descanso
   - Posición: Espalda recta, peso en talones
   - Video: Ver tutorial completo

3. **Prensa de Piernas**
   - 3 series x 10-12 reps
   - Tiempo: 90 segundos descanso
   - Posición: Pies al ancho de hombros
   - Video: Ver tutorial completo

4. **Saltos Explosivos (Box Jump o Suelo)**
   - 3 series x 5 reps máxima altura
   - Tiempo: 120 segundos descanso
   - Posición: Pies separados, brazos atrás
   - Video: Ver tutorial completo

5. **Sprint en el Lugar (20 segundos)**
   - 3 series x 20 segundos
   - Tiempo: 40 segundos descanso
   - Beneficio: Velocidad + Explosividad

## 📋 Estructura de la App

```
gym-tracker-app/
├── src/
│   ├── components/
│   │   ├── WorkoutScreen.js
│   │   ├── ExerciseCard.js
│   │   ├── ProgressTracker.js
│   │   └── VideoPlayer.js
│   ├── data/
│   │   ├── workoutPlans.js
│   │   ├── exercises.js
│   │   └── videoLibrary.js
│   ├── utils/
│   │   ├── storage.js
│   │   ├── notifications.js
│   │   └── helpers.js
│   └── App.js
├── package.json
└── app.json
```

## 💾 Funcionalidades

✅ **Marca ejercicios completados** - Se quedan en el listado hasta que marques el día como OK  
✅ **Videos integrados** - Cómo hacer cada ejercicio correctamente  
✅ **Temporizador** - Para descansos entre series  
✅ **Almacenamiento local** - Sin perder datos  
✅ **Notificaciones** - Recordatorio de entrenamientos  
✅ **Progreso visual** - Estadísticas de tu avance  

## 🚀 Cómo usar

1. Descarga la app
2. Abre el DÍA 1 (o el día que corresponda)
3. Haz cada ejercicio como indica
4. Marca cada serie como completada ✅
5. Cuando termines el día, pulsa "DÍA COMPLETADO"
6. Los ejercicios del día siguiente aparecerán automáticamente

## 📞 Soporte

Para reportar bugs o sugerencias: gueyepapematar2007-star

---

**Hecho con ❤️ para futbolistas que quieren ganar masa muscular sin perder velocidad**