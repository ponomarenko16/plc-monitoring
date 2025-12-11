import { computed, effect, inject, Injectable } from '@angular/core';
import { DataStore } from './data.store';
import { VariablesStore } from './variables.store';
import { FrequencyHz } from '../models/frequency';

@Injectable()
export class MonitoringFacade {
  private variablesStore = inject(VariablesStore);
  private dataStore = inject(DataStore);

  public vm = computed(() => {
    return {
      variables: this.variablesStore.variables(),
      enabledVariables: this.variablesStore.enabledVariables(),
      plcValuesStream: this.dataStore.dataStream.value(),
      frequency: this.dataStore.frequency(),
    };
  });

  constructor() {
    effect(() => {
      this.dataStore.initStream(this.variablesStore.variables());
    });
  }

  toggleVariable(id: string) {
    this.variablesStore.toggleVariable(id);
  }

  setFrequency(freq: FrequencyHz) {
    this.dataStore.setFrequency(freq);
  }
}
