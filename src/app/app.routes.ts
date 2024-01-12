import { Routes } from '@angular/router';
import { MushroomTablePageComponent } from './features/mycology/mushroom-table-page/mushroom-table-page.component';

export const routes: Routes = [
    {path: 'mushrooms', component: MushroomTablePageComponent},
    {path: '', redirectTo: 'mushrooms', pathMatch: 'prefix'}
];
