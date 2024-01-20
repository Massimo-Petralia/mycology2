import { Component, OnInit, Input } from '@angular/core';
import { FormMushroomComponent } from '../form-mushroom/form-mushroom.component';
import { Mushroom } from '../models/mycology.models';
import { FormIconographyComponent } from '../form-iconography/form-iconography.component';

@Component({
  selector: 'app-mycology-page',
  standalone: true,
  imports: [FormMushroomComponent, FormIconographyComponent],
  templateUrl: './mycology-page.component.html',
  styleUrl: './mycology-page.component.scss',
})
export class MycologyPageComponent implements OnInit {
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
