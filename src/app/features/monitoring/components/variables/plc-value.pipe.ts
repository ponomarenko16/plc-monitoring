import { Pipe, PipeTransform } from '@angular/core';
import { PlcValue } from '../../models/plc-value';

@Pipe({
  name: 'plcValue',
})
export class PlcValuePipe implements PipeTransform {
  transform(valueId: string, values: Map<string, PlcValue> | undefined): string {
    const noValuePlaceholder = '-';
    if (!values) return noValuePlaceholder;

    const plcValue = values.get(valueId);
    if (!plcValue) return noValuePlaceholder;

    return String(plcValue.value);
  }
}
