import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignComponent} from './shared/components/sign/sign.component';
import {AboutComponent} from './modules/about/about.component';
import {HomeComponent} from './modules/home/home.component';
import {SignupComponent} from './shared/components/signup/signup.component';
import {ManageProductsComponent} from './modules/admin/manage-products/manage-products.component';
import {AdminComponent} from './modules/admin/admin.component';
import {AdminAuthGuard} from './shared/services/admin.guard';
import {AddCategoriesComponent} from './modules/admin/add-categories/add-categories.component';
import {CategoryComponent} from './modules/admin/category/category.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signin', component: SignComponent},
  {path: 'signup', component: SignupComponent},
 // {path: 'category', component: CatagoryComponent},
  {path: 'admin/products', component: ManageProductsComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/category', component: CategoryComponent},
  {path: 'admin/add-categories', component: AddCategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [SignComponent];
