import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  COMPLETED_WORKOUTS: 'completed_workouts',
  CURRENT_PROGRESS: 'current_progress',
  USER_STATS: 'user_stats',
  WORKOUT_HISTORY: 'workout_history'
};

// Guardar un entrenamiento completado
export const saveCompletedWorkout = async (day, date) => {
  try {
    const completed = await AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_WORKOUTS);
    const completedList = completed ? JSON.parse(completed) : [];
    
    completedList.push({
      day,
      date: date || new Date().toISOString(),
      completedAt: new Date().toISOString()
    });
    
    await AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_WORKOUTS, JSON.stringify(completedList));
    return true;
  } catch (error) {
    console.error('Error saving workout:', error);
    return false;
  }
};

// Obtener entrenamientos completados
export const getCompletedWorkouts = async () => {
  try {
    const completed = await AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_WORKOUTS);
    return completed ? JSON.parse(completed) : [];
  } catch (error) {
    console.error('Error getting workouts:', error);
    return [];
  }
};

// Guardar progreso del día actual
export const saveCurrentProgress = async (dayId, exerciseProgress) => {
  try {
    const progress = {
      dayId,
      exercises: exerciseProgress,
      lastUpdated: new Date().toISOString()
    };
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_PROGRESS, JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error('Error saving progress:', error);
    return false;
  }
};

// Obtener progreso actual
export const getCurrentProgress = async () => {
  try {
    const progress = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_PROGRESS);
    return progress ? JSON.parse(progress) : null;
  } catch (error) {
    console.error('Error getting progress:', error);
    return null;
  }
};

// Marcar serie completada
export const markSeriesComplete = async (dayId, exerciseId, seriesNumber) => {
  try {
    const progress = await getCurrentProgress();
    if (!progress) return false;
    
    const exercise = progress.exercises.find(ex => ex.id === exerciseId);
    if (exercise) {
      exercise.completedSeries = exercise.completedSeries || [];
      if (!exercise.completedSeries.includes(seriesNumber)) {
        exercise.completedSeries.push(seriesNumber);
      }
    }
    
    await saveCurrentProgress(dayId, progress.exercises);
    return true;
  } catch (error) {
    console.error('Error marking series:', error);
    return false;
  }
};

// Obtener estadísticas del usuario
export const getUserStats = async () => {
  try {
    const stats = await AsyncStorage.getItem(STORAGE_KEYS.USER_STATS);
    return stats ? JSON.parse(stats) : {
      totalWorkouts: 0,
      totalExercises: 0,
      streak: 0,
      joinDate: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return null;
  }
};

// Actualizar estadísticas
export const updateUserStats = async (workoutCompleted = false) => {
  try {
    const stats = await getUserStats();
    if (workoutCompleted) {
      stats.totalWorkouts += 1;
    }
    await AsyncStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
    return stats;
  } catch (error) {
    console.error('Error updating stats:', error);
    return null;
  }
};

// Limpiar progreso actual (cuando se completa un día)
export const clearCurrentProgress = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_PROGRESS);
    return true;
  } catch (error) {
    console.error('Error clearing progress:', error);
    return false;
  }
};