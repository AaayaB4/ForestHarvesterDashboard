export interface SensorData {
  Hydraulic_Pressure: number;
  Hydraulic_Oil_Temperature: number;
  Saw_Blade_RPM: number;
  Fuel_Consumption: number;
  Blade_Sharpness_Level: number;
}

export interface SensorColors {
  Hydraulic_Pressure: 'green' | 'yellow' | 'red';
  Hydraulic_Oil_Temperature: 'green' | 'yellow' | 'red';
  Saw_Blade_RPM: 'green' | 'yellow' | 'red';
  Fuel_Consumption: 'green' | 'yellow' | 'red';
  Blade_Sharpness_Level: 'green' | 'yellow' | 'red';
}

export interface ApiResponse {
  sensor_data: SensorData[];
  color: SensorColors[];
  prediction: string;
}

export interface HistoricalDataPoint {
  timestamp: string;
  value: number;
} 