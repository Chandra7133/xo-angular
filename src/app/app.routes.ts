import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '',redirectTo:'gameid',pathMatch:'full'},
    {path:'gameid',loadComponent:()=>import('./gameid/gameid.component').then((m)=>m.GameidComponent)},
    {path:'gameplay',loadComponent:()=>import('./gameplay/gameplay.component').then((m)=>m.GameplayComponent)}
];
