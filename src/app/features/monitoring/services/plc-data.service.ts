import { Injectable } from '@angular/core';
import { VariableType } from '../models/plc-variable';

@Injectable({ providedIn: 'root' })
export class PlcDataService {
  getValue(previousValue: number, variableType: VariableType): number {
    switch (variableType) {
      case 'BOOL':
        return this.getBoolValue(previousValue);
      case 'INT':
        return this.getIntValue(previousValue);
      case 'REAL':
        return this.getRealValue(previousValue);
      default:
        return previousValue;
    }
  }

  getBoolValue(previousState: number /** 0 or 1 */): number {
    const TOGGLE_PROBABILITY = 0.05;

    if (Math.random() < TOGGLE_PROBABILITY) {
      return previousState === 0 ? 1 : 0;
    }

    return previousState;
  }

  getIntValue(previousValue: number = 0): number {
    const baseIncrement = 1 + Math.floor(Math.random() * 3); // 1..3
    let incremented = previousValue + baseIncrement;

    const SETPOINT_CHANGE_PROBABILITY = 0.1;

    if (Math.random() < SETPOINT_CHANGE_PROBABILITY) {
      const delta = Math.floor((Math.random() - 0.5) * 100); // -50..+50
      incremented = Math.max(0, incremented + delta);
    }

    return incremented;
  }

  getRealValue(previousValue: number = 0): number {
    let ticked = previousValue + 1;

    const base = 50;
    const amplitude = 10;
    const frequency = 0.05;

    const sinus = amplitude * Math.sin(ticked * frequency);

    const noise = (Math.random() - 0.5) * 1.5; // -0.75..+0.75

    const value = base + sinus + noise;

    return +value.toFixed(2);
  }
}
