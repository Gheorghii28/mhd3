import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './home/search/search.component';
import { CardFormComponent } from './home/card-form/card-form.component';
import { ResultsComponent } from './home/results/results.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: '',
        component: HomeComponent,
        canActivate: [authGuard],
        children: [
          { path: 'search/:id', component: SearchComponent },
          { path: 'card-form/:id', component: CardFormComponent },
          { path: 'results', component: ResultsComponent },
        ],
      },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: '' },
];
