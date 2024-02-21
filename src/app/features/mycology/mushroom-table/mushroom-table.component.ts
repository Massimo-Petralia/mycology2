import {
  Component,
  Input,
  ViewChild,
  OnInit,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Mushroom, Taxonomy } from '../models/mycology.models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule, Sort, MatSort } from '@angular/material/sort';
import { SharedParametersService } from '../services/shared-parameters.service';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Subscription, debounceTime } from 'rxjs';
import { FormFilteredSearch } from '../models/mycology.models';
@Component({
  selector: 'app-mushroom-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './mushroom-table.component.html',
  styleUrl: './mushroom-table.component.scss',
  host: {
    '(window:resize)': 'updateColums($event)',
  },
})
export class MushroomTableComponent
  implements OnChanges, OnInit, AfterViewInit
{
  constructor(
    private router: Router,
    private paramsService: SharedParametersService,
    private fb: FormBuilder
  ) {}

  subs = new Subscription();

  @Input() page: number | undefined;
  @Input() mushrooms: Mushroom[] = [];

  dataSource!: MatTableDataSource<Mushroom>;

  columsToDisplay = ['species', 'gender', 'family', 'order', 'AA'];

  @ViewChild(MatSort) sort!: MatSort;

  @Output() formValue = new EventEmitter<FormFilteredSearch>();

  formFilteredSearch = this.fb.group({
    filter: this.fb.control<string>('species'),
    search: this.fb.control<string>(''),
  });

  ngOnChanges(changes: SimpleChanges): void {
    const dataSource = new MatTableDataSource(this.mushrooms);
    this.dataSource = dataSource;
    const { mushrooms } = changes;
    if (mushrooms && !mushrooms.isFirstChange()) {
      this.handleSorting(this.sort);
    }
  }

  ngOnInit(): void {
    this.subs.add(
      this.formFilteredSearch.valueChanges
        .pipe(debounceTime(500))
        .subscribe((value) => {
          this.formValue.emit({
            filter: value.filter!,
            search: value.search!,
          });
        })
    );
    if (typeof window !== 'undefined') {
      this.updateColums();
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
    if (sortEvent.direction === 'asc') {
      this.dataSource.data = [
        ...this.dataSource.data.sort((a, b) =>
          a.taxonomy[column]! < b.taxonomy[column]! ? -1 : 1
        ),
      ];
    } else if (sortEvent.direction === 'desc') {
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

  updateColums(event?: Event) {
    let windowSize: number;
    const columsToDisplay: string[] = [
      'species',
      'gender',
      'family',
      'order',
      'AA',
    ];
    if (event?.type === 'resize') {
      windowSize = (event.currentTarget as Window).innerWidth;
    } else windowSize = window.innerWidth;

    if (windowSize >= 775) {
      this.columsToDisplay = columsToDisplay;
    }
    if (windowSize <= 775) {
      this.columsToDisplay = columsToDisplay.slice(0, 4);
    }
    if (windowSize <= 500) {
      this.columsToDisplay = columsToDisplay.slice(0, 3);
    }
    if (windowSize <= 350) {
      this.columsToDisplay = [columsToDisplay[0], columsToDisplay[2]];
    }
  }
}
