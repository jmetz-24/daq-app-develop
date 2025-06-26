export const standardProfiles = {
  random: [
    {
      name: "ISO 16750-3: Test Ia - Pass. Car, Engine, Small/Light - Random",
      freq: [10, 100, 300, 500, 2000],
      psd: [0.1039, 0.1039, 0.0053, 0.2078, 0.2078],
      units: "g²/Hz",
      duration: "30 hours per axis",
      grms: 18.45,
      notes: "From ISO 16750-3:2023, Table 5. For mixed-mode test with sinusoidal profile 'Test Ia - Pass. Car, Engine, Small/Light - Sine'."
    },
    {
      name: "ISO 16750-3: Test II - Pass. Car, Gearbox, Small/Light - Random",
      freq: [10, 100, 300, 500, 2000],
      psd: [0.1039, 0.1039, 0.0053, 0.0520, 0.0520],
      units: "g²/Hz",
      duration: "30 hours per axis",
      grms: 9.85,
      notes: "From ISO 16750-3:2023, Table 7. For mixed-mode test with sinusoidal profile 'Test II - Pass. Car, Gearbox, Small/Light - Sine'."
    },
    {
      name: "ISO 16750-3: Test VI - Comm. Vehicle, Engine/Gearbox, Small/Light - Random (Standard)",
      freq: [10, 20, 30, 180, 300, 600, 2000],
      psd: [0.1455, 0.2910, 0.2910, 0.0078, 0.0078, 0.2078, 0.2078],
      units: "g²/Hz",
      duration: "94 hours per axis",
      grms: 18.04,
      notes: "From ISO 16750-3:2023, Table 9. For mixed-mode test with sinusoidal profile 'Test VI - Comm. Vehicle, Engine/Gearbox, Small/Light - Sine'."
    },
    {
      name: "ISO 16750-3: Test VI - Comm. Vehicle, Engine/Gearbox, Small/Light - Random (fn < 30Hz)",
      freq: [10, 30, 45],
      psd: [0.5196, 0.3118, 0.0010],
      units: "g²/Hz",
      duration: "32 hours additionally for each critical axis",
      grms: 2.91,
      notes: "From ISO 16750-3:2023, Table 10. Additional test for DUTs with natural frequencies below 30 Hz."
    },
    {
      name: "ISO 16750-3: Test XIII - Pass. Car, Hybrid Powertrain, Large/Heavy - Sine-on-Random (Random Part)",
      freq: [10, 300, 500, 2000],
      psd: [0.0010, 0.0010, 0.0312, 0.0312],
      units: "g²/Hz",
      duration: "30 hours per axis",
      grms: 7.00,
      notes: "From ISO 16750-3:2023, Table 12. Random part of a mixed-mode test. For use with sine profiles 'Test XIII - ... - Sine'."
    },
    {
      name: "ISO 16750-3: Test XIII - Pass. Car, Hybrid Powertrain, Large/Heavy - Random (Rough Road)",
      freq: [10, 100, 500, 1000, 2000],
      psd: [0.1039, 0.0001, 0.0001, 0.0002, 0.0002],
      units: "g²/Hz",
      duration: "20 hours for each axis",
      grms: 2.96,
      notes: "From ISO 16750-3:2023, Table 13. Separate random test after the sine-on-random test."
    },
    {
      name: "ISO 16750-3: Test XV - Pass. Car, E-Motor, Large/Heavy - Random (X-axis)",
      freq: [10, 40, 240, 2000],
      psd: [0.5715, 0.2910, 0.0002, 0.0002],
      units: "g²/Hz",
      duration: "20 hours for each axis",
      grms: 3.97,
      notes: "From ISO 16750-3:2023, Table 14."
    },
    {
      name: "ISO 16750-3: Test XV - Pass. Car, E-Motor, Large/Heavy - Random (Y-axis)",
      freq: [10, 40, 200, 1000, 1400, 2000],
      psd: [0.1143, 0.1143, 0.0003, 0.0003, 0.0010, 0.0010],
      units: "g²/Hz",
      duration: "20 hours for each axis",
      grms: 2.50,
      notes: "From ISO 16750-3:2023, Table 14."
    },
    {
      name: "ISO 16750-3: Test XV - Pass. Car, E-Motor, Large/Heavy - Random (Z-axis)",
      freq: [10, 40, 160, 400, 800, 2000],
      psd: [0.5715, 0.2910, 0.0002, 0.0002, 0.0010, 0.0010],
      units: "g²/Hz",
      duration: "20 hours for each axis",
      grms: 3.98,
      notes: "From ISO 16750-3:2023, Table 14."
    },
    {
      name: "ISO 16750-3: Test XVII - Comm. Vehicle, E-Motor, Large/Heavy - Random (X & Y-axis)",
      freq: [10, 35, 100, 2000],
      psd: [0.0935, 0.0935, 0.0021, 0.0021],
      units: "g²/Hz",
      duration: "32 hours for each axis",
      grms: 2.73,
      notes: "From ISO 16750-3:2023, Table 15."
    },
    {
      name: "ISO 16750-3: Test XVII - Comm. Vehicle, E-Motor, Large/Heavy - Random (Z-axis)",
      freq: [10, 30, 90, 2000],
      psd: [0.2078, 0.2078, 0.0042, 0.0042],
      units: "g²/Hz",
      duration: "32 hours for each axis",
      grms: 3.79,
      notes: "From ISO 16750-3:2023, Table 15."
    },
    {
      name: "ISO 16750-3: Test IV - Pass. Car, Sprung Mass, Small/Light - Random",
      freq: [10, 400, 1000],
      psd: [0.3118, 0.0021, 0.0021],
      units: "g²/Hz",
      duration: "8 hours for each axis",
      grms: 2.76,
      notes: "From ISO 16750-3:2023, Table 16."
    },
    {
      name: "ISO 16750-3: Test VII - Comm. Vehicle, Sprung Mass, Small/Light - Random (Standard)",
      freq: [10, 20, 30, 180, 2000],
      psd: [0.1870, 0.3742, 0.3742, 0.0104, 0.0104],
      units: "g²/Hz",
      duration: "32 hours for each axis",
      grms: 5.90,
      notes: "From ISO 16750-3:2023, Table 17."
    },
    {
      name: "ISO 16750-3: Test XIV - HEV/EV Pass. Car, Sprung Mass, Large/Heavy - Random (X-axis)",
      freq: [10, 30, 700, 2000],
      psd: [0.1039, 0.1039, 0.00001, 0.00001],
      units: "g²/Hz",
      duration: "20 hours for each axis",
      grms: 1.93,
      notes: "From ISO 16750-3:2023, Table 19."
    },
    {
      name: "ISO 16750-3: Test XIV - HEV/EV Pass. Car, Sprung Mass, Large/Heavy - Random (Y-axis)",
      freq: [10, 50, 700, 2000],
      psd: [0.0520, 0.0520, 0.00001, 0.00001],
      units: "g²/Hz",
      duration: "20 hours for each axis",
      grms: 1.40,
      notes: "From ISO 16750-3:2023, Table 19."
    },
    {
      name: "ISO 16750-3: Test XIV - HEV/EV Pass. Car, Sprung Mass, Large/Heavy - Random (Z-axis)",
      freq: [10, 70, 500, 2000],
      psd: [0.1039, 0.1039, 0.00003, 0.00003],
      units: "g²/Hz",
      duration: "20 hours for each axis",
      grms: 2.93,
      notes: "From ISO 16750-3:2023, Table 19."
    },
    {
      name: "ISO 16750-3: Test XVI - HEV/EV Comm. Vehicle, Sprung Mass, Large/Heavy - Random",
      freq: [10, 20, 1000, 2000],
      psd: [0.3742, 0.3742, 0.0001, 0.0001],
      units: "g²/Hz",
      duration: "32 hours for each axis",
      grms: 3.25,
      notes: "From ISO 16750-3:2023, Table 20."
    },
    {
      name: "ISO 16750-3: Test V - Pass. Car, Unsprung Mass, Small/Light - Random",
      freq: [20, 40, 300, 800, 1000, 2000],
      psd: [2.0780, 2.0780, 0.0052, 0.0052, 0.0312, 0.0312],
      units: "g²/Hz",
      duration: "8 hours for each axis",
      grms: 10.94,
      notes: "From ISO 16750-3:2023, Table 21."
    },
    {
      name: "ISO 16750-3: Test VIII - Comm. Vehicle, Decoupled Cab - Random (X-axis)",
      freq: [10, 19, 50, 500, 2000],
      psd: [0.0312, 0.0312, 0.0010, 0.0010, 0.0001],
      units: "g²/Hz",
      duration: "32 hours for each axis",
      grms: 1.20,
      notes: "From ISO 16750-3:2023, Table 24."
    },
    {
      name: "ISO 16750-3: Test VIII - Comm. Vehicle, Decoupled Cab - Random (Y-axis)",
      freq: [10, 13, 50, 500, 2000],
      psd: [0.1039, 0.1039, 0.0010, 0.0010, 0.0001],
      units: "g²/Hz",
      duration: "32 hours for each axis",
      grms: 1.34,
      notes: "From ISO 16750-3:2023, Table 24."
    },
    {
      name: "ISO 16750-3: Test VIII - Comm. Vehicle, Decoupled Cab - Random (Z-axis)",
      freq: [10, 20, 100, 500, 2000],
      psd: [0.2078, 0.2078, 0.0010, 0.0010, 0.0001],
      units: "g²/Hz",
      duration: "32 hours for each axis",
      grms: 2.17,
      notes: "From ISO 16750-3:2023, Table 24."
    },
    {
      name: "ISO 16750-3: Test XI - Pass. Car, Solid Intake Manifold, Small/Light - Random",
      freq: [10, 100, 200, 500, 2000],
      psd: [0.1039, 0.1039, 0.0208, 0.2078, 0.2078],
      units: "g²/Hz",
      duration: "30 hours for each axis",
      grms: 18.81,
      notes: "From ISO 16750-3:2023, Table 27. For mixed-mode test with sinusoidal profile 'Test XI - ... - Sine'."
    },
    {
      name: "ISO 16750-3: Test Ib - Rotating Machines, Engine Mounted - Random",
      freq: [10, 100, 150, 700, 800, 2000],
      psd: [0.1039, 0.1039, 0.0010, 0.0010, 0.1039, 0.1039],
      units: "g²/Hz",
      duration: "14h (Pass. Car) / 28h (Comm. Vehicle) per axis",
      grms: 11.74,
      notes: "From ISO 16750-3:2023, Table 30. For mixed-mode test with sinusoidal profile 'Test Ib - ... - Sine'."
    },
    {
      name: "ISO 16750-3: Test XIIc - Pass. Car, Exhaust (behind decoupling), Large/Heavy - Random",
      freq: [10, 20, 30, 180, 300, 500, 2000],
      psd: [0.1455, 0.2910, 0.2910, 0.0078, 0.0078, 0.0208, 0.0208],
      units: "g²/Hz",
      duration: "40 hours for each axis",
      grms: 6.87,
      notes: "From ISO 16750-3:2023, Table 33. For mixed-mode test with sinusoidal profile 'Test XIIc - ... - Sine'."
    },
    {
      name: "ISO 16750-3: Test X - Pass. Car, GDI Fuel Rail, Small/Light - Random",
      freq: [10, 100, 600, 2800],
      psd: [0.1039, 0.1039, 0.5196, 0.5196],
      units: "g²/Hz",
      duration: "100 hours for each axis",
      grms: 36.29,
      notes: "From ISO 16750-3:2023, Table 35. For mixed-mode test with sinusoidal profile 'Test X - ... - Sine'."
    }
  ],
  sine: [
    {
      name: "ISO 16750-3: Test Ia (≤5 cylinders) - Pass. Car, Engine, Small/Light - Sine",
      freq: [100, 200, 240, 270, 440],
      peak: [10.19, 20.39, 20.39, 10.19, 10.19],
      units: "g",
      duration: "30 hours per axis",
      sweep: "≤0.5 Oct/min",
      notes: "From ISO 16750-3:2023, Table 4, Curve 1. Sine part of a mixed-mode test."
    },
    {
      name: "ISO 16750-3: Test Ia (≥6 cylinders) - Pass. Car, Engine, Small/Light - Sine",
      freq: [100, 150, 440],
      peak: [10.19, 15.29, 15.29],
      units: "g",
      duration: "30 hours per axis",
      sweep: "≤0.5 Oct/min",
      notes: "From ISO 16750-3:2023, Table 4, Curve 2. Sine part of a mixed-mode test."
    },
    {
      name: "ISO 16750-3: Test Ia (Combination) - Pass. Car, Engine, Small/Light - Sine",
      freq: [100, 200, 240, 255, 440],
      peak: [10.19, 20.39, 20.39, 15.29, 15.29],
      units: "g",
      duration: "30 hours per axis",
      sweep: "≤0.5 Oct/min",
      notes: "From ISO 16750-3:2023, Table 4, Combination. Sine part of a mixed-mode test."
    },
    {
      name: "ISO 16750-3: Test II - Pass. Car, Gearbox, Small/Light - Sine",
      freq: [100, 200, 440],
      peak: [3.06, 6.12, 6.12],
      units: "g",
      duration: "30 hours per axis",
      sweep: "≤0.5 Oct/min",
      notes: "From ISO 16750-3:2023, Table 6. Sine part of a mixed-mode test."
    },
    {
      name: "ISO 16750-3: Test VI - Comm. Vehicle, Engine/Gearbox, Small/Light - Sine",
      freq: [20, 65, 260, 270, 350, 360, 520],
      peak: [2.65, 12.23, 12.23, 9.17, 9.17, 6.12, 6.12],
      units: "g",
      duration: "94 hours per axis",
      sweep: "≤0.5 Oct/min",
      notes: "From ISO 16750-3:2023, Table 8. Sine part of a mixed-mode test."
    },
    {
      name: "ISO 16750-3: Test XIII - Pass. Car, Hybrid Powertrain, Large/Heavy - Sine (X-axis)",
      freq: [100, 160, 185, 200, 440],
      peak: [1.02, 3.77, 3.77, 2.55, 2.55],
      units: "g",
      duration: "30 hours per axis",
      sweep: "≤0.5 Oct/min",
      notes: "From ISO 16750-3:2023, Table 11. Sine part of a mixed-mode test."
    },
    {
      name: "ISO 16750-3: Test XIII - Pass. Car, Hybrid Powertrain, Large/Heavy - Sine (Y-axis)",
      freq: [100, 180, 240, 260, 440],
      peak: [1.53, 5.10, 5.10, 3.06, 3.06],
      units: "g",
      duration: "30 hours per axis",
      sweep: "≤0.5 Oct/min",
      notes: "From ISO 16750-3:2023, Table 11. Sine part of a mixed-mode test."
    },
    {
      name: "ISO 16750-3: Test XIII - Pass. Car, Hybrid Powertrain, Large/Heavy - Sine (Z-axis)",
      freq: [100, 210, 330, 440],
      peak: [2.14, 4.28, 4.28, 2.85],
      units: "g",
      duration: "30 hours per axis",
      sweep: "≤0.5 Oct/min",
      notes: "From ISO 16750-3:2023, Table 11. Sine part of a mixed-mode test."
    },
    {
      name: "ISO 16750-3: Test IX - Comm. Vehicle, Unsprung Mass, Small/Light - Sine (<40Hz)",
      freq: [8, 16, 32],
      peak: [15.29, 12.23, 10.19],
      units: "g",
      duration: "Varies (see notes)",
      sweep: "Frequency sweep",
      notes: "From ISO 16750-3:2023, Table 22. Multiple steps with different durations. Z-axis levels are higher (300, 250, 200 m/s²). Perform Random Test VII in addition."
    },
    {
      name: "ISO 16750-3: Test IX - Comm. Vehicle, Unsprung Mass, Small/Light - Sine (≥40Hz)",
      freq: [35],
      peak: [15.29, 12.23, 10.19],
      units: "g",
      duration: "Varies by cycles (2800, 7000, 21000)",
      sweep: "Fixed frequency",
      notes: "From ISO 16750-3:2023, Table 23. Multiple steps with different cycle counts. Z-axis levels are higher (300, 250, 200 m/s²). Perform Random Test VII in addition."
    },
    {
      name: "ISO 16750-3: Test III - Pass. Car, Flexible Plenum Chamber, Small/Light - Sine",
      freq: [100, 200, 325, 500, 1500],
      peak: [9.17, 18.35, 18.35, 8.15, 8.15],
      units: "g",
      duration: "30 hours per axis",
      sweep: "≤0.5 Oct/min",
      notes: "From ISO 16750-3:2023, Table 25."
    },
    {
      name: "ISO 16750-3: Test XI - Pass. Car, Solid Intake Manifold, Small/Light - Sine",
      freq: [100, 150, 200, 240, 300, 440],
      peak: [5.10, 10.19, 15.29, 15.29, 7.65, 7.65],
      units: "g",
      duration: "30 hours per axis",
      sweep: "≤0.5 Oct/min",
      notes: "From ISO 16750-3:2023, Table 26. Sine part of a mixed-mode test."
    },
    {
      name: "ISO 16750-3: Test Ib - Rotating Machines, Engine Mounted - Sine",
      freq: [100, 200, 800],
      peak: [2.04, 5.10, 5.10],
      units: "g",
      duration: "14h (Pass. Car) / 28h (Comm. Vehicle) per axis",
      sweep: "≤0.5 Oct/min",
      notes: "From ISO 16750-3:2023, Table 29. Sine part of a mixed-mode test."
    },
    {
      name: "ISO 16750-3: Test XIIa - Pass. Car, Exhaust Sensor, Small/Light - Sine",
      freq: [50, 160, 2000],
      peak: [30.58],
      units: "g",
      duration: "50 hours per axis",
      sweep: "≤0.5 Oct/min",
      notes: "From ISO 16750-3:2023, Table 31. Constant displacement of 0.3mm from 50-160Hz, then constant acceleration of 300 m/s² from 160-2000Hz. The peak g value is at 160Hz."
    },
    {
      name: "ISO 16750-3: Test XIIc - Pass. Car, Exhaust (behind decoupling), Large/Heavy - Sine",
      freq: [125, 250, 260, 500],
      peak: [6.12, 6.12, 4.08, 4.08],
      units: "g",
      duration: "40 hours per axis",
      sweep: "≤0.5 Oct/min",
      notes: "From ISO 16750-3:2023, Table 32. Sine part of a mixed-mode test."
    },
    {
      name: "ISO 16750-3: Test X - Pass. Car, GDI Fuel Rail, Small/Light - Sine",
      freq: [100, 200, 400, 600, 2000, 2800],
      peak: [10.19, 20.39, 20.39, 56.07, 56.07, 50.97],
      units: "g",
      duration: "100 hours per axis",
      sweep: "≤0.5 Oct/min",
      notes: "From ISO 16750-3:2023, Table 34. Sine part of a mixed-mode test."
    }
  ],
  shock: [
    {
      name: "ISO 16750-3: Shock I (Profile A) - Doors/Flaps, Pass. Car",
      type: "Half-Sine",
      peak: 50.97,
      duration: 11,
      units: "g",
      shocks: "Varies by location (24000 for driver door, 1320 for hood, etc.)",
      notes: "From ISO 16750-3:2023, Table 36."
    },
    {
      name: "ISO 16750-3: Shock I (Profile B) - Doors/Flaps, Pass. Car",
      type: "Half-Sine",
      peak: 30.58,
      duration: 6,
      units: "g",
      shocks: "Varies by location (184000 for driver door, 5500 for hood, etc.)",
      notes: "From ISO 16750-3:2023, Table 36. Considered an accelerated test of Profile A."
    },
    {
      name: "ISO 16750-3: Shock II - Rigid Body/Frame",
      type: "Half-Sine",
      peak: 50.97,
      duration: 6,
      units: "g",
      shocks: "10 per test direction",
      notes: "From ISO 16750-3:2023, Section 4.2.2.2. Simulates driving over a curb stone."
    },
    {
      name: "ISO 16750-3: Shock III - Gearbox Shifting (Commercial Vehicle)",
      type: "Half-Sine",
      peak: 305.81,
      duration: "<1",
      units: "g",
      shocks: "To be agreed between customer and supplier",
      notes: "From ISO 16750-3:2023, Section 4.2.3.2. For pneumatic powered gear-shifting operations."
    }
  ]
};