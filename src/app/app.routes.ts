import { Routes } from '@angular/router';
import { MushroomTablePageComponent } from './features/mycology/mushroom-table-page/mushroom-table-page.component';
import { FormMushroomPageComponent } from './features/mycology/form-mushroom-page/form-mushroom-page.component';

export const routes: Routes = [
    {path: 'mushrooms/page/:page', component: MushroomTablePageComponent},
    {path: 'mushroom/:id/page/:page', component: FormMushroomPageComponent},
    {path: '', redirectTo: 'mushrooms/page/1', pathMatch: 'prefix'},
    
];
