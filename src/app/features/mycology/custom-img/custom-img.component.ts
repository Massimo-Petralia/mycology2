import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CounterService } from '../services/counter.service';
@Component({
  selector: 'app-custom-img',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './custom-img.component.html',
  styleUrl: './custom-img.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomImgComponent,
    },
  ],
})
export class CustomImgComponent implements ControlValueAccessor, OnChanges {
  constructor(private counter: CounterService) {}
  value: string = '';

  @Input() index?: number;

  ngOnChanges(changes: SimpleChanges): void {}

  onChange = (value: string) => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  toggleZoom(event: Event) {
    const clickedID = (event.target as HTMLImageElement).id;

    this.counter.idState.previousID = this.counter.idState.currentID;
    this.counter.idState.currentID = clickedID;
    // if (this.counter.idState.previousID === null) {
    //   this.counter.idState.previousID;
    // }

    console.log(
      'previousID: ',
      this.counter.idState.previousID,
      'currentID: ',
      this.counter.idState.currentID
    );
  }
}
