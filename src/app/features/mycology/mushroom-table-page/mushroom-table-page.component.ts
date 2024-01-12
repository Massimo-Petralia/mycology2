import { Component } from '@angular/core';
import { MushroomTableComponent } from '../mushroom-table/mushroom-table.component';

@Component({
  selector: 'app-mushroom-table-page',
  standalone: true,
  imports: [MushroomTableComponent],
  templateUrl: './mushroom-table-page.component.html',
  styleUrl: './mushroom-table-page.component.scss'
})
export class MushroomTablePageComponent {

}
