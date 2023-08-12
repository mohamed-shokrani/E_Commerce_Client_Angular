import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { NotfoundComponent } from './shared/component/notfound/notfound.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
