export const exerciseProgram = [
  {
    day: "Tuesday",
    focus: "Upper Body Push/Pull + Metcon",
    timeLimit: "Max 50 Mins",
    sequence: "Resistance (30 min) → Metcon Finisher (20 min)",
    workouts: [
      {
        id: "tue_r1",
        category: "Resistance",
        name: "Incline Dumbbell Press",
        sets: 4,
        reps: "8-10",
        defaultRest: 90,
        muscleGroup: "Upper Chest",
        tip: "Set bench to 30°. Keep elbows tucked slightly (45-degree angle) to protect the shoulder joints. Drive the weight up explosively, lower under control for 3 seconds."
      },
      {
        id: "tue_r2",
        category: "Resistance",
        name: "T-Bar Row or Seated Cable Row",
        sets: 4,
        reps: "8-10",
        defaultRest: 90,
        muscleGroup: "Back",
        tip: "Keep your chest up and lower back tight. Pull the weight towards your belly button, squeezing your shoulder blades together. This builds back thickness without straining the lower back."
      },
      {
        id: "tue_r3",
        category: "Resistance",
        name: "Dumbbell Arnold Press",
        sets: 3,
        reps: "10-12",
        defaultRest: 60,
        muscleGroup: "Shoulders",
        tip: "Start with palms facing you at shoulder level, press up while rotating palms outward. This hits all three heads of the deltoid and promotes shoulder mobility."
      },
      {
        id: "tue_r4",
        category: "Resistance",
        name: "Hammer Curls to Tricep Extension",
        sets: 3,
        reps: "12 (Each)",
        defaultRest: 60,
        muscleGroup: "Arms",
        tip: "Superset: Do hammer curls (palms facing each other, great for elbow health) immediately followed by overhead tricep extensions. Burns out the arms quickly."
      },
      {
        id: "tue_c1",
        category: "HIIT",
        name: "Kettlebell Swings",
        duration: "10 mins",
        defaultRest: 0,
        details: "10 Rounds: 30s Swings → 30s Rest",
        tip: "This is a hip hinge, not a squat. Drive the kettlebell up using the power of your glutes and hamstrings. Highly metabolic for maximum fat loss while protecting knees.",
        intervals: { rounds: 10, work: 30, rest: 30 }
      }
    ]
  },
  {
    day: "Thursday",
    focus: "Lower Body & Core + HIIT",
    timeLimit: "Max 50 Mins",
    sequence: "Resistance (35 min) → HIIT (15 min)",
    workouts: [
      {
        id: "thu_r1",
        category: "Resistance",
        name: "Hack Squat or Leg Press",
        sets: 4,
        reps: "8-10",
        defaultRest: 90,
        muscleGroup: "Quads",
        tip: "Great alternative to barbell squats for a 48-year-old; loads the quads heavily without compressing the spine. Control the weight down deep, drive up without locking knees."
      },
      {
        id: "thu_r2",
        category: "Resistance",
        name: "Dumbbell Walking Lunges",
        sets: 3,
        reps: "10-12 per leg",
        defaultRest: 90,
        muscleGroup: "Glutes/Legs",
        tip: "Take long, deliberate steps. Keep your torso upright. This is excellent for unilateral strength, fixing imbalances, and spiking the heart rate."
      },
      {
        id: "thu_r3",
        category: "Resistance",
        name: "Glute Bridge or Hip Thrust",
        sets: 3,
        reps: "12-15",
        defaultRest: 60,
        muscleGroup: "Hamstrings/Glutes",
        tip: "Drive through the heels and squeeze the glutes hard for a 2-second pause at the top. Essential for lower back health and posterior chain strength."
      },
      {
        id: "thu_r4",
        category: "Resistance",
        name: "Hanging Leg Raises",
        sets: 3,
        reps: "To failure",
        defaultRest: 60,
        muscleGroup: "Core",
        tip: "Hang from a pull-up bar (or use Captain's Chair). Focus on rolling your pelvis upward. This targets the lower abs directly to help build the 'six pack' foundation."
      },
      {
        id: "thu_c1",
        category: "HIIT",
        name: "Assault Bike or Rower Sprints",
        duration: "15 mins",
        defaultRest: 0,
        details: "8 Rounds: 20s ALL OUT Sprint → 40s Slow Recovery",
        tip: "Low impact on the joints but incredibly demanding on the cardiovascular system. Go absolute maximum effort during the 20 seconds. This shreds visceral fat.",
        intervals: { rounds: 8, work: 20, rest: 40 }
      }
    ]
  },
  {
    day: "Saturday",
    focus: "Full Body Strength & Power",
    timeLimit: "Max 60 Mins",
    sequence: "Resistance (45 min) → Cardio (15 min)",
    workouts: [
      {
        id: "sat_r1",
        category: "Resistance",
        name: "Trap Bar Deadlift",
        sets: 4,
        reps: "6-8",
        defaultRest: 120,
        muscleGroup: "Full Body/Legs",
        tip: "The trap bar keeps the weight centered, significantly reducing lower back shear stress compared to conventional deadlifts. Stand tall and squeeze glutes at the top."
      },
      {
        id: "sat_r2",
        category: "Resistance",
        name: "Neutral Grip Pull-ups (or Pulldowns)",
        sets: 4,
        reps: "8-10",
        defaultRest: 90,
        muscleGroup: "Back/Biceps",
        tip: "Palms facing each other. This grip is much friendlier on the elbows and shoulders for men over 40. Pull your chest to the bar."
      },
      {
        id: "sat_r3",
        category: "Resistance",
        name: "Dumbbell Push Press",
        sets: 3,
        reps: "8-10",
        defaultRest: 90,
        muscleGroup: "Shoulders/Power",
        tip: "Dip slightly at the knees and use leg drive to help press the dumbbells overhead. Great for building upper body power and core stability."
      },
      {
        id: "sat_r4",
        category: "Resistance",
        name: "Heavy Farmer's Carries",
        sets: 3,
        reps: "40 meters",
        defaultRest: 90,
        muscleGroup: "Core/Grip",
        tip: "Grab the heaviest dumbbells or kettlebells you can hold. Walk with perfect, upright posture. This builds a bulletproof core and insane grip strength."
      },
      {
        id: "sat_c1",
        category: "Cardio",
        name: "Steady State Incline Walk",
        duration: "15 mins",
        defaultRest: 0,
        details: "Speed 5-6 km/h, Incline 10-12%",
        tip: "Cool down and flush the legs. Keeping it strictly Zone 2 (can hold a conversation) builds the aerobic base and aids recovery."
      }
    ]
  },
  {
    day: "Sunday",
    focus: "Hypertrophy & Abs Finisher",
    timeLimit: "Max 60 Mins",
    sequence: "Resistance (40 min) → Core/Metcon (20 min)",
    workouts: [
      {
        id: "sun_r1",
        category: "Resistance",
        name: "Dumbbell Floor Press",
        sets: 4,
        reps: "8-10",
        defaultRest: 90,
        muscleGroup: "Chest/Triceps",
        tip: "Lie on the floor and press dumbbells. The floor stops your elbows at 90 degrees, completely removing shoulder strain while allowing you to load the chest and triceps heavy."
      },
      {
        id: "sun_r2",
        category: "Resistance",
        name: "Single Arm Dumbbell Row",
        sets: 3,
        reps: "10-12 per arm",
        defaultRest: 60,
        muscleGroup: "Back (Lats)",
        tip: "Support yourself on a bench. Focus on pulling the elbow to the hip. Keep the torso stable to protect the spine. Excellent for fixing left/right strength imbalances."
      },
      {
        id: "sun_r3",
        category: "Resistance",
        name: "Goblet Squats",
        sets: 3,
        reps: "12-15",
        defaultRest: 60,
        muscleGroup: "Quads/Core",
        tip: "Hold a dumbbell or kettlebell vertically at your chest. This front-loaded position forces your abs to work overtime and naturally keeps your torso upright, saving the back."
      },
      {
        id: "sun_r4",
        category: "Resistance",
        name: "Cable Woodchoppers",
        sets: 3,
        reps: "12 per side",
        defaultRest: 60,
        muscleGroup: "Obliques/Core",
        tip: "Set cable high, chop diagonally down across your body. Keep arms mostly straight. This rotational movement carves out the obliques and side-abs."
      },
      {
        id: "sun_r5",
        category: "Resistance",
        name: "Plank with Shoulder Taps",
        sets: 3,
        reps: "20 taps total",
        defaultRest: 60,
        muscleGroup: "Core",
        tip: "Hold a pushup position. Tap your left shoulder with your right hand, then switch. Keep your hips completely still—don't let them sway. Ultimate anti-rotation ab builder."
      },
      {
        id: "sun_c1",
        category: "HIIT",
        name: "Battle Ropes or Sled Push",
        duration: "10 mins",
        defaultRest: 0,
        details: "10 Rounds: 20s Max Effort → 40s Rest",
        tip: "A brutal finisher. Burns massive calories and depletes glycogen to ensure your body is pulling from fat stores, all with zero impact on your joints.",
        intervals: { rounds: 10, work: 20, rest: 40 }
      }
    ]
  }
];

