import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundErrorComponent } from './core/not-found-error/not-found-error.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'error-test', component: TestErrorComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'not-found', component: NotFoundErrorComponent },

  {
    path: 'shop',
    loadChildren: () =>
      import('./shop/shop.module').then((mod) => mod.ShopModule),
    // our shop module is only going to be activated and loaded when
    // we access the shop path
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
