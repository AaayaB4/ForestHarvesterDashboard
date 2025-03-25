declare module 'react-gauge-chart' {
  import { Component } from 'react';

  export interface GaugeChartProps {
    id: string;
    className?: string;
    style?: object;
    nrOfLevels?: number;
    percent?: number;
    arcWidth?: number;
    arcPadding?: number;
    cornerRadius?: number;
    colors?: string[];
    textColor?: string;
    needleColor?: string;
    needleBaseColor?: string;
    hideText?: boolean;
    animate?: boolean;
    formatTextValue?: (value: number) => string;
  }

  export default class GaugeChart extends Component<GaugeChartProps> {}
} 