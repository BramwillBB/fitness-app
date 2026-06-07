import React, { useState } from 'react';

const GOAL_OPTIONS = [
  { id: 'strength', title: 'Gain Strength', desc: 'Build heavy muscle power and joint resilience', icon: 'fitness_center' },
  { id: 'fat_loss', title: 'Fat Loss', desc: 'Spike metabolism and burn visceral fat', icon: 'local_fire_department' },
  { id: 'hypertrophy', title: 'Muscle Growth', desc: 'Maximize hypertrophy and physical symmetry', icon: 'trophy' },
  { id: 'mobility', title: 'Mobility & Longevity', desc: 'Protect joints, build core strength, reduce aches', icon: 'self_improvement' }
];

const MUSCLE_OPTIONS = [
  { id: 'Chest', title: 'Chest', icon: 'view_in_ar' },
  { id: 'Back', title: 'Back / Lats', icon: 'line_weight' },
  { id: 'Shoulders', title: 'Shoulders', icon: 'accessibility' },
  { id: 'Arms', title: 'Bicep/Tricep Arms', icon: 'handshake' },
  { id: 'Quads', title: 'Legs / Quads', icon: 'directions_walk' },
  { id: 'Core', title: 'Abdominals & Core', icon: 'shield' }
];

const INJURY_OPTIONS = [
  { id: 'lower_back', title: 'Lower Back Sensitivity', desc: 'Excludes conventional deadlifts/barbell rows' },
  { id: 'knees', title: 'Knee Strains', desc: 'Excludes weighted walking lunges/leg extensions' },
  { id: 'shoulders', title: 'Shoulder Issues', desc: 'Excludes overhead press/bench press variants' }
];

const EQUIP_OPTIONS = [
  { id: 'gym', title: 'Commercial Gym', desc: 'Access to barbells, heavy plates, dumbbells, and machine racks', icon: 'corporate_fare' },
  { id: 'home', title: 'Home Gym', desc: 'Access to dumbbells, kettlebells, and adjustable benches', icon: 'home' },
  { id: 'bodyweight', title: 'Bodyweight Only', desc: 'Zero equipment needed—pure calisthenics and gravity resistance', icon: 'sports_gymnastics' }
];

const FREQ_OPTIONS = [
  { id: 2, title: '2 Days / Week', desc: 'Perfect for busy schedules. Focused on primary compound movements.' },
  { id: 3, title: '3 Days / Week', desc: 'Highly recommended. Alternating push/pull splits with cardio.' },
  { id: 4, title: '4 Days / Week', desc: 'Advanced. Deep muscle group breakdowns with dedicated cardio slots.' }
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState(35);
  const [weight, setWeight] = useState(80);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [selectedInjuries, setSelectedInjuries] = useState([]);
  const [selectedEquip, setSelectedEquip] = useState('gym');
  const [selectedFreq, setSelectedFreq] = useState(3);

  // Dynamic status text for the loading engine animation
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingMessages = [
    "Analyzing body profile and age-based heart-rate zones...",
    "Filtering exercise library for joint sensitivity and constraints...",
    "Selecting biomechanically optimal compound and isolation sets...",
    "Structuring weekly frequency and progression volume...",
    "Creating your dynamic IronCore profile..."
  ];

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      // Step 7: Loading animation trigger
      setStep(7);
      let interval = setInterval(() => {
        setLoadingStep(prev => {
          if (prev >= loadingMessages.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              onComplete({
                age,
                weightKg: weight,
                goals: selectedGoals,
                focusAreas: selectedMuscles,
                injuries: selectedInjuries,
                equipment: selectedEquip,
                daysPerWeek: selectedFreq
              });
            }, 800);
            return prev;
          }
          return prev + 1;
        });
      }, 900);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleGoal = (id) => {
    setSelectedGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  };

  const toggleMuscle = (id) => {
    setSelectedMuscles(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const toggleInjury = (id) => {
    setSelectedInjuries(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const renderProgress = () => {
    if (step > 6) return null;
    return (
      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden mb-8">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out" 
          style={{ width: `${(step / 6) * 100}%` }}
        />
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-margin-mobile">
      <div className="card backdrop-blur-md bg-surface-container/60 border border-surface-variant p-6 md:p-8 rounded-2xl relative shadow-2xl overflow-hidden">
        
        {renderProgress()}

        {/* STEP 1: BIOMETRICS */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="font-headline-lg text-[24px] font-bold text-on-surface mb-2">Tell Us About Yourself</h2>
            <p className="text-on-surface-variant font-body-md mb-8">This helps adjust estimated calorie burns, joint guidelines, and progression milestones.</p>
            
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-label-md text-on-surface font-semibold">Age</label>
                  <span className="text-primary font-bold">{age} Years</span>
                </div>
                <input 
                  type="range" 
                  min="16" 
                  max="85" 
                  value={age} 
                  onChange={e => setAge(Number(e.target.value))} 
                  className="w-full accent-primary h-2 bg-surface-variant rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-label-md text-on-surface font-semibold">Weight</label>
                  <span className="text-primary font-bold">{weight} kg</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="160" 
                  value={weight} 
                  onChange={e => setWeight(Number(e.target.value))} 
                  className="w-full accent-primary h-2 bg-surface-variant rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: GOALS */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="font-headline-lg text-[24px] font-bold text-on-surface mb-2">Select Your Primary Goals</h2>
            <p className="text-on-surface-variant font-body-md mb-6">Choose as many as apply to build your program structure.</p>
            
            <div className="grid grid-cols-1 gap-3 max-h-[350px] overflow-y-auto pr-1">
              {GOAL_OPTIONS.map(g => {
                const isSelected = selectedGoals.includes(g.id);
                return (
                  <button 
                    key={g.id}
                    onClick={() => toggleGoal(g.id)}
                    className={`flex items-start text-left p-4 rounded-xl border transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/10 text-on-surface shadow-md' 
                        : 'border-surface-variant bg-surface-container-low hover:border-primary/50 text-on-surface-variant'
                    }`}
                  >
                    <span className={`material-symbols-outlined mr-3 p-1 rounded-md ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {g.icon}
                    </span>
                    <div>
                      <h3 className="font-title-md font-bold text-on-surface">{g.title}</h3>
                      <p className="font-body-sm text-[13px] opacity-80 mt-0.5">{g.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: FOCUS AREAS */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="font-headline-lg text-[24px] font-bold text-on-surface mb-2">Target Muscle Focus</h2>
            <p className="text-on-surface-variant font-body-md mb-6">Which sections of your physique would you like to prioritize?</p>
            
            <div className="grid grid-cols-2 gap-3">
              {MUSCLE_OPTIONS.map(m => {
                const isSelected = selectedMuscles.includes(m.id);
                return (
                  <button 
                    key={m.id}
                    onClick={() => toggleMuscle(m.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/10 text-primary font-bold shadow-md' 
                        : 'border-surface-variant bg-surface-container-low hover:border-primary/50 text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined mb-2 text-2xl">
                      {m.icon}
                    </span>
                    <span className="font-label-md text-on-surface">{m.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: INJURIES */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h2 className="font-headline-lg text-[24px] font-bold text-on-surface mb-2">Joint Strains & Injuries</h2>
            <p className="text-on-surface-variant font-body-md mb-6">Choose any joint limitations. We will replace risky lifts with spine & knee friendly alternatives.</p>
            
            <div className="flex flex-col gap-3">
              {INJURY_OPTIONS.map(inj => {
                const isSelected = selectedInjuries.includes(inj.id);
                return (
                  <button
                    key={inj.id}
                    onClick={() => toggleInjury(inj.id)}
                    className={`flex justify-between items-center text-left p-4 rounded-xl border transition-all ${
                      isSelected 
                        ? 'border-red-500 bg-red-500/10 text-on-surface shadow-md' 
                        : 'border-surface-variant bg-surface-container-low hover:border-primary/50 text-on-surface-variant'
                    }`}
                  >
                    <div>
                      <h3 className="font-title-md font-bold text-on-surface">{inj.title}</h3>
                      <p className="font-body-sm text-[12px] opacity-80 mt-0.5">{inj.desc}</p>
                    </div>
                    <span className={`material-symbols-outlined ${isSelected ? 'text-red-500' : 'opacity-20'}`}>
                      {isSelected ? 'cancel' : 'radio_button_unchecked'}
                    </span>
                  </button>
                );
              })}
              
              <button 
                onClick={() => setSelectedInjuries([])}
                className={`text-center py-2 text-primary font-label-md hover:underline ${selectedInjuries.length === 0 ? 'invisible' : ''}`}
              >
                Clear all injury exclusions
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: EQUIPMENT */}
        {step === 5 && (
          <div className="animate-fade-in">
            <h2 className="font-headline-lg text-[24px] font-bold text-on-surface mb-2">Equipment Availability</h2>
            <p className="text-on-surface-variant font-body-md mb-6">What workout gear do you have access to?</p>
            
            <div className="flex flex-col gap-3">
              {EQUIP_OPTIONS.map(eq => {
                const isSelected = selectedEquip === eq.id;
                return (
                  <button 
                    key={eq.id}
                    onClick={() => setSelectedEquip(eq.id)}
                    className={`flex items-start text-left p-4 rounded-xl border transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/10 text-on-surface shadow-md' 
                        : 'border-surface-variant bg-surface-container-low hover:border-primary/50 text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined mr-3 text-2xl text-primary">
                      {eq.icon}
                    </span>
                    <div>
                      <h3 className="font-title-md font-bold text-on-surface">{eq.title}</h3>
                      <p className="font-body-sm text-[12px] opacity-80 mt-0.5">{eq.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: FREQUENCY */}
        {step === 6 && (
          <div className="animate-fade-in">
            <h2 className="font-headline-lg text-[24px] font-bold text-on-surface mb-2">Weekly Schedule</h2>
            <p className="text-on-surface-variant font-body-md mb-6">How many days per week are you planning to train?</p>
            
            <div className="flex flex-col gap-3">
              {FREQ_OPTIONS.map(fr => {
                const isSelected = selectedFreq === fr.id;
                return (
                  <button 
                    key={fr.id}
                    onClick={() => setSelectedFreq(fr.id)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/10 text-on-surface shadow-md' 
                        : 'border-surface-variant bg-surface-container-low hover:border-primary/50 text-on-surface-variant'
                    }`}
                  >
                    <h3 className="font-title-md font-bold text-on-surface">{fr.title}</h3>
                    <p className="font-body-sm text-[12px] opacity-80 mt-0.5">{fr.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 7: DYNAMIC ENGINE LOADING PAGE */}
        {step === 7 && (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
            <h3 className="font-headline-sm text-on-surface font-bold mb-2">Configuring Your Program</h3>
            <p className="text-primary font-mono text-[14px] px-4 min-h-[40px] transition-all duration-300">
              {loadingMessages[loadingStep]}
            </p>
            <div className="w-48 bg-surface-variant h-1 rounded-full overflow-hidden mt-6">
              <div 
                className="bg-primary h-full transition-all duration-500 ease-out"
                style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* NAV FOOTER BUTTONS */}
        {step <= 6 && (
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-surface-variant">
            <button 
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center font-label-md px-4 py-2 rounded-lg transition-colors ${
                step === 1 ? 'opacity-30 cursor-not-allowed text-on-surface-variant' : 'text-primary hover:bg-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined mr-1 text-sm">arrow_back</span>
              Back
            </button>

            <button 
              onClick={handleNext}
              className="flex items-center bg-primary text-black font-bold font-label-md px-6 py-2.5 rounded-lg hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer"
            >
              {step === 6 ? 'Generate Program' : 'Next'}
              <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
