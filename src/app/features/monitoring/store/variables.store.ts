import { computed, Injectable, signal } from '@angular/core';
import { PlcVariable } from '../models/plc-varibale';

@Injectable()
export class VariablesStore {
  private _variables = signal<PlcVariable[]>([
    // BOOL variables (5)
    { id: 'pump_running', name: 'Pump Running', type: 'BOOL', enabled: true },
    { id: 'valve_open', name: 'Valve Open', type: 'BOOL', enabled: false },
    { id: 'motor_active', name: 'Motor Active', type: 'BOOL', enabled: false },
    { id: 'alarm_tripped', name: 'Alarm Tripped', type: 'BOOL', enabled: false },
    { id: 'emergency_stop', name: 'Emergency Stop', type: 'BOOL', enabled: false },
    // INT variables
    { id: 'cycle_count', name: 'Cycle Count', type: 'INT', unit: 'count', enabled: false },
    {
      id: 'production_count',
      name: 'Production Count',
      type: 'INT',
      unit: 'count',
      enabled: false,
    },
    { id: 'batch_number', name: 'Batch Number', type: 'INT', unit: 'num', enabled: false },
    { id: 'error_code', name: 'Error Code', type: 'INT', unit: 'code', enabled: false },
    { id: 'step_counter', name: 'Step Counter', type: 'INT', unit: 'steps', enabled: false },
    { id: 'part_count', name: 'Part Count', type: 'INT', unit: 'count', enabled: false },
    { id: 'operation_mode', name: 'Operation Mode', type: 'INT', unit: 'mode', enabled: false },
    // REAL variables
    { id: 'tank_level', name: 'Tank Level', type: 'REAL', unit: '%', enabled: true },
    { id: 'pressure_main', name: 'Pressure Main', type: 'REAL', unit: 'bar', enabled: false },
    { id: 'temperature', name: 'Temperature', type: 'REAL', unit: '°C', enabled: false },
    { id: 'flow_rate', name: 'Flow Rate', type: 'REAL', unit: 'L/min', enabled: false },
    { id: 'speed', name: 'Speed', type: 'REAL', unit: 'RPM', enabled: false },
    { id: 'voltage', name: 'Voltage', type: 'REAL', unit: 'V', enabled: false },
    { id: 'current', name: 'Current', type: 'REAL', unit: 'A', enabled: false },
    { id: 'power', name: 'Power', type: 'REAL', unit: 'kW', enabled: false },
    { id: 'humidity', name: 'Humidity', type: 'REAL', unit: '%', enabled: false },
    { id: 'vibration', name: 'Vibration', type: 'REAL', unit: 'mm/s', enabled: false },
  ]);
  variables = this._variables.asReadonly();

  readonly enabledVariables = computed(() => {
    return this.variables().filter((v) => v.enabled);
  });

  toggleVariable(id: string): void {
    this._variables.update((list) =>
      list.map((v) => (v.id === id ? { ...v, enabled: !v.enabled } : v))
    );
  }
}
