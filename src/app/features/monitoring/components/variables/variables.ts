import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, output } from '@angular/core';
import { PlcValue } from '../../models/plc-value';
import { PlcVariable } from '../../models/plc-varibale';
import { PlcValuePipe } from './plc-value.pipe';

const MAX_SELECTED_VARIABLES = 4;

@Component({
  selector: 'plcm-monitoring-variables',
  standalone: true,
  imports: [CommonModule, PlcValuePipe],
  templateUrl: './variables.html',
})
export class VariablesComponent {
  variables = input<PlcVariable[]>([]);
  values = input<Map<string, PlcValue>>();
  toggleVariable = output<string>();
  selectedVariables = computed(() => this.variables().filter((v) => v.enabled));
  isMaxSelectedVariables = computed(
    () => this.selectedVariables().length >= MAX_SELECTED_VARIABLES
  );

  toggle(id: string) {
    this.toggleVariable.emit(id);
  }
}
