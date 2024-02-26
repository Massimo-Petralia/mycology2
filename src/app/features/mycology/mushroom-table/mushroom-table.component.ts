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
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { DialogDeletionInformationComponent } from '../dialog-deletion-information/dialog-deletion-information.component';
import { MatDialog } from '@angular/material/dialog';

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

  columsToDisplay = ['species', 'gender', 'family', 'order', 'AA', 'options'];

  @ViewChild(MatSort) sort!: MatSort;

  @Output() formValue = new EventEmitter<FormFilteredSearch>();

  @Output() delete = new EventEmitter<string>()

  @Output() selected = new EventEmitter<Mushroom>()

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


 openDialog(mushroomID: string){
  const collection = this.mushrooms.reduce(
    (collection: { [id: string]: Mushroom }, mushroom) => {
      collection[mushroom.id!] = mushroom;
      return collection;
    },
    {}
  )
  const dialogRef = this.dialog.open(DialogDeletionInformationComponent, {data:{species: collection[mushroomID].taxonomy.species}}).afterClosed().subscribe(result =>{
    if(result === 'delete'){
      //emetti l'evento cancella
      this.delete.emit(mushroomID)
    }
  })
 } 

 onSelect(mushroom: Mushroom){
  this.selected.emit(mushroom)
 }

  updateColums(event?: Event) {
    let windowSize: number;
    const columsToDisplay: string[] = [
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
        columsToDisplay[5],
      ];
    }
    if (windowSize <= 640) {
      this.columsToDisplay = [
        columsToDisplay[0],
        columsToDisplay[1],
        columsToDisplay[2],
        columsToDisplay[5],
      ];
    }
    if (windowSize <= 460) {
      this.columsToDisplay = [
        columsToDisplay[0],
        columsToDisplay[2],
        columsToDisplay[5],
      ];
    }
  }
}
