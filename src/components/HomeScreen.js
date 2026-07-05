import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WORKOUT_PLANS, TRAINING_SCHEDULE } from '../data/workoutPlans';
import { getCompletedWorkouts, getUserStats } from '../utils/storage';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [stats, setStats] = useState(null);
  const [completedToday, setCompletedToday] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadStats();
    });
    return unsubscribe;
  }, [navigation]);

  const loadStats = async () => {
    const userStats = await getUserStats();
    setStats(userStats);
    
    const completed = await getCompletedWorkouts();
    const today = new Date().toDateString();
    const completedToday = completed.some(w => new Date(w.date).toDateString() === today);
    setCompletedToday(completedToday);
  };

  const getTodayWorkout = () => {
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = dayNames[new Date().getDay()];
    
    if (TRAINING_SCHEDULE.trainingDays.includes(today)) {
      const dayIndex = TRAINING_SCHEDULE.trainingDays.indexOf(today);
      const workoutId = ['DAY1', 'DAY2', 'DAY3'][dayIndex];
      return WORKOUT_PLANS[workoutId];
    }
    return null;
  };

  const todayWorkout = getTodayWorkout();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>¡Hola, campeón! 💪</Text>
            <Text style={styles.date}>{new Date().toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="trophy" size={32} color="#F59E0B" />
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.statCard1]}>
            <Ionicons name="checkmark-done" size={24} color="white" />
            <Text style={styles.statValue}>{stats?.totalWorkouts || 0}</Text>
            <Text style={styles.statLabel}>Entrenamientos</Text>
          </View>
          <View style={[styles.statCard, styles.statCard2]}>
            <Ionicons name="flame" size={24} color="white" />
            <Text style={styles.statValue}>{stats?.streak || 0}</Text>
            <Text style={styles.statLabel}>Racha</Text>
          </View>
        </View>

        {/* Today's Workout */}
        {todayWorkout ? (
          <View style={styles.todaySection}>
            <Text style={styles.sectionTitle}>Entrenamiento de Hoy</Text>
            <TouchableOpacity
              style={[styles.workoutCard, { borderLeftColor: todayWorkout.color }]}
              onPress={() => navigation.navigate('Workout', { dayId: todayWorkout.id })}
              activeOpacity={0.7}
            >
              <View style={[styles.workoutCardIcon, { backgroundColor: todayWorkout.color }]}>
                <Ionicons name="barbell" size={24} color="white" />
              </View>
              <View style={styles.workoutCardContent}>
                <Text style={styles.workoutCardTitle}>{todayWorkout.name}</Text>
                <Text style={styles.workoutCardDesc}>
                  {todayWorkout.exercises.length} ejercicios • {todayWorkout.duration}
                </Text>
              </View>
              {completedToday ? (
                <View style={styles.completedBadge}>
                  <Ionicons name="checkmark-circle" size={28} color="#10B981" />
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={24} color="#999" />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.restDaySection}>
            <Ionicons name="bed" size={48} color="#10B981" />
            <Text style={styles.restDayText}>Hoy es tu día de descanso</Text>
            <Text style={styles.restDaySubtext}>¡Recuperate bien para el próximo entrenamiento!</Text>
          </View>
        )}

        {/* All Workouts */}
        <View style={styles.allWorkoutsSection}>
          <Text style={styles.sectionTitle}>Todos los Entrenamientos</Text>
          {Object.values(WORKOUT_PLANS).map((workout) => (
            <TouchableOpacity
              key={workout.id}
              style={[styles.workoutListItem, { borderLeftColor: workout.color }]}
              onPress={() => navigation.navigate('Workout', { dayId: workout.id })}
              activeOpacity={0.7}
            >
              <View style={[styles.workoutListIcon, { backgroundColor: workout.color }]}>
                <Ionicons name="barbell" size={18} color="white" />
              </View>
              <View style={styles.workoutListContent}>
                <Text style={styles.workoutListTitle}>{workout.name}</Text>
                <Text style={styles.workoutListDesc}>{workout.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <View style={styles.tipsHeader}>
            <Ionicons name="lightbulb" size={24} color="#F59E0B" />
            <Text style={styles.tipsTitle}>Consejos para tu Éxito</Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>🥇 Mantén consistencia: entrena 3 días/semana sin saltar</Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>⚡ Controla el descanso: 60-90 segundos entre series</Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>💪 Aumenta progresivamente el peso cada 2 semanas</Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>🥗 Nutrición: come proteína después de entrenar</Text>
          </View>
        </View>

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textTransform: 'capitalize'
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12
  },
  statCard: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  statCard1: {
    backgroundColor: '#10B981'
  },
  statCard2: {
    backgroundColor: '#F59E0B'
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 12
  },
  todaySection: {
    paddingHorizontal: 16,
    marginBottom: 24
  },
  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  workoutCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  workoutCardContent: {
    flex: 1
  },
  workoutCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333'
  },
  workoutCardDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  completedBadge: {
    marginLeft: 8
  },
  restDaySection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    marginHorizontal: 16,
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    marginBottom: 24
  },
  restDayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
    marginTop: 12
  },
  restDaySubtext: {
    fontSize: 12,
    color: '#059669',
    marginTop: 4
  },
  allWorkoutsSection: {
    paddingHorizontal: 16,
    marginBottom: 24
  },
  workoutListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1
  },
  workoutListIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  workoutListContent: {
    flex: 1
  },
  workoutListTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  workoutListDesc: {
    fontSize: 11,
    color: '#666',
    marginTop: 2
  },
  tipsSection: {
    paddingHorizontal: 16,
    marginBottom: 24
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8
  },
  tipCard: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B'
  },
  tipText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18
  },
  spacer: {
    height: 20
  }
});

export default HomeScreen;