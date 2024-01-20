import { Routes } from '@angular/router';
import { MushroomTablePageComponent } from './features/mycology/mushroom-table-page/mushroom-table-page.component';
import { MycologyPageComponent } from './features/mycology/mycology-page/mycology-page.component';

export const routes: Routes = [
    {path: 'mushrooms/page/:page', component: MushroomTablePageComponent},
    {path: 'mycology/mushroom/:id/page/:page', component: MycologyPageComponent},
    {path: '', redirectTo: 'mushrooms/page/1', pathMatch: 'prefix'},
    
];
