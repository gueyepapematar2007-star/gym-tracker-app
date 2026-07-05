import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WORKOUT_PLANS } from '../data/workoutPlans';
import { saveCompletedWorkout, getCurrentProgress, saveCurrentProgress, clearCurrentProgress } from '../utils/storage';
import ExerciseCard from './ExerciseCard';

const { width } = Dimensions.get('window');

const WorkoutScreen = ({ route, navigation }) => {
  const { dayId } = route.params || { dayId: 'day1' };
  const workout = WORKOUT_PLANS[dayId.toUpperCase()] || WORKOUT_PLANS.DAY1;
  
  const [progress, setProgress] = useState(null);
  const [completedSeries, setCompletedSeries] = useState({});
  const [dayCompleted, setDayCompleted] = useState(false);

  useEffect(() => {
    loadProgress();
  }, [dayId]);

  const loadProgress = async () => {
    const savedProgress = await getCurrentProgress();
    if (savedProgress) {
      setProgress(savedProgress);
      // Reconstruct completedSeries from saved progress
      const completed = {};
      savedProgress.exercises?.forEach(ex => {
        completed[ex.id] = ex.completedSeries || [];
      });
      setCompletedSeries(completed);
    }
  };

  const handleSeriesComplete = async (exerciseId, seriesNumber) => {
    const updated = { ...completedSeries };
    if (!updated[exerciseId]) updated[exerciseId] = [];
    
    if (updated[exerciseId].includes(seriesNumber)) {
      updated[exerciseId] = updated[exerciseId].filter(s => s !== seriesNumber);
    } else {
      updated[exerciseId].push(seriesNumber);
    }
    
    setCompletedSeries(updated);
    
    // Save to storage
    const exerciseProgress = workout.exercises.map(ex => ({
      id: ex.id,
      name: ex.name,
      completedSeries: updated[ex.id] || []
    }));
    await saveCurrentProgress(dayId, exerciseProgress);
  };

  const handleDayComplete = async () => {
    Alert.alert(
      '¿Completar día?',
      `¿Marcar ${workout.name} como completado?`,
      [
        { text: 'Cancelar', onPress: () => {} },
        {
          text: 'Sí, completado ✅',
          onPress: async () => {
            await saveCompletedWorkout(workout.id, new Date());
            await clearCurrentProgress();
            setDayCompleted(true);
            Alert.alert('¡Excelente! 💪', `${workout.name} completado. ¡Sigue así!`);
            setTimeout(() => {
              navigation.goBack();
            }, 1500);
          }
        }
      ]
    );
  };

  const getTotalSeries = () => {
    return workout.exercises.reduce((total, ex) => total + ex.series, 0);
  };

  const getCompletedSeriesCount = () => {
    return Object.values(completedSeries).reduce((total, series) => total + series.length, 0);
  };

  const progressPercentage = Math.round((getCompletedSeriesCount() / getTotalSeries()) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: workout.color }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{workout.name}</Text>
          <Text style={styles.headerSubtitle}>{workout.description}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progreso del día</Text>
            <Text style={styles.progressPercent}>{progressPercentage}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${progressPercentage}%`,
                  backgroundColor: workout.color 
                }
              ]} 
            />
          </View>
          <Text style={styles.seriesCount}>
            {getCompletedSeriesCount()} de {getTotalSeries()} series completadas
          </Text>
        </View>

        {/* Exercises */}
        <View style={styles.exercisesContainer}>
          {workout.exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              exerciseNumber={index + 1}
              completedSeries={completedSeries[exercise.id] || []}
              onSeriesComplete={(seriesNumber) => handleSeriesComplete(exercise.id, seriesNumber)}
            />
          ))}
        </View>

        {/* Complete Day Button */}
        <TouchableOpacity 
          style={[
            styles.completeButton,
            progressPercentage < 100 && styles.disabledButton
          ]}
          onPress={handleDayComplete}
          disabled={progressPercentage < 100}
        >
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text style={styles.completeButtonText}>MARCAR DÍA COMPLETADO ✅</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  headerContent: {
    flex: 1,
    marginLeft: 12
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  progressSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8
  },
  progressFill: {
    height: '100%',
    borderRadius: 4
  },
  seriesCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  },
  exercisesContainer: {
    marginBottom: 16
  },
  completeButton: {
    flexDirection: 'row',
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  disabledButton: {
    backgroundColor: '#ccc',
    opacity: 0.6
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  },
  spacer: {
    height: 20
  }
});

export default WorkoutScreen;