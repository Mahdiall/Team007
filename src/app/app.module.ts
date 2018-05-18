import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {AboutComponent} from './modules/about/about.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
import {HomeComponent} from './modules/home/home.component';
import {SignComponent} from './shared/components/sign/sign.component';
import {SignupComponent} from './shared/components/signup/signup.component';
import {AdminAuthGuard} from './shared/services/admin.guard';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {AuthService} from './shared/services/auth.service';
import {AngularFireAuth, AngularFireAuthModule} from 'angularfire2/auth';
import {MaterialModule} from './material.module';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {UserService} from './shared/services/user.service';
import {BsNavbarComponent} from './shared/components/bs-navbar/bs-navbar.component';
import {BsFooterComponent} from './shared/components/bs-footer/bs-footer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ManageProductsComponent} from './modules/admin/manage-products/manage-products.component';
import {AdminComponent} from './modules/admin/admin.component';
import {AuthGuard} from './shared/services/auth-guard.service';
import {ProductService} from './shared/services/product.service';
import {CategoryService} from './shared/services/category.service';
import {PostService} from './shared/services/post.service';
import {CategoryComponent} from './modules/admin/category/category.component';
import {AddCategoriesComponent} from './modules/admin/add-categories/add-categories.component';


import { DataTableModule } from 'angular5-data-table';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AboutComponent,
    HomeComponent,
    SignComponent,
    SignupComponent,
    BsNavbarComponent,
    BsFooterComponent,
    CategoryComponent,
    ManageProductsComponent,
    AdminComponent,
    AddCategoriesComponent

  ],
  imports: [
    DataTableModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    MaterialModule,
    FormsModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule.forRoot()
  ],
  providers: [AuthService,
    AngularFireAuth,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    BsNavbarComponent,
    // the product & category CRUD
    ProductService,
    CategoryService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
