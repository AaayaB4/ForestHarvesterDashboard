import { ApiResponse } from '../types/dashboard';

// For now, we'll use mock data instead of real API calls to avoid CORS issues
const generateMockData = (): ApiResponse => {
  return {
    sensor_data: [{
      Hydraulic_Pressure: 200 + Math.random() * 50,
      Hydraulic_Oil_Temperature: 50 + Math.random() * 20,
      Saw_Blade_RPM: 1500 + Math.random() * 500,
      Fuel_Consumption: 15 + Math.random() * 5,
      Blade_Sharpness_Level: 70 + Math.random() * 20,
    }],
    color: [{
      Hydraulic_Pressure: Math.random() > 0.7 ? 'red' : Math.random() > 0.4 ? 'yellow' : 'green',
      Hydraulic_Oil_Temperature: Math.random() > 0.7 ? 'red' : Math.random() > 0.4 ? 'yellow' : 'green',
      Saw_Blade_RPM: Math.random() > 0.7 ? 'red' : Math.random() > 0.4 ? 'yellow' : 'green',
      Fuel_Consumption: Math.random() > 0.7 ? 'red' : Math.random() > 0.4 ? 'yellow' : 'green',
      Blade_Sharpness_Level: Math.random() > 0.7 ? 'red' : Math.random() > 0.4 ? 'yellow' : 'green',
    }],
    prediction: Math.random() > 0.7 ? 'Maintenance Required' : 'Normal Operation',
  };
};

export const fetchSensorData = async (): Promise<ApiResponse> => {
  // Return mock data immediately
  return generateMockData();
}; 