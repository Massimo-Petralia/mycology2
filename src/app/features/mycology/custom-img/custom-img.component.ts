import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
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
      useExisting: CustomImgComponent
    }
  ]
})
export class CustomImgComponent implements ControlValueAccessor {

value: string = ''

onChange = (value: string) => {}

writeValue(value: any): void {
  this.value = value
}

registerOnChange(fn: any): void {
  this.onChange = fn
}

registerOnTouched(fn: any): void {}

}
