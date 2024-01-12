import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table'

@Component({
  selector: 'app-mushroom-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './mushroom-table.component.html',
  styleUrl: './mushroom-table.component.scss'
})
export class MushroomTableComponent {

}
