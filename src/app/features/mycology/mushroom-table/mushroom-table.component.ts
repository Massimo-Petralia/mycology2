import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { Router } from '@angular/router';

@Component({
  selector: 'app-mushroom-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './mushroom-table.component.html',
  styleUrl: './mushroom-table.component.scss'
})
export class MushroomTableComponent {
  constructor(private router: Router){}
@Input()  page: number = 1

goToMushroom(){
  this.router.navigate([`mycology/mushroom/:id/page`, this.page])
}
}