export const MILESTONES = {
  ranks: [
    { title: "Newbie", minWorkouts: 0, badge: "🌱", tagline: "Every journey starts with a single rep" },
    { title: "Regular", minWorkouts: 5, badge: "💪", tagline: "Consistency is building" },
    { title: "Warrior", minWorkouts: 15, badge: "⚔️", tagline: "Nothing can stop you now" },
    { title: "Athlete", minWorkouts: 30, badge: "🏋️", tagline: "You train like a pro" },
    { title: "Beast Mode", minWorkouts: 50, badge: "🔥", tagline: "Unstoppable force" },
    { title: "Champion", minWorkouts: 75, badge: "🏆", tagline: "Top 1% dedication" },
    { title: "Legend", minWorkouts: 100, badge: "👑", tagline: "Hall of fame material" },
    { title: "Ironclad", minWorkouts: 150, badge: "⚡", tagline: "Forged in iron" },
  ],
  achievements: [
    { id: "first_workout", title: "First Step", badge: "👟", description: "Complete your first workout", check: (stats) => stats.totalWorkouts >= 1 },
    { id: "five_workouts", title: "Getting Hooked", badge: "🪝", description: "Complete 5 workouts", check: (stats) => stats.totalWorkouts >= 5 },
    { id: "ten_workouts", title: "Double Digits", badge: "🔟", description: "Complete 10 workouts", check: (stats) => stats.totalWorkouts >= 10 },
    { id: "streak_3", title: "Hat Trick", badge: "🎩", description: "Hit a 3-day streak", check: (stats) => stats.streak >= 3 },
    { id: "streak_7", title: "Full Week", badge: "📅", description: "Hit a 7-day streak", check: (stats) => stats.streak >= 7 },
    { id: "volume_1000", title: "Ton Club", badge: "🏗️", description: "Lift 1,000 kg total", check: (stats) => stats.totalVolume >= 1000 },
    { id: "volume_10000", title: "Heavy Hitter", badge: "💎", description: "Lift 10,000 kg total", check: (stats) => stats.totalVolume >= 10000 },
    { id: "perfect_workout", title: "Perfectionist", badge: "✨", description: "Complete a workout at 100%", check: (stats) => stats.hadPerfectWorkout },
  ],
};
