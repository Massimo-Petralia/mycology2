import {
  Component,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { Router } from '@angular/router';
import { Mushroom, Taxonomy } from '../models/mycology.models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule, Sort, MatSort } from '@angular/material/sort';
import { SharedParametersService } from '../services/shared-parameters.service';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-mushroom-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatInputModule,
  ],
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

  dataSource!: MatTableDataSource<Mushroom>;

  columsToDisplay = ['species', 'gender', 'family', 'order', 'AA'];

  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    const dataSource = new MatTableDataSource(this.mushrooms);
    this.dataSource = dataSource;
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
      this.dataSource.data = [
        ...this.dataSource.data.sort((a, b) =>
          a.taxonomy[column]! < b.taxonomy[column]! ? -1 : 1
        ),
      ];
    }
    if (sortEvent.direction === 'asc') {
      this.dataSource.data = [
        ...this.dataSource.data.sort((a, b) =>
          a.taxonomy[`${column}`]! < b.taxonomy[`${column}`]! ? 1 : -1
        ),
      ];
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter.toLowerCase()) !== -1 ? true : false;
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
