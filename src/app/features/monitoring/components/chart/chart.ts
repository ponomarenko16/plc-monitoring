import { CommonModule } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { Chart, Options, SeriesOptionsType } from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { CHART_OPTIONS, CHART_SERIES_CONFIG } from '../../models/chart.config';
import Highcharts from 'highcharts';
import { PlcValue } from '../../models/plc-value';
import { PlcVariable } from '../../models/plc-variable';

const MAX_POINTS = 50;

@Component({
  selector: 'plcm-monitoring-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartComponent],
  templateUrl: './chart.html',
  styleUrls: ['./chart.scss'],
})
export class ChartComponent {
  plcValues = input<Map<string, PlcValue>>();
  enabledVariables = input<PlcVariable[]>([]);
  chartInstance = signal<Chart | null>(null);

  chartOptions: Options = {
    ...CHART_OPTIONS,
  };

  onChartInstance(instance: Chart) {
    this.chartInstance.set(instance);
  }

  constructor() {
    effect(() => {
      const chartInstance = this.chartInstance();
      const plcValues = this.plcValues();
      const enabledVariables = this.enabledVariables();

      if (!chartInstance || !plcValues) return;

      let shouldRedraw = false;

      chartInstance.series.slice().forEach((series) => {
        const id = series.options.id as string | undefined;
        if (id && !enabledVariables.some((v) => v.id === id)) {
          series.remove(false);
          shouldRedraw = true;
        }
      });

      enabledVariables.forEach((variable) => {
        const point = plcValues.get(variable.id);
        if (!point) return;

        let series = chartInstance.get(variable.id) as Highcharts.Series | undefined;

        if (!series) {
          series = chartInstance.addSeries({
            ...CHART_SERIES_CONFIG,
            id: variable.id,
            name: variable.name,
            yAxis: variable.type === 'BOOL' ? 1 : 0,
            data: [[point.timestamp, point.value]],
          } as SeriesOptionsType) as Highcharts.Series;
          shouldRedraw = true;
        } else {
          const shift = series.data.length >= MAX_POINTS;
          series.addPoint([point.timestamp, point.value], false, shift, shift);
          shouldRedraw = true;
        }
      });

      if (shouldRedraw) {
        chartInstance.redraw(false);
      }
    });
  }
}
