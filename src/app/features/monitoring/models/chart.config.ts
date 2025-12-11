import { SeriesOptionsType, Options } from 'highcharts';

export const CHART_SERIES_CONFIG: Partial<SeriesOptionsType> = {
  type: 'line',
  marker: {
    enabled: false,
  },
  states: {
    hover: {
      enabled: false,
    },
  },
  dataGrouping: {
    enabled: false,
  },
  step: 'left',
  shadow: false,
};

export const CHART_OPTIONS: Partial<Options> = {
  plotOptions: {
    series: {
      turboThreshold: 0,
    },
  },
  chart: {
    animation: false,
    backgroundColor: '#0f172a',
    borderColor: '#1f2937',
    borderWidth: 1,
    spacing: [16, 16, 16, 16],
    style: {
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      color: '#e2e8f0',
    },
  },
  colors: [
    '#38bdf8', // sky
    '#22c55e', // green
    '#f97316', // orange
    '#a78bfa', // purple
    '#f43f5e', // rose
    '#eab308', // amber
    '#14b8a6', // teal
    '#3b82f6', // blue
    '#ef4444', // red
    '#8b5cf6', // violet
    '#10b981', // emerald
    '#f59e0b', // yellow
  ],
  tooltip: {
    enabled: false,
  },
  title: {
    text: undefined,
  },
  credits: {
    enabled: false,
  },
  legend: {
    itemStyle: { color: '#e2e8f0', fontWeight: '500' },
    itemHoverStyle: { color: '#f8fafc' },
    events: {
      itemClick: function () {
        return false;
      },
    },
  },
  xAxis: {
    type: 'datetime',
    gridLineColor: '#1f2937',
    lineColor: '#1f2937',
    tickColor: '#334155',
    title: { text: 'Time', style: { color: '#e2e8f0' } },
    labels: {
      style: {
        color: '#cbd5e1',
        fontSize: '11px',
      },
      format: '{value:%H:%M:%S}',
    },
  },
  yAxis: [
    {
      opposite: false,
      gridLineColor: '#1f2937',
      labels: {
        style: {
          color: '#cbd5e1',
          fontSize: '11px',
        },
      },
      title: { text: 'Numeric values', style: { color: '#e2e8f0' } },
    },
    {
      title: { text: 'Bool state', style: { color: '#e2e8f0' } },
      min: 0,
      max: 1,
      tickPositions: [0, 1],
      opposite: true,
      gridLineWidth: 0,
      labels: {
        style: {
          color: '#cbd5e1',
          fontSize: '11px',
        },
      },
    },
  ],
};
