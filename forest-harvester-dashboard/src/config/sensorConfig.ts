export const sensorConfig = {
  Hydraulic_Pressure: {
    label: 'Hydraulic Pressure',
    unit: 'bar',
    min: 145,
    max: 300,
    color: '#4CAF50',
    description: 'Monitors the hydraulic system pressure for optimal cutting performance',
  },
  Hydraulic_Oil_Temperature: {
    label: 'Oil Temperature',
    unit: '°C',
    min: 20,
    max: 85,
    color: '#FF5252',
    description: 'Tracks hydraulic oil temperature to prevent system overheating',
  },
  Saw_Blade_RPM: {
    label: 'Blade RPM',
    unit: 'RPM',
    min: 700,
    max: 2700,
    color: '#2196F3',
    description: 'Measures saw blade rotation speed for efficient cutting',
  },
  Fuel_Consumption: {
    label: 'Fuel Usage',
    unit: 'L/h',
    min: 10,
    max: 24,
    color: '#FFC107',
    description: 'Monitors fuel consumption rate for efficiency tracking',
  },
  Blade_Sharpness_Level: {
    label: 'Blade Sharpness',
    unit: '%',
    min: 29,
    max: 100,
    color: '#9C27B0',
    description: 'Indicates saw blade sharpness level for maintenance planning',
  },
}; 