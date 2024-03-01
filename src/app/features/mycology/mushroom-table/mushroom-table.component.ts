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
import {
  MatTableDataSource,
  MatTableModule,
  MatTable,
} from '@angular/material/table';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { DialogDeletionInformationComponent } from '../dialog-deletion-information/dialog-deletion-information.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

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
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
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
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  subs = new Subscription();

  @Input() page: number | undefined;
  @Input() mushrooms: Mushroom[] = [];
  dataSource!: MatTableDataSource<Mushroom>;

  selection = new SelectionModel<Mushroom>(true, []);

  columsToDisplay = [
    'select',
    'species',
    'gender',
    'family',
    'order',
    'AA',
    'options',
  ];

  @ViewChild(MatSort) sort!: MatSort;

  //@ViewChild(MatTable) table!: MatTable<Mushroom>;

  @Output() formValue = new EventEmitter<FormFilteredSearch>();

  @Output() delete = new EventEmitter<string>();

  @Output() deleteSelected = new EventEmitter<Mushroom[]>();

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
      this.selection.clear();
    }
  }

  ngOnInit(): void {
    this.subs.add(
      this.formFilteredSearch.valueChanges
        .pipe(debounceTime(500))
        .subscribe((value) => {
          this.formValue.emit({
            filter: value.filter!,
            search: value.search ? value.search : null,
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

  onDeleteOption(mushroomID: string) {
    const collection = this.mushrooms.reduce(
      (collection: { [id: string]: Mushroom }, mushroom) => {
        collection[mushroom.id!] = mushroom;
        return collection;
      },
      {}
    );
    const dialogRef = this.dialog
      .open(DialogDeletionInformationComponent, {
        data: { species: collection[mushroomID].taxonomy.species },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'delete') {
          this.formFilteredSearch.reset({
            filter: 'species',
            search: '',
          });
          this.delete.emit(mushroomID);
        }
      });
  }

  isAllSelected() {
    const selectedNumber = this.selection.selected.length;
    const rowNumber = this.mushrooms.length;
    return selectedNumber === rowNumber;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  onDeleteSelected() {
    const dialogRef = this.dialog
      .open(DialogDeletionInformationComponent, {
        data: this.selection.selected,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'delete') {
          this.formFilteredSearch.reset({
            filter: 'species',
            search: '',
          });
          this.deleteSelected.emit(this.selection.selected);
        }
      });
  }

  updateColums(event?: Event) {
    let windowSize: number;
    const columsToDisplay: string[] = [
      'select',
      'species',
      'gender',
      'family',
      'order',
      'AA',
      'options',
    ];
    if (event?.type === 'resize') {
      windowSize = (event.currentTarget as Window).innerWidth;
    } else windowSize = window.innerWidth;

    if (windowSize >= 775) {
      this.columsToDisplay = columsToDisplay;
    }
    if (windowSize <= 775) {
      this.columsToDisplay = [
        columsToDisplay[0],
        columsToDisplay[1],
        columsToDisplay[2],
        columsToDisplay[3],
        columsToDisplay[4],
        columsToDisplay[6],
      ];
    }
    if (windowSize <= 640) {
      this.columsToDisplay = [
        columsToDisplay[0],
        columsToDisplay[1],
        columsToDisplay[2],
        columsToDisplay[3],
        columsToDisplay[6],
      ];
    }
    if (windowSize <= 460) {
      this.columsToDisplay = [
        columsToDisplay[0],
        columsToDisplay[1],
        columsToDisplay[3],
        columsToDisplay[6],
      ];
    }
    if (windowSize <= 382) {
      this.columsToDisplay = [
        columsToDisplay[0],
        columsToDisplay[1],
        columsToDisplay[6],
      ];
    }
  }
}
