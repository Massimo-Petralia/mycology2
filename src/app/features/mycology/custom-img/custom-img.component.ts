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
import { IdManagementService } from '../services/id-management.service';

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
  host: {},
})
export class CustomImgComponent implements ControlValueAccessor {
  constructor(
    private idManagement: IdManagementService,
    private elementRef: ElementRef
  ) {}

  @ViewChild('image') image?: ElementRef<HTMLImageElement>;

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

  toggleClass() {
    const _classList = this.image?.nativeElement.classList.value;
    this.image?.nativeElement.classList.toggle('fullsize-img');
    return _classList;
  }
}
