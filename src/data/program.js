export const exerciseProgram = [
  {
    day: "Tuesday",
    focus: "Upper Body & Cardio",
    timeLimit: "Max 50 Mins",
    sequence: "Resistance (25 min) → Cardio (25 min)",
    workouts: [
      {
        id: "tue_r1",
        category: "Resistance",
        name: "Dumbbell Bench Press",
        sets: 4,
        reps: "8-10",
        defaultRest: 75,
        muscleGroup: "Chest",
        tip: "Retract your shoulder blades and press them into the bench for a stable base. Lower the dumbbells to chest level with a controlled 2-second eccentric, then drive up explosively. Avoid flaring your elbows past 45°."
      },
      {
        id: "tue_r2",
        category: "Resistance",
        name: "Seated Cable Rows",
        sets: 4,
        reps: "8-10",
        defaultRest: 75,
        muscleGroup: "Back",
        tip: "Sit tall with a slight forward lean at the start. Pull the handle to your lower ribcage by driving your elbows straight back. Squeeze your shoulder blades together for a full 1-second contraction before the controlled release."
      },
      {
        id: "tue_r3",
        category: "Resistance",
        name: "Overhead Dumbbell Press",
        sets: 2,
        reps: "10-12",
        defaultRest: 75,
        muscleGroup: "Shoulders",
        tip: "Brace your core and avoid arching your lower back. Press dumbbells overhead in a slight arc, finishing with the weights directly above your shoulders. Lower under control to ear level."
      },
      {
        id: "tue_c1",
        category: "Cardio",
        name: "Treadmill Incline Walk",
        duration: "25 mins",
        defaultRest: 0,
        details: "Speed 5.5-6.5 km/h, Incline 6-10%, HR 120-140 bpm",
        tip: "Maintain an upright posture—do NOT hold the handrails. Pump your arms naturally. This sustained Zone 2 effort forces direct fatty acid oxidation and builds aerobic base without CNS fatigue."
      }
    ]
  },
  {
    day: "Thursday",
    focus: "Lower Body & HIIT",
    timeLimit: "Max 50 Mins",
    sequence: "Resistance (25 min) → HIIT + Cardio (25 min)",
    workouts: [
      {
        id: "thu_r1",
        category: "Resistance",
        name: "Leg Press or Squats",
        sets: 4,
        reps: "8-10",
        defaultRest: 90,
        muscleGroup: "Quads/Glutes",
        tip: "Place feet shoulder-width apart, toes slightly out. Lower until thighs are at least parallel to the platform. Drive through your heels and mid-foot—never let your knees cave inward."
      },
      {
        id: "thu_r2",
        category: "Resistance",
        name: "Romanian Deadlifts or Leg Curls",
        sets: 4,
        reps: "8-10",
        defaultRest: 90,
        muscleGroup: "Hamstrings",
        tip: "For RDLs: push your hips back as if closing a car door behind you. Keep the bar or dumbbells dragging along your thighs. Maintain a flat back and feel a deep stretch in your hamstrings at the bottom."
      },
      {
        id: "thu_r3",
        category: "Resistance",
        name: "Planks or Cable Crunches",
        sets: 2,
        reps: "To failure / 60s",
        defaultRest: 60,
        muscleGroup: "Core",
        tip: "For planks: squeeze glutes, brace abs as if about to be punched, keep a straight line from head to heels. For cable crunches: flex your spine by pulling your ribcage toward your pelvis—don't just bend at the hips."
      },
      {
        id: "thu_c1",
        category: "HIIT",
        name: "Stationary Bike Sprints",
        duration: "15 mins",
        defaultRest: 0,
        details: "6 Rounds: 30s Max Effort (100+ RPM, Resistance 8-10) → 60s Recovery (50-60 RPM, Resistance 3)",
        tip: "During sprints, stay seated and drive through the balls of your feet. Your heart rate should spike above 160 bpm. During recovery, keep pedaling slowly—never stop completely. This protocol acutely spikes growth hormone secretion."
      },
      {
        id: "thu_c2",
        category: "Cardio",
        name: "Rowing Machine",
        duration: "10 mins",
        defaultRest: 0,
        details: "22-26 strokes/min, HR 120-140 bpm",
        tip: "Drive with your legs first (60% of power), then lean back slightly, and finish the pull to your lower ribs. Maintain a steady cadence. This immediately oxidizes the fatty acids mobilized by the HIIT session."
      }
    ]
  },
  {
    day: "Saturday",
    focus: "Upper Body Heavy & Cardio",
    timeLimit: "Max 60 Mins",
    sequence: "Resistance (40-45 min) → Cardio (15-20 min)",
    workouts: [
      {
        id: "sat_r1",
        category: "Resistance",
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: "8-10",
        defaultRest: 90,
        muscleGroup: "Upper Chest",
        tip: "Set bench to 30-45°. Maintain a slight arch in your upper back. Press the dumbbells to full lockout but don't clang them at the top. Use a 3-second eccentric for maximum time under tension."
      },
      {
        id: "sat_r2",
        category: "Resistance",
        name: "Push-ups or Chest Flyes",
        sets: 3,
        reps: "Near failure",
        defaultRest: 90,
        muscleGroup: "Chest",
        tip: "For push-ups: hands slightly wider than shoulders, full range of motion (chest to floor). For flyes: keep a slight bend in elbows, lower the weights in a wide arc until you feel a deep chest stretch, then squeeze together."
      },
      {
        id: "sat_r3",
        category: "Resistance",
        name: "Lat Pulldowns or Pull-ups",
        sets: 3,
        reps: "8-10",
        defaultRest: 90,
        muscleGroup: "Back (Lats)",
        tip: "Lean back slightly (about 15°). Pull the bar to your upper chest by driving your elbows down and back. Initiate the movement with your lats, not your biceps. Squeeze at the bottom for 1 second."
      },
      {
        id: "sat_r4",
        category: "Resistance",
        name: "Dumbbell Rows",
        sets: 3,
        reps: "8-10",
        defaultRest: 90,
        muscleGroup: "Back (Mid)",
        tip: "One knee and hand on the bench for support. Pull the dumbbell toward your hip, not your chest. Keep your torso parallel to the floor and avoid rotating your body to heave the weight."
      },
      {
        id: "sat_r5",
        category: "Resistance",
        name: "Lateral Raises",
        sets: 4,
        reps: "12-15",
        defaultRest: 60,
        muscleGroup: "Shoulders (Lateral)",
        tip: "Slight bend at the elbows, lift to shoulder height—not higher. Lead with your pinkies slightly to emphasize the medial deltoid. Use a controlled 2-second raise and 3-second lower. Ego-check the weight; form is king."
      },
      {
        id: "sat_c1",
        category: "Cardio",
        name: "Stationary Bike",
        duration: "15-20 mins",
        defaultRest: 0,
        details: "70-80 RPM, HR 120-140 bpm, Resistance Lvl 4-5",
        tip: "Keep a tall, relaxed posture. Maintain a consistent cadence—avoid surging or slowing. This low-intensity finisher maximizes fat oxidation while keeping CNS fatigue minimal for Sunday's session."
      }
    ]
  },
  {
    day: "Sunday",
    focus: "Lower Body Heavy & Cardio",
    timeLimit: "Max 60 Mins",
    sequence: "Resistance (40-45 min) → Cardio (15-20 min)",
    workouts: [
      {
        id: "sun_r1",
        category: "Resistance",
        name: "Walking Lunges or Split Squats",
        sets: 3,
        reps: "10-12 per leg",
        defaultRest: 90,
        muscleGroup: "Quads/Glutes",
        tip: "Take a long stride. Your front knee should track over your toes without collapsing inward. Lower your back knee until it nearly touches the ground. Push off through your front heel to stand."
      },
      {
        id: "sun_r2",
        category: "Resistance",
        name: "Leg Extensions",
        sets: 3,
        reps: "12-15",
        defaultRest: 60,
        muscleGroup: "Quads",
        tip: "Adjust the pad so it sits on your lower shins. Extend fully and squeeze the contraction hard at the top for 1 second. Lower with a slow 3-second eccentric. Avoid swinging or using momentum."
      },
      {
        id: "sun_r3",
        category: "Resistance",
        name: "Lying Leg Curls",
        sets: 3,
        reps: "10-12",
        defaultRest: 60,
        muscleGroup: "Hamstrings",
        tip: "Keep your hips pressed flat against the pad throughout. Curl the weight up by contracting your hamstrings, not by lifting your hips. Squeeze at the top, then lower under strict control."
      },
      {
        id: "sun_r4",
        category: "Resistance",
        name: "Glute Bridges or Hip Thrusts",
        sets: 3,
        reps: "12-15",
        defaultRest: 60,
        muscleGroup: "Glutes",
        tip: "Drive through your heels and squeeze your glutes at the top for 2 seconds. Keep your chin tucked and ribs down—avoid hyperextending your lower back. Use a barbell pad for comfort under heavier loads."
      },
      {
        id: "sun_r5",
        category: "Resistance",
        name: "Hanging Leg Raises or Crunches",
        sets: 3,
        reps: "To failure",
        defaultRest: 60,
        muscleGroup: "Core",
        tip: "For leg raises: curl your pelvis upward at the top of the movement. For crunches: focus on lifting your shoulder blades off the floor using your abs, not pulling on your neck."
      },
      {
        id: "sun_c1",
        category: "Cardio",
        name: "Treadmill Incline Walk",
        duration: "15-20 mins",
        defaultRest: 0,
        details: "Speed 5.5-6.5 km/h, Incline 8-12%, HR 120-140 bpm",
        tip: "End your week strong with an aggressive incline. Keep arms free, maintain upright posture. This final Zone 2 session maximizes the metabolic afterburn from your Sunday resistance volume."
      }
    ]
  }
];

export const GAMIFICATION = {
  xpPerExercise: 15,
  xpPerWorkoutComplete: 100,
  xpPerStreak: 50,
  levels: [
    { level: 1, title: "Beginner", xpRequired: 0, badge: "🌱" },
    { level: 2, title: "Committed", xpRequired: 200, badge: "💪" },
    { level: 3, title: "Warrior", xpRequired: 500, badge: "⚔️" },
    { level: 4, title: "Athlete", xpRequired: 1000, badge: "🏋️" },
    { level: 5, title: "Elite", xpRequired: 2000, badge: "🔥" },
    { level: 6, title: "Champion", xpRequired: 3500, badge: "🏆" },
    { level: 7, title: "Legend", xpRequired: 5500, badge: "👑" },
    { level: 8, title: "Ironclad", xpRequired: 8000, badge: "⚡" }
  ]
};
