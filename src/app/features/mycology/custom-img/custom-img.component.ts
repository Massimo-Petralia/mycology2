import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
})
export class CustomImgComponent implements ControlValueAccessor, OnChanges {
  constructor(private idManagement: IdManagementService) {}
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

    this.idManagement.idState.previousID = this.idManagement.idState.currentID;

    this.idManagement.idState.currentID = clickedID;

    if (
      this.idManagement.idState.previousID !== null &&
      document
        .getElementById(this.idManagement.idState.currentID)
        ?.classList.contains('fullsize-img') !==
        document
          .getElementById(this.idManagement.idState.previousID)
          ?.classList.contains('fullsize-img')
    ) {
      document
        .getElementById(this.idManagement.idState.previousID)
        ?.classList.toggle('fullsize-img');
      if (
        this.idManagement.idState.currentID ===
        this.idManagement.idState.previousID
      ) {
        document
          .getElementById(this.idManagement.idState.currentID)
          ?.classList.toggle('fullsize-img');
      }
    }
    document
      .getElementById(this.idManagement.idState.currentID)
      ?.classList.toggle('fullsize-img');
  }
}
