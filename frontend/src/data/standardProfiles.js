// src/data/standardProfiles.js

export const standardProfiles = {
  random: [
    { name: "Zone 3 (ADM) - Longitudinal", freq: [5, 8, 10, 14, 20, 100, 500, 1000, 2000], psd: [0.05, 0.06, 0.1, 0.06, 0.005, 0.002, 0.001, 0.0005, 0.0005], units: "g²/Hz", duration: "24 hours", grms: 1.54 },
    { name: "Zone 3 (ADM) - Lateral", freq: [5, 8, 10, 14, 20, 100, 500, 1000, 2000], psd: [0.05, 0.06, 0.1, 0.06, 0.005, 0.002, 0.001, 0.0005, 0.0005], units: "g²/Hz", duration: "24 hours", grms: 1.54 },
    { name: "Zone 3 (ADM) - Vertical", freq: [5, 8, 10, 14, 20, 30, 40, 50, 100, 500, 1000, 2000], psd: [0.05, 0.06, 0.1, 0.06, 0.005, 0.04, 0.03, 0.01, 0.002, 0.001, 0.0005, 0.0005], units: "g²/Hz", duration: "24 hours", grms: 1.75 },
    { name: "Zone 4S (Roof Pod) - Longitudinal", freq: [5, 8, 10, 14, 20, 100, 500, 1000, 2000], psd: [0.05, 0.06, 0.1, 0.06, 0.005, 0.002, 0.001, 0.0005, 0.0005], units: "g²/Hz", duration: "24 hours", grms: 1.54 },
    { name: "Zone 4S (Roof Pod) - Lateral", freq: [5, 8, 10, 14, 17, 100, 500, 1000, 2000], psd: [0.05, 0.06, 0.2, 0.1, 0.01, 0.002, 0.001, 0.0005, 0.0005], units: "g²/Hz", duration: "24 hours", grms: 1.67 },
    { name: "Zone 4S (Roof Pod) - Vertical", freq: [5, 8, 10, 14, 20, 100, 500, 1000, 2000], psd: [0.02, 0.04, 0.06, 0.06, 0.02, 0.002, 0.001, 0.0005, 0.0005], units: "g²/Hz", duration: "24 hours", grms: 1.57 },
    { name: "Zone 5 (NRP) - Longitudinal", freq: [5, 8, 10, 20, 100, 250, 300, 2000], psd: [0.02, 0.04, 0.05, 0.05, 0.02, 0.015, 0.01, 0.01], units: "g²/Hz", duration: "12 hours", grms: 4.81 },
    { name: "Zone 5 (NRP) - Lateral", freq: [5, 8, 11, 20, 25, 100, 250, 300, 2000], psd: [0.05, 0.1, 0.4, 0.2, 0.1, 0.05, 0.015, 0.01, 0.01], units: "g²/Hz", duration: "48 hours", grms: 5.54 },
    { name: "Zone 5 (NRP) - Vertical", freq: [5, 8, 11, 20, 25, 100, 250, 300, 2000], psd: [0.05, 0.06, 0.2, 0.1, 0.05, 0.03, 0.015, 0.01, 0.01], units: "g²/Hz", duration: "24 hours", grms: 5.06 },
    { name: "Zone 5 (NRP) Short - Longitudinal", freq: [200, 1000, 2000], psd: [0.1, 0.3, 0.1], units: "g²/Hz", duration: "1 hour", grms: 18.37 },
    { name: "Zone 5 (NRP) Short - Lateral", freq: [200, 1000, 2000], psd: [0.3, 0.6, 0.2], units: "g²/Hz", duration: "1 hour", grms: 26.82 },
    { name: "Zone 5 (NRP) Short - Vertical", freq: [200, 1000, 2000], psd: [0.2, 0.6, 0.2], units: "g²/Hz", duration: "1 hour", grms: 25.98 },
    { name: "Zone 2 (Cabin) - Longitudinal", freq: [5, 8, 10, 14, 20, 45, 50, 70, 100, 500, 1000, 2000], psd: [0.05, 0.06, 0.1, 0.06, 0.007, 0.005, 0.01, 0.008, 0.002, 0.001, 0.0005, 0.0005], units: "g²/Hz", duration: "24 hours", grms: 1.62 },
    { name: "Zone 2 (Cabin) - Lateral", freq: [5, 8, 10, 14, 17, 100, 500, 1000, 2000], psd: [0.05, 0.06, 0.2, 0.1, 0.01, 0.002, 0.001, 0.0005, 0.0005], units: "g²/Hz", duration: "24 hours", grms: 1.67 },
    { name: "Zone 2 (Cabin) - Vertical", freq: [5, 8, 10, 14, 20, 100, 500, 1000, 2000], psd: [0.02, 0.04, 0.06, 0.06, 0.02, 0.002, 0.001, 0.0005, 0.0005], units: "g²/Hz", duration: "24 hours", grms: 1.57 },
  ],
  sine: [
    { name: "Zone 3 (ADM) - All Axes", freq: [5, 10, 15, 30], peak: [0.5, 1.5, 1.5, 0.5], units: 'g', duration: "4 hours", sweep: "1 Oct/min" },
    { name: "Zone 4S (Roof Pod) - Longitudinal", freq: [5, 10, 15, 30], peak: [0.5, 1.5, 1.5, 0.5], units: 'g', duration: "4 hours", sweep: "1 Oct/min" },
    { name: "Zone 4S (Roof Pod) - Lateral/Vertical", freq: [5, 10, 15, 30], peak: [0.5, 2.0, 2.0, 0.5], units: 'g', duration: "4 hours", sweep: "1 Oct/min" },
    { name: "Zone 5 (NRP) - Longitudinal", freq: [5, 10, 15, 30], peak: [0.5, 1.5, 1.5, 0.5], units: 'g', duration: "4 hours", sweep: "1 Oct/min" },
    { name: "Zone 5 (NRP) - Lateral", freq: [5, 10, 15, 30], peak: [1.0, 3.0, 3.0, 1.0], units: 'g', duration: "4 hours", sweep: "1 Oct/min" },
    { name: "Zone 5 (NRP) - Vertical", freq: [5, 10, 15, 30], peak: [1.0, 2.5, 2.5, 2.0], units: 'g', duration: "4 hours", sweep: "1 Oct/min" },
  ],
  shock: [
    { name: "NRP/IMU/Audio (All Axes)", type: "Half-Sine", peak: 30, duration: 18, units: 'g', shocks: "3 per direction" },
    { name: "ADM/Roof Pod/Antenna (All Axes)", type: "Half-Sine", peak: 20, duration: 6, units: 'g', shocks: "100 per direction" },
  ]
};