import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../components/chart/chart';
import { VariablesComponent } from '../components/variables/variables';
import { FrequencySelectorComponent } from '../components/frequency-selector/frequency-selector';
import { MonitoringFacade } from '../store/monitoring.facade';
import { MonitoringProviders } from '../store/monitoring.providers';
import { FrequencyHz } from '../models/frequency';

@Component({
  selector: 'plcm-monitoring',
  templateUrl: './monitoring.html',
  styleUrls: ['./monitoring.scss'],
  imports: [CommonModule, ChartComponent, VariablesComponent, FrequencySelectorComponent],
  providers: [MonitoringProviders],
})
export class MonitoringComponent {
  private monitoringFacade = inject(MonitoringFacade);
  vm = this.monitoringFacade.vm;

  toggleVariable(id: string) {
    this.monitoringFacade.toggleVariable(id);
  }

  setFrequency(freq: FrequencyHz) {
    this.monitoringFacade.setFrequency(freq);
  }
}
