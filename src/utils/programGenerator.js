import { EXERCISE_LIBRARY } from '../data/exerciseLibrary';

/**
 * Generates a tailored workout program based on the user's profile answers.
 * @param {Object} profile
 * @param {Array<string>} profile.goals - e.g. ["strength", "fat_loss"]
 * @param {Array<string>} profile.focusAreas - e.g. ["core", "legs"]
 * @param {Array<string>} profile.injuries - e.g. ["lower_back", "knees"]
 * @param {string} profile.equipment - "gym" | "home" | "bodyweight"
 * @param {number} profile.daysPerWeek - 2 | 3 | 4
 */
export function generateProgram(profile) {
  const { injuries = [], equipment = "gym", daysPerWeek = 3 } = profile;

  // 1. Filter the entire library by equipment and injuries
  const allowedExercises = EXERCISE_LIBRARY.filter(ex => {
    // Equipment filter
    let hasEquipment = false;
    if (equipment === "gym") {
      hasEquipment = true; // Can do anything
    } else if (equipment === "home") {
      hasEquipment = ex.equipment.includes("home") || ex.equipment.includes("bodyweight");
    } else {
      hasEquipment = ex.equipment.includes("bodyweight");
    }

    if (!hasEquipment) return false;

    // Injury/Joint strains filter
    const overlapsStrains = ex.jointStrains.some(strain => injuries.includes(strain));
    if (overlapsStrains) return false;

    return true;
  });

  // Helper function to pick exercises matching criteria with a fallback to any safe exercise
  function pickExercises(muscleGroups, category, count = 1, excludeIds = []) {
    let matches = allowedExercises.filter(ex => 
      muscleGroups.includes(ex.muscleGroup) && 
      ex.category === category &&
      !excludeIds.includes(ex.id)
    );

    // Fallback: search by muscle group generally
    if (matches.length < count) {
      const extraMatches = allowedExercises.filter(ex => 
        muscleGroups.includes(ex.muscleGroup) && 
        !excludeIds.includes(ex.id)
      );
      matches = [...matches, ...extraMatches];
    }

    // Secondary fallback: search by category
    if (matches.length < count) {
      const extraMatches = allowedExercises.filter(ex => 
        ex.category === category && 
        !excludeIds.includes(ex.id)
      );
      matches = [...matches, ...extraMatches];
    }

    // Final fallback: just get any allowed exercise
    if (matches.length < count) {
      const extraMatches = allowedExercises.filter(ex => !excludeIds.includes(ex.id));
      matches = [...matches, ...extraMatches];
    }

    // Slice up to required count
    return matches.slice(0, count);
  }

  const generatedDays = [];

  // Define templates depending on frequency
  if (daysPerWeek === 2) {
    // --- DAY 1: UPPER BODY ---
    const day1Workouts = [];
    const chosenIds = [];

    // 1 Chest
    const chest = pickExercises(["Chest"], "Resistance", 1, chosenIds);
    day1Workouts.push(...chest);
    chosenIds.push(...chest.map(e => e.id));

    // 1 Back
    const back = pickExercises(["Back", "Back (Lats)"], "Resistance", 1, chosenIds);
    day1Workouts.push(...back);
    chosenIds.push(...back.map(e => e.id));

    // 1 Shoulders
    const shoulders = pickExercises(["Shoulders"], "Resistance", 1, chosenIds);
    day1Workouts.push(...shoulders);
    chosenIds.push(...shoulders.map(e => e.id));

    // 1 Arms
    const arms = pickExercises(["Arms"], "Resistance", 1, chosenIds);
    day1Workouts.push(...arms);
    chosenIds.push(...arms.map(e => e.id));

    // 1 Finisher
    const metcon = pickExercises(["Full Body", "Core"], "HIIT", 1, chosenIds);
    day1Workouts.push(...metcon);

    generatedDays.push({
      day: "Day 1",
      focus: "Upper Body Push/Pull + Finisher",
      timeLimit: "Max 50 Mins",
      sequence: "Resistance (35 min) → Metcon Finisher (15 min)",
      workouts: day1Workouts
    });

    // --- DAY 2: LOWER BODY & CORE ---
    const day2Workouts = [];
    const chosenIds2 = [];

    // 2 Legs (Quads, Glutes, Hamstrings)
    const legs = pickExercises(["Quads", "Glutes/Legs", "Hamstrings/Glutes", "Full Body/Legs"], "Resistance", 2, chosenIds2);
    day2Workouts.push(...legs);
    chosenIds2.push(...legs.map(e => e.id));

    // 2 Core
    const core = pickExercises(["Core", "Obliques/Core"], "Resistance", 2, chosenIds2);
    day2Workouts.push(...core);
    chosenIds2.push(...core.map(e => e.id));

    // 1 Cardio
    const cardio = pickExercises(["Full Body"], "Cardio", 1, chosenIds2);
    day2Workouts.push(...cardio);

    generatedDays.push({
      day: "Day 2",
      focus: "Lower Body & Core + Cardio",
      timeLimit: "Max 50 Mins",
      sequence: "Resistance (35 min) → Cardio Finish (15 min)",
      workouts: day2Workouts
    });

  } else if (daysPerWeek === 3) {
    // --- DAY 1: PUSH / PULL ---
    const d1Workouts = [];
    const chosenIds = [];

    const chest = pickExercises(["Chest"], "Resistance", 1, chosenIds);
    d1Workouts.push(...chest);
    chosenIds.push(...chest.map(e => e.id));

    const back = pickExercises(["Back", "Back (Lats)"], "Resistance", 1, chosenIds);
    d1Workouts.push(...back);
    chosenIds.push(...back.map(e => e.id));

    const shoulders = pickExercises(["Shoulders"], "Resistance", 1, chosenIds);
    d1Workouts.push(...shoulders);
    chosenIds.push(...shoulders.map(e => e.id));

    const arms = pickExercises(["Arms"], "Resistance", 1, chosenIds);
    d1Workouts.push(...arms);
    chosenIds.push(...arms.map(e => e.id));

    const hiit = pickExercises(["Full Body"], "HIIT", 1, chosenIds);
    d1Workouts.push(...hiit);

    generatedDays.push({
      day: "Day 1",
      focus: "Upper Body Strength & HIIT",
      timeLimit: "Max 50 Mins",
      sequence: "Resistance (35 min) → HIIT Finisher (15 min)",
      workouts: d1Workouts
    });

    // --- DAY 2: LEGS & CORE ---
    const d2Workouts = [];
    const chosenIds2 = [];

    const legs = pickExercises(["Quads", "Glutes/Legs", "Hamstrings/Glutes"], "Resistance", 2, chosenIds2);
    d2Workouts.push(...legs);
    chosenIds2.push(...legs.map(e => e.id));

    const core = pickExercises(["Core", "Obliques/Core"], "Resistance", 2, chosenIds2);
    d2Workouts.push(...core);
    chosenIds2.push(...core.map(e => e.id));

    const hiitLegs = pickExercises(["Full Body"], "HIIT", 1, chosenIds2);
    d2Workouts.push(...hiitLegs);

    generatedDays.push({
      day: "Day 2",
      focus: "Legs & Core Conditioning",
      timeLimit: "Max 50 Mins",
      sequence: "Resistance (35 min) → Metabolic HIIT (15 min)",
      workouts: d2Workouts
    });

    // --- DAY 3: FULL BODY ATHLETICISM ---
    const d3Workouts = [];
    const chosenIds3 = [];

    const fb = pickExercises(["Full Body/Legs", "Core/Grip"], "Resistance", 1, chosenIds3);
    d3Workouts.push(...fb);
    chosenIds3.push(...fb.map(e => e.id));

    const pull = pickExercises(["Back", "Back (Lats)"], "Resistance", 1, chosenIds3);
    d3Workouts.push(...pull);
    chosenIds3.push(...pull.map(e => e.id));

    const press = pickExercises(["Chest", "Shoulders"], "Resistance", 1, chosenIds3);
    d3Workouts.push(...press);
    chosenIds3.push(...press.map(e => e.id));

    const coreAb = pickExercises(["Core"], "Resistance", 1, chosenIds3);
    d3Workouts.push(...coreAb);
    chosenIds3.push(...coreAb.map(e => e.id));

    const cardio = pickExercises(["Full Body"], "Cardio", 1, chosenIds3);
    d3Workouts.push(...cardio);

    generatedDays.push({
      day: "Day 3",
      focus: "Full Body Strength & Zone 2 Cardio",
      timeLimit: "Max 60 Mins",
      sequence: "Resistance (45 min) → Cardio (15 min)",
      workouts: d3Workouts
    });

  } else {
    // --- 4 DAYS (Upper / Lower / Hypertrophy / Full Body) ---
    // Day 1: Chest & Back
    const d1 = [];
    const c1 = [];
    const chest1 = pickExercises(["Chest"], "Resistance", 2, c1);
    d1.push(...chest1); c1.push(...chest1.map(e => e.id));
    const back1 = pickExercises(["Back", "Back (Lats)"], "Resistance", 2, c1);
    d1.push(...back1); c1.push(...back1.map(e => e.id));
    const hiit1 = pickExercises(["Full Body"], "HIIT", 1, c1);
    d1.push(...hiit1);

    generatedDays.push({
      day: "Day 1",
      focus: "Chest & Back Hypertrophy",
      timeLimit: "Max 50 Mins",
      sequence: "Resistance (35 min) → HIIT (15 min)",
      workouts: d1
    });

    // Day 2: Legs & Core
    const d2 = [];
    const c2 = [];
    const legs2 = pickExercises(["Quads", "Glutes/Legs", "Hamstrings/Glutes"], "Resistance", 3, c2);
    d2.push(...legs2); c2.push(...legs2.map(e => e.id));
    const core2 = pickExercises(["Core"], "Resistance", 1, c2);
    d2.push(...core2); c2.push(...core2.map(e => e.id));
    const cardio2 = pickExercises(["Full Body"], "Cardio", 1, c2);
    d2.push(...cardio2);

    generatedDays.push({
      day: "Day 2",
      focus: "Lower Body Focus & Cardio",
      timeLimit: "Max 65 Mins",
      sequence: "Resistance (45 min) → Cardio (20 min)",
      workouts: d2
    });

    // Day 3: Shoulders & Arms
    const d3 = [];
    const c3 = [];
    const sh3 = pickExercises(["Shoulders"], "Resistance", 2, c3);
    d3.push(...sh3); c3.push(...sh3.map(e => e.id));
    const arm3 = pickExercises(["Arms"], "Resistance", 2, c3);
    d3.push(...arm3); c3.push(...arm3.map(e => e.id));
    const hiit3 = pickExercises(["Full Body"], "HIIT", 1, c3);
    d3.push(...hiit3);

    generatedDays.push({
      day: "Day 3",
      focus: "Shoulders & Arms Volume",
      timeLimit: "Max 50 Mins",
      sequence: "Resistance (35 min) → HIIT (15 min)",
      workouts: d3
    });

    // Day 4: Full Body Power
    const d4 = [];
    const c4 = [];
    const fb4 = pickExercises(["Full Body/Legs", "Core/Grip"], "Resistance", 1, c4);
    d4.push(...fb4); c4.push(...fb4.map(e => e.id));
    const ch4 = pickExercises(["Chest"], "Resistance", 1, c4);
    d4.push(...ch4); c4.push(...ch4.map(e => e.id));
    const bk4 = pickExercises(["Back", "Back (Lats)"], "Resistance", 1, c4);
    d4.push(...bk4); c4.push(...bk4.map(e => e.id));
    const cr4 = pickExercises(["Core", "Obliques/Core"], "Resistance", 1, c4);
    d4.push(...cr4); c4.push(...cr4.map(e => e.id));
    const met4 = pickExercises(["Full Body"], "HIIT", 1, c4);
    d4.push(...met4);

    generatedDays.push({
      day: "Day 4",
      focus: "Full Body Strength & Abs Finisher",
      timeLimit: "Max 60 Mins",
      sequence: "Resistance (45 min) → Core Finisher (15 min)",
      workouts: d4
    });
  }

  // Format ID and return
  return generatedDays.map(dayObj => ({
    ...dayObj,
    workouts: dayObj.workouts.map(w => ({
      ...w,
      // Ensure unique ID inside the program template
      id: `${dayObj.day.toLowerCase().replace(" ", "")}_${w.id}`
    }))
  }));
}
