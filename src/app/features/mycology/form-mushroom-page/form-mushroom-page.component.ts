import { Component, OnInit, Input } from '@angular/core';
import { FormMushroomComponent } from '../form-mushroom/form-mushroom.component';
import { Mushroom } from '../models/mycology.models';

@Component({
  selector: 'app-form-mushroom-page',
  standalone: true,
  imports: [FormMushroomComponent],
  templateUrl: './form-mushroom-page.component.html',
  styleUrl: './form-mushroom-page.component.scss',
})
export class FormMushroomPageComponent implements OnInit {
  @Input() set page(pagenumber: number) {
    this.currentpage = pagenumber;
  }

  @Input() set id(mushroomID: number) {
    this.mushroomID = mushroomID;
  }

  currentpage!: number;
  mushroomID!: number;
  mushroom!: Mushroom;

  ngOnInit(): void {}
}
