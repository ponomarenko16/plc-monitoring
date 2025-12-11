import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';
import { FrequencyHz } from '../models/frequency';
import { PlcValue } from '../models/plc-value';
import { PlcVariable } from '../models/plc-variable';
import { PlcDataService } from '../services/plc-data.service';

@Injectable()
export class DataStore {
  private plcDataService = inject(PlcDataService);

  private _variables = signal<PlcVariable[]>([]);
  variables = this._variables.asReadonly();
  private _frequency = signal<FrequencyHz>(10); // Default 10 Hz
  frequency = this._frequency.asReadonly();

  plcValuesResource = rxResource({
    params: computed(() => {
      return this.variables().length
        ? { variables: this.variables(), frequency: this.frequency() }
        : undefined;
    }),
    stream: ({ params }) => {
      const intervalMs = 1000 / params.frequency;
      return interval(intervalMs).pipe(
        map(() => {
          const values = new Map<string, PlcValue>();
          params.variables.forEach((v) => {
            const previousValue = this.plcValuesResource.value()?.get(v.id)?.value ?? 0;
            values.set(v.id, {
              variableId: v.id,
              timestamp: Date.now(),
              value: this.plcDataService.getValue(previousValue, v.type),
            } as PlcValue);
          });
          return values;
        })
      );
    },
  });

  plcValues = computed(() => this.plcValuesResource.value());

  setVariables(variables: PlcVariable[]) {
    this._variables.set(variables);
  }

  setFrequency(frequency: FrequencyHz) {
    this._frequency.set(frequency);
  }
}
