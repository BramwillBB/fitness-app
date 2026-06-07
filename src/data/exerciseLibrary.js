export const EXERCISE_LIBRARY = [
  // --- CHEST ---
  {
    id: "incline_db_press",
    name: "Incline Dumbbell Press",
    category: "Resistance",
    muscleGroup: "Chest",
    equipment: ["gym", "home"],
    jointStrains: [],
    sets: 4,
    reps: "8-10",
    defaultRest: 90,
    tip: "Set bench to 30°. Keep elbows tucked slightly (45-degree angle) to protect the shoulder joints. Drive the weight up explosively."
  },
  {
    id: "barbell_bench_press",
    name: "Barbell Bench Press",
    category: "Resistance",
    muscleGroup: "Chest",
    equipment: ["gym"],
    jointStrains: ["shoulders"],
    sets: 4,
    reps: "8-10",
    defaultRest: 90,
    tip: "Keep shoulder blades retracted. Touch the bar to your mid-chest and press up. Avoid if you have shoulder pain."
  },
  {
    id: "db_floor_press",
    name: "Dumbbell Floor Press",
    category: "Resistance",
    muscleGroup: "Chest",
    equipment: ["gym", "home"],
    jointStrains: [], // Great shoulder-friendly alternative
    sets: 4,
    reps: "8-10",
    defaultRest: 90,
    tip: "Lying on the floor stops elbows at 90°, protecting shoulders while loading the chest and triceps heavily."
  },
  {
    id: "pushups",
    name: "Push-ups",
    category: "Resistance",
    muscleGroup: "Chest",
    equipment: ["bodyweight", "gym", "home"],
    jointStrains: [],
    sets: 3,
    reps: "12-15",
    defaultRest: 60,
    tip: "Keep your body in a straight line. Tuck elbows to 45 degrees. Squeeze glutes and abs."
  },

  // --- BACK ---
  {
    id: "tbar_row",
    name: "T-Bar Row",
    category: "Resistance",
    muscleGroup: "Back",
    equipment: ["gym"],
    jointStrains: ["lower_back"],
    sets: 4,
    reps: "8-10",
    defaultRest: 90,
    tip: "Keep chest up and lower back tight. Pull weight to your lower chest, squeezing shoulder blades together."
  },
  {
    id: "seated_cable_row",
    name: "Seated Cable Row",
    category: "Resistance",
    muscleGroup: "Back",
    equipment: ["gym"],
    jointStrains: [], // Lower back friendly
    sets: 4,
    reps: "8-10",
    defaultRest: 90,
    tip: "Keep torso upright and pull handles to your navel. Avoid excessive swaying to protect the lower back."
  },
  {
    id: "single_arm_db_row",
    name: "Single-Arm Dumbbell Row",
    category: "Resistance",
    muscleGroup: "Back",
    equipment: ["gym", "home"],
    jointStrains: [],
    sets: 3,
    reps: "10-12",
    defaultRest: 60,
    tip: "Support your weight on a bench with one knee and hand. Pull the dumbbell to your hip, keeping the back flat."
  },
  {
    id: "neutral_grip_pullups",
    name: "Neutral Grip Pull-ups",
    category: "Resistance",
    muscleGroup: "Back",
    equipment: ["gym", "bodyweight"],
    jointStrains: [],
    sets: 4,
    reps: "8-10",
    defaultRest: 90,
    tip: "Palms facing each other. This is much friendlier on the elbows and shoulders. Pull chest to the bar."
  },
  {
    id: "lat_pulldown",
    name: "Lat Pulldown",
    category: "Resistance",
    muscleGroup: "Back",
    equipment: ["gym"],
    jointStrains: [],
    sets: 4,
    reps: "10-12",
    defaultRest: 90,
    tip: "Pull the bar down to your upper chest while leaning back slightly. Squeeze lats at the bottom."
  },

  // --- SHOULDERS ---
  {
    id: "arnold_press",
    name: "Dumbbell Arnold Press",
    category: "Resistance",
    muscleGroup: "Shoulders",
    equipment: ["gym", "home"],
    jointStrains: ["shoulders"],
    sets: 3,
    reps: "10-12",
    defaultRest: 60,
    tip: "Start with palms facing you, rotate palms outward as you press up. High mobility requirement."
  },
  {
    id: "db_shoulder_press",
    name: "Dumbbell Shoulder Press",
    category: "Resistance",
    muscleGroup: "Shoulders",
    equipment: ["gym", "home"],
    jointStrains: [],
    sets: 3,
    reps: "8-10",
    defaultRest: 90,
    tip: "Sit or stand tall. Press dumbbells straight overhead. Keep your core engaged and do not arch your lower back."
  },
  {
    id: "lateral_raises",
    name: "Dumbbell Lateral Raise",
    category: "Resistance",
    muscleGroup: "Shoulders",
    equipment: ["gym", "home"],
    jointStrains: [],
    sets: 3,
    reps: "12-15",
    defaultRest: 60,
    tip: "Raise arms to the sides with a slight bend in elbows. Lead with your elbows and keep pinkies slightly up."
  },

  // --- ARMS ---
  {
    id: "hammer_curls",
    name: "Dumbbell Hammer Curls",
    category: "Resistance",
    muscleGroup: "Arms",
    equipment: ["gym", "home"],
    jointStrains: [],
    sets: 3,
    reps: "12",
    defaultRest: 60,
    tip: "Keep palms facing each other throughout. Excellent for forearm thickness and elbow health."
  },
  {
    id: "overhead_tricep_extension",
    name: "Overhead Dumbbell Tricep Extension",
    category: "Resistance",
    muscleGroup: "Arms",
    equipment: ["gym", "home"],
    jointStrains: [],
    sets: 3,
    reps: "12",
    defaultRest: 60,
    tip: "Hold a dumbbell overhead with both hands, lower behind your head by bending elbows, and press back up."
  },
  {
    id: "bodyweight_dips",
    name: "Bench Dips",
    category: "Resistance",
    muscleGroup: "Arms",
    equipment: ["bodyweight", "gym", "home"],
    jointStrains: ["shoulders"],
    sets: 3,
    reps: "10-12",
    defaultRest: 60,
    tip: "Place hands on bench behind you. Lower hips, keeping back close to the bench. Do not go too deep."
  },

  // --- LEGS (QUADS / GLUTES / HAMSTRINGS) ---
  {
    id: "hack_squat",
    name: "Machine Hack Squat",
    category: "Resistance",
    muscleGroup: "Quads",
    equipment: ["gym"],
    jointStrains: [], // Spine-friendly
    sets: 4,
    reps: "8-10",
    defaultRest: 90,
    tip: "Spares the spine while loading the quads heavily. Control down deep, drive up without locking knees."
  },
  {
    id: "leg_press",
    name: "Leg Press",
    category: "Resistance",
    muscleGroup: "Quads",
    equipment: ["gym"],
    jointStrains: ["lower_back"], // Bad lower back flexion if too deep
    sets: 4,
    reps: "10-12",
    defaultRest: 90,
    tip: "Keep your lower back pressed firmly against the seat pad. Do not bring knees so close that your tailbone lifts."
  },
  {
    id: "goblet_squats",
    name: "Goblet Squats",
    category: "Resistance",
    muscleGroup: "Quads",
    equipment: ["gym", "home"],
    jointStrains: [],
    sets: 3,
    reps: "12-15",
    defaultRest: 60,
    tip: "Hold dumbbell vertically at chest. Forces upright posture, protecting the back while building leg power."
  },
  {
    id: "bodyweight_squats",
    name: "Air Squats",
    category: "Resistance",
    muscleGroup: "Quads",
    equipment: ["bodyweight", "gym", "home"],
    jointStrains: [],
    sets: 3,
    reps: "15-20",
    defaultRest: 60,
    tip: "Squat down until thighs are parallel to floor. Keep weight on your heels and chest up."
  },
  {
    id: "walking_lunges",
    name: "Dumbbell Walking Lunges",
    category: "Resistance",
    muscleGroup: "Glutes/Legs",
    equipment: ["gym", "home"],
    jointStrains: ["knees"],
    sets: 3,
    reps: "10-12 per leg",
    defaultRest: 90,
    tip: "Take long steps. Keep torso upright. Spikes heart rate and targets unilateral balance."
  },
  {
    id: "glute_bridge",
    name: "Glute Bridge",
    category: "Resistance",
    muscleGroup: "Hamstrings/Glutes",
    equipment: ["bodyweight", "gym", "home"],
    jointStrains: [],
    sets: 3,
    reps: "15-20",
    defaultRest: 60,
    tip: "Drive through heels, lifting hips up. Squeeze glutes hard at the top. Safe for back and knees."
  },
  {
    id: "romanian_deadlift",
    name: "Dumbbell Romanian Deadlift",
    category: "Resistance",
    muscleGroup: "Hamstrings/Glutes",
    equipment: ["gym", "home"],
    jointStrains: ["lower_back"],
    sets: 3,
    reps: "10-12",
    defaultRest: 90,
    tip: "Keep knees slightly bent, hinge at the hips, pushing glutes backward. Keep weights close to your shins."
  },

  // --- CORE ---
  {
    id: "hanging_leg_raises",
    name: "Hanging Leg Raises",
    category: "Resistance",
    muscleGroup: "Core",
    equipment: ["gym", "bodyweight"],
    jointStrains: [],
    sets: 3,
    reps: "To failure",
    defaultRest: 60,
    tip: "Hang from pull-up bar, roll pelvis upward to lift legs. Focus on abs rather than hip flexors."
  },
  {
    id: "plank_taps",
    name: "Plank with Shoulder Taps",
    category: "Resistance",
    muscleGroup: "Core",
    equipment: ["bodyweight", "gym", "home"],
    jointStrains: [],
    sets: 3,
    reps: "20 taps",
    defaultRest: 60,
    tip: "Keep hips completely still. Tap opposite shoulder. Builds anti-rotational core stability."
  },
  {
    id: "lying_leg_raises",
    name: "Lying Leg Raises",
    category: "Resistance",
    muscleGroup: "Core",
    equipment: ["bodyweight", "gym", "home"],
    jointStrains: ["lower_back"],
    sets: 3,
    reps: "12-15",
    defaultRest: 60,
    tip: "Lie flat, lift legs to vertical. Keep lower back pressed into floor. Place hands under hips if back arches."
  },

  // --- FULL BODY / COMPOUND ---
  {
    id: "trap_bar_deadlift",
    name: "Trap Bar Deadlift",
    category: "Resistance",
    muscleGroup: "Full Body/Legs",
    equipment: ["gym"],
    jointStrains: ["lower_back"], // Lower back shear is reduced, but still deadlift
    sets: 4,
    reps: "6-8",
    defaultRest: 120,
    tip: "Trap bar centers weight, reducing lower back strain compared to conventional bar. Squeeze glutes at top."
  },
  {
    id: "farmers_carries",
    name: "Heavy Farmer's Carries",
    category: "Resistance",
    muscleGroup: "Core/Grip",
    equipment: ["gym", "home"],
    jointStrains: [],
    sets: 3,
    reps: "40 meters",
    defaultRest: 90,
    tip: "Stand tall, walk with heavy load in each hand. Keep shoulders packed. Core and grip builder."
  },

  // --- HIIT / CARDIO ---
  {
    id: "kb_swings",
    name: "Kettlebell Swings",
    category: "HIIT",
    muscleGroup: "Full Body",
    equipment: ["gym", "home"],
    jointStrains: ["lower_back"],
    duration: "10 mins",
    defaultRest: 0,
    details: "10 Rounds: 30s Swings → 30s Rest",
    tip: "Hinge at the hip, do not squat. Drive the bell up using glutes and hamstrings. Highly metabolic.",
    intervals: { rounds: 10, work: 30, rest: 30 }
  },
  {
    id: "air_bike_sprints",
    name: "Assault Bike Sprints",
    category: "HIIT",
    muscleGroup: "Full Body",
    equipment: ["gym"],
    jointStrains: [], // Safe on knees, back, shoulders
    duration: "15 mins",
    defaultRest: 0,
    details: "8 Rounds: 20s Max Sprint → 40s Slow Recovery",
    tip: "Low impact, high cardiovascular demand. Go all out for 20s. Visceral fat burn.",
    intervals: { rounds: 8, work: 20, rest: 40 }
  },
  {
    id: "incline_walk",
    name: "Incline Treadmill Walk",
    category: "Cardio",
    muscleGroup: "Full Body",
    equipment: ["gym"],
    jointStrains: [],
    duration: "15 mins",
    defaultRest: 0,
    details: "Speed 5-6 km/h, Incline 10-12%",
    tip: "Zone 2 aerobic base builder. Excellent recovery tool."
  },
  {
    id: "jumping_jacks",
    name: "Jumping Jacks",
    category: "HIIT",
    muscleGroup: "Full Body",
    equipment: ["bodyweight", "gym", "home"],
    jointStrains: ["knees"],
    duration: "10 mins",
    defaultRest: 0,
    details: "10 Rounds: 30s Work → 30s Rest",
    tip: "Jump feet wide while bringing hands overhead. Great low-equipment warm-up or metcon option.",
    intervals: { rounds: 10, work: 30, rest: 30 }
  }
];
