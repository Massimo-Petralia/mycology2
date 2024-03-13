import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-img',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './custom-img.component.html',
  styleUrl: './custom-img.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomImgComponent,
    },
  ],
  host: {},
})
export class CustomImgComponent implements ControlValueAccessor {
  constructor() {}

  @ViewChild('image') image!: ElementRef<HTMLImageElement>;

  value: string = '';

  @Input() index?: number;

  @Input() selectedIndex: number = 0;

  @Output() imageIndex = new EventEmitter<number>();

  onChange = (value: string) => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  getIndex(index?: number) {
    this.imageIndex.emit(index);
  }
}
