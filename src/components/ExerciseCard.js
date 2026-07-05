import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ExerciseCard = ({ exercise, exerciseNumber, completedSeries, onSeriesComplete }) => {
  const [expanded, setExpanded] = useState(false);
  const [animValue] = React.useState(new Animated.Value(0));

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(animValue, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const getCompletedPercentage = () => {
    return Math.round((completedSeries.length / exercise.series) * 100);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <View style={styles.numberBadge}>
            <Text style={styles.numberText}>{exerciseNumber}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseMeta}>
              {exercise.series}×{exercise.reps} reps • Descanso: {exercise.rest}s
            </Text>
          </View>
        </View>
        <View style={styles.progressIndicator}>
          <Text style={styles.progressText}>{completedSeries.length}/{exercise.series}</Text>
          <Ionicons 
            name={expanded ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color="#666" 
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.expandedContent}>
          {/* Position Info */}
          <View style={styles.infoSection}>
            <Ionicons name="body" size={16} color="#3B82F6" />
            <Text style={styles.infoText}>
              <Text style={styles.infoBold}>Posición: </Text>
              {exercise.position}
            </Text>
          </View>

          {/* Tips */}
          <View style={styles.tipsSection}>
            <View style={styles.tipsHeader}>
              <Ionicons name="lightbulb" size={16} color="#F59E0B" />
              <Text style={styles.tipsTitle}>Consejos</Text>
            </View>
            {exercise.tips.map((tip, index) => (
              <Text key={index} style={styles.tipItem}>• {tip}</Text>
            ))}
          </View>

          {/* Series Tracker */}
          <View style={styles.seriesSection}>
            <Text style={styles.sectionTitle}>Series</Text>
            <View style={styles.seriesGrid}>
              {Array.from({ length: exercise.series }).map((_, index) => {
                const seriesNumber = index + 1;
                const isCompleted = completedSeries.includes(seriesNumber);
                return (
                  <TouchableOpacity
                    key={seriesNumber}
                    style={[
                      styles.seriesButton,
                      isCompleted && styles.seriesButtonCompleted
                    ]}
                    onPress={() => onSeriesComplete(seriesNumber)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.seriesButtonText,
                      isCompleted && styles.seriesButtonTextCompleted
                    ]}>
                      {isCompleted ? '✓' : seriesNumber}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill,
                  { width: `${getCompletedPercentage()}%` }
                ]}
              />
            </View>
            <Text style={styles.progressBarText}>
              {getCompletedPercentage()}% completado
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  numberBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  numberText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3B82F6'
  },
  headerInfo: {
    flex: 1
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  exerciseMeta: {
    fontSize: 12,
    color: '#666'
  },
  progressIndicator: {
    alignItems: 'center'
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    backgroundColor: '#F0F9FF',
    padding: 10,
    borderRadius: 8
  },
  infoText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18
  },
  infoBold: {
    fontWeight: 'bold'
  },
  tipsSection: {
    marginBottom: 12,
    backgroundColor: '#FEF3C7',
    padding: 10,
    borderRadius: 8
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginLeft: 6
  },
  tipItem: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
    lineHeight: 16
  },
  seriesSection: {
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  seriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  seriesButton: {
    width: (width - 56) / 4,
    height: (width - 56) / 4,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0'
  },
  seriesButtonCompleted: {
    backgroundColor: '#DBEAFE',
    borderColor: '#3B82F6'
  },
  seriesButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666'
  },
  seriesButtonTextCompleted: {
    color: '#3B82F6'
  },
  progressBar: {
    marginTop: 12
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3
  },
  progressBarText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center'
  }
});

export default ExerciseCard;