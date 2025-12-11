import { Injectable } from '@angular/core';
import { VariableType } from '../models/plc-varibale';

@Injectable({ providedIn: 'root' })
export class PlcDataService {
  getValue(value: number, variableType: VariableType): number {
    if (variableType === 'BOOL') {
      return this.getBoolValue(value);
    } else if (variableType === 'INT') {
      return this.getIntValue(value);
    } else if (variableType === 'REAL') {
      return this.getRealValue(value);
    }
    return value;
  }

  getBoolValue(prevState: number /** 0 or 1 */): number {
    const TOGGLE_PROBABILITY = 0.05;

    if (Math.random() < TOGGLE_PROBABILITY) {
      return prevState === 0 ? 1 : 0;
    }

    return prevState;
  }

  getIntValue(prevState: number = 0): number {
    const baseIncrement = 1 + Math.floor(Math.random() * 3); // 1..3
    let incremented = prevState + baseIncrement;

    const SETPOINT_CHANGE_PROBABILITY = 0.1;

    if (Math.random() < SETPOINT_CHANGE_PROBABILITY) {
      const delta = Math.floor((Math.random() - 0.5) * 100); // -50..+50
      incremented = Math.max(0, incremented + delta);
    }

    return incremented;
  }

  getRealValue(prevState: number = 0): number {
    let ticked = prevState + 1;

    const base = 50;
    const amplitude = 10;
    const frequency = 0.05;

    const sinus = amplitude * Math.sin(ticked * frequency);

    const noise = (Math.random() - 0.5) * 1.5; // -0.75..+0.75

    const value = base + sinus + noise;

    return +value.toFixed(2);
  }
}
