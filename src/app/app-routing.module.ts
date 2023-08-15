import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundErrorComponent } from './core/not-found-error/not-found-error.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'error-test',
    component: TestErrorComponent,
    data: { breadcrumb: 'test-error' },
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    data: { breadcrumb: 'server-error' },
  },
  {
    path: 'not-found',
    component: NotFoundErrorComponent,
    data: { breadcrumb: 'not-found' },
  },

  {
    path: 'shop',
    loadChildren: () =>
      import('./shop/shop.module').then((mod) => mod.ShopModule),
    data: { breadcrumb: 'shop' },
    // our shop module is only going to be activated and loaded when
    // we access the shop path
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
    data: { breadcrumb: 'not-found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
