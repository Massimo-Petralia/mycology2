import { Routes } from '@angular/router';
import { MushroomTablePageComponent } from './features/mycology/mushroom-table-page/mushroom-table-page.component';
import { MycologyPageComponent } from './features/mycology/mycology-page/mycology-page.component';

export const routes: Routes = [
    {path: 'mycology/mushrooms', component: MushroomTablePageComponent},
    {path: 'mycology/mushrooms/:id', component: MycologyPageComponent},
    {path: '', redirectTo: 'mycology/mushrooms', pathMatch: 'prefix'},
    
];
