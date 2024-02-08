import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Mushroom } from '../models/mycology.models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule, Sort } from '@angular/material/sort';
import { SharedParametersService } from '../services/shared-parameters.service';

@Component({
  selector: 'app-mushroom-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatSortModule],
  templateUrl: './mushroom-table.component.html',
  styleUrl: './mushroom-table.component.scss',
})
export class MushroomTableComponent {
  constructor(
    private router: Router,
    private paramsService: SharedParametersService
  ) {}
  @Input() page: number | undefined;
  @Input() mushrooms: Mushroom[] = [];

  columsToDisplay = ['species', 'gender', 'family', 'order', 'AA'];

  goToFormMushroom() {
    this.paramsService.page = this.page!;
    this.paramsService.length = this.mushrooms.length;
    this.router.navigate([`mycology/mushrooms/:id`]);
  }

  onMushroom(id: number) {
    this.paramsService.page = this.page!;

    this.router.navigate([`mycology/mushrooms/${id}`]);
  }

  handleSortChanges(sortEvent: Sort) {
    // this.mushrooms = [...this.mushrooms].reverse()
  }
}
