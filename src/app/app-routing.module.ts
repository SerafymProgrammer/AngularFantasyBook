import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BookShopComponent } from './book-shop/book-shop.component';


import { AppLoginComponent} from './login/login.component';
import { RegisterComponent} from './register/register.component';

import { AppComponent } from './app.component';
import { AuthGuard } from './login.guard';
import { AuthGuardUser } from './setting-user.guard';
import { SettingUserInformationComponent } from './setting-user-information/setting-user-information.component';

import { AdminsTableComponent } from './admins-table/admins-table.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'settingUser', component: SettingUserInformationComponent,  canActivate: [AuthGuardUser], runGuardsAndResolvers: 'always'},
  { path: 'admin', component: AdminsTableComponent, canActivate: [AuthGuardUser], runGuardsAndResolvers: 'always'},
  { path: 'book', component: BookShopComponent},
  { path: 'bookElement/:id', component: BookComponent},
  { path: 'login', component: AppLoginComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
