import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { Router } from '@angular/router';
import { Mushroom } from '../models/mycology.models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mushroom-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './mushroom-table.component.html',
  styleUrl: './mushroom-table.component.scss'
})
export class MushroomTableComponent {
  constructor(private router: Router){}
@Input()  page: number = 1
@Input() mushrooms: Mushroom[] = []

columsToDisplay = ['species', 'gender', 'family', 'order', 'AA']

goToMushroom(){
  this.router.navigate([`mycology/mushroom/:id/page`, this.page])
}
}
