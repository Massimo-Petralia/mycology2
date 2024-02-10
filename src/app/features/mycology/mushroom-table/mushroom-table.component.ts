import {
  Component,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Mushroom, Taxonomy } from '../models/mycology.models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule, Sort, MatSort } from '@angular/material/sort';
import { SharedParametersService } from '../services/shared-parameters.service';
@Component({
  selector: 'app-mushroom-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatSortModule],
  templateUrl: './mushroom-table.component.html',
  styleUrl: './mushroom-table.component.scss',
})
export class MushroomTableComponent implements OnChanges, AfterViewInit {
  constructor(
    private router: Router,
    private paramsService: SharedParametersService
  ) {}
  @Input() page: number | undefined;
  @Input() mushrooms: Mushroom[] = [];

  columsToDisplay = ['species', 'gender', 'family', 'order', 'AA'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Mushroom>;

  ngOnChanges(changes: SimpleChanges): void {
    const { mushrooms } = changes;
    if (mushrooms && !mushrooms.isFirstChange()) {
      this.handleSorting(this.sort);
    }
  }

  ngAfterViewInit(): void {
    this.handleSorting(this.sort);
  }

  goToFormMushroom() {
    this.paramsService.page = this.page!;
    this.router.navigate([`mycology/mushrooms/:id`]);
  }

  onMushroom(id: number) {
    this.paramsService.page = this.page!;
    this.paramsService.length = this.mushrooms.length;

    this.router.navigate([`mycology/mushrooms/${id}`]);
  }

  handleSorting(sortEvent: Sort | MatSort) {
    const column = sortEvent.active as keyof Taxonomy;
    if (sortEvent.direction === 'desc') {
      this.mushrooms = [
        ...this.mushrooms.sort((a, b) =>
          a.taxonomy[column]! < b.taxonomy[column]! ? -1 : 1
        ),
      ];
    }
    if (sortEvent.direction === 'asc') {
      this.mushrooms = [
        ...this.mushrooms.sort((a, b) =>
          a.taxonomy[`${column}`]! < b.taxonomy[`${column}`]! ? 1 : -1
        ),
      ];
    }
  }
}
