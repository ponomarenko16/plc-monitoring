import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FrequencyHz } from '../../models/frequency';

type FrequencyOption = {
  value: FrequencyHz;
  label: string;
};

@Component({
  selector: 'plcm-frequency-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frequency-selector.html',
  styleUrls: ['./frequency-selector.scss'],
})
export class FrequencySelectorComponent {
  value = input<FrequencyHz>(10);
  select = output<FrequencyHz>();

  readonly options: FrequencyOption[] = [
    { value: 2, label: '2 Hz' },
    { value: 10, label: '10 Hz' },
    { value: 20, label: '20 Hz' },
  ];

  onSelect(option: FrequencyHz) {
    this.select.emit(option);
  }
}
