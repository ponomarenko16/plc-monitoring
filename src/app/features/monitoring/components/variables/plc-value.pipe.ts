import { Pipe, PipeTransform } from '@angular/core';
import { PlcValue } from '../../models/plc-value';

@Pipe({
  name: 'plcValue',
})
export class PlcValuePipe implements PipeTransform {
  transform(valueId: string, values: Map<string, PlcValue> | undefined): string {
    const placeholder = '-';
    if (!values) return placeholder;
    const latest = values.get(valueId)?.value;
    if (!values.has(valueId) || !latest) return placeholder;
    return String(latest);
  }
}
