import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Mushroom } from '../models/mycology.models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-mushroom-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatSortModule],
  templateUrl: './mushroom-table.component.html',
  styleUrl: './mushroom-table.component.scss',
})
export class MushroomTableComponent {
  constructor(private router: Router) {}
  @Input() page: number = 1;
  @Input() mushrooms: Mushroom[] = [];

  columsToDisplay = ['species', 'gender', 'family', 'order', 'AA'];

  goToFormMushroom() {
    this.router.navigate([`mycology/mushrooms/:id`]);
  }

  handleSortChanges(sortEvent: Sort) {
   this.mushrooms = [...this.mushrooms].reverse()
  }

  onMushroom(id: number){
    this.router.navigate([`mycology/mushrooms/${id}`], {state: {page: this.page, length: this.mushrooms.length}})
    debugger
  }



}
