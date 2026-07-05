export const WORKOUT_PLANS = {
  DAY1: {
    id: 'day1',
    name: 'DÍA 1: PUSH',
    color: '#3B82F6',
    description: 'Pecho, Hombros, Tríceps',
    duration: '~50 minutos',
    exercises: [
      {
        id: 'ex1_1',
        name: 'Flexiones de Pecho',
        series: 4,
        reps: '8-10',
        rest: 60,
        position: 'Manos al ancho de hombros, cuerpo recto',
        videoId: 'dXnR-nRU2_I',
        tips: ['Mantén el core activado', 'Baja hasta casi tocar el suelo', 'Pecho a la altura de las manos']
      },
      {
        id: 'ex1_2',
        name: 'Press de Hombro (Mancuernas)',
        series: 4,
        reps: '8-10',
        rest: 60,
        position: 'Sentado, espalda recta contra la silla',
        videoId: 'R-l8vQ1AkfQ',
        tips: ['No arquees la espalda', 'Control total en la bajada', 'Presiona verticalmente']
      },
      {
        id: 'ex1_3',
        name: 'Fondos en Paralelas',
        series: 3,
        reps: '6-8',
        rest: 90,
        position: 'Cuerpo recto, codos a 90 grados',
        videoId: '2Z8E5UrtbkY',
        tips: ['Inclínate ligeramente adelante', 'Desciende lentamente', 'Activa tríceps y pecho']
      },
      {
        id: 'ex1_4',
        name: 'Extensiones de Tríceps',
        series: 3,
        reps: '10-12',
        rest: 45,
        position: 'De pie, brazo extendido hacia arriba',
        videoId: 'sKKnNrFx6bQ',
        tips: ['Mantén el codo fijo', 'Movimiento lento y controlado', 'Siente la contracción']
      }
    ]
  },
  DAY2: {
    id: 'day2',
    name: 'DÍA 2: PULL',
    color: '#10B981',
    description: 'Espalda, Bíceps',
    duration: '~50 minutos',
    exercises: [
      {
        id: 'ex2_1',
        name: 'Dominadas',
        series: 4,
        reps: '6-8',
        rest: 90,
        position: 'Agarre ancho, cuerpo recto, barbilla sobre la barra',
        videoId: '9m4pKNn-pUo',
        tips: ['Contrae escápulas primero', 'Codos hacia abajo y atrás', 'Movimiento controlado']
      },
      {
        id: 'ex2_2',
        name: 'Remo en T (Mancuernas)',
        series: 4,
        reps: '8-10',
        rest: 60,
        position: 'Inclinado a 45°, espalda recta',
        videoId: 'NkyWXhLkPaM',
        tips: ['Mancuernas cerca del cuerpo', 'Codos altos', 'Aprieta la espalda']
      },
      {
        id: 'ex2_3',
        name: 'Curl de Bíceps',
        series: 3,
        reps: '10-12',
        rest: 45,
        position: 'De pie, codos fijos a los lados',
        videoId: 'ykJmrsCUM88',
        tips: ['Sin balanceo', 'Control en la bajada', 'Máxima contracción arriba']
      },
      {
        id: 'ex2_4',
        name: 'Face Pulls (Polea)',
        series: 3,
        reps: '12-15',
        rest: 45,
        position: 'De pie, brazos a altura de la cara',
        videoId: '7-qqcVFWaVU',
        tips: ['Tirones en forma de "Y"', 'Retrae los hombros', 'Abierto al final']
      }
    ]
  },
  DAY3: {
    id: 'day3',
    name: 'DÍA 3: LEGS + VELOCIDAD',
    color: '#F59E0B',
    description: 'Piernas, Glúteos, Explosividad',
    duration: '~60 minutos',
    exercises: [
      {
        id: 'ex3_1',
        name: 'Sentadillas Completas',
        series: 4,
        reps: '8-10',
        rest: 90,
        position: 'Pies al ancho de hombros, espalda recta',
        videoId: 'Dy28eq2PjlU',
        tips: ['Baja hasta paralelo o más', 'Rodillas alineadas con pies', 'Peso en talones']
      },
      {
        id: 'ex3_2',
        name: 'Peso Muerto',
        series: 4,
        reps: '6-8',
        rest: 120,
        position: 'Espalda recta, barra pegada a las piernas',
        videoId: 'r4MzxtBKyNE',
        tips: ['Espalda neutra siempre', 'Empuja caderas al frente', 'Control en la bajada']
      },
      {
        id: 'ex3_3',
        name: 'Prensa de Piernas',
        series: 3,
        reps: '10-12',
        rest: 90,
        position: 'Pies al ancho de hombros en la plataforma',
        videoId: 'IZxyjW7MIAI',
        tips: ['No bloquees rodillas', 'Movimiento controlado', 'Siente el músculo']
      },
      {
        id: 'ex3_4',
        name: 'Saltos Explosivos (Box Jump)',
        series: 3,
        reps: '5 (máxima altura)',
        rest: 120,
        position: 'Pies separados, brazos atrás',
        videoId: 'dC3SqaS8LPA',
        tips: ['Máximo esfuerzo', 'Aterrizaje suave', 'Recupera completamente entre series']
      },
      {
        id: 'ex3_5',
        name: 'Sprint en el Lugar',
        series: 3,
        reps: '20 segundos',
        rest: 40,
        position: 'De pie, rodillas altas',
        videoId: 'qKLM3Pm9w8Q',
        tips: ['Máxima velocidad', 'Rodillas altas', 'Brazos activos']
      }
    ]
  }
};

export const getWorkoutByDay = (day) => {
  const workouts = {
    'monday': WORKOUT_PLANS.DAY1,
    'tuesday': WORKOUT_PLANS.DAY2,
    'wednesday': WORKOUT_PLANS.DAY3,
    'thursday': WORKOUT_PLANS.DAY1,
    'friday': WORKOUT_PLANS.DAY2,
    'saturday': WORKOUT_PLANS.DAY3,
  };
  return workouts[day.toLowerCase()] || null;
};

export const TRAINING_SCHEDULE = {
  daysPerWeek: 3,
  restDays: ['sunday'],
  trainingDays: ['monday', 'wednesday', 'friday']
};