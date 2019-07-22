import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppLoginComponent} from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, ControlContainer } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataSubjectService } from './services/dataSubject.service';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './login.guard';
import { SettingUserInformationComponent } from './setting-user-information/setting-user-information.component';
import { AuthGuardUser } from './setting-user.guard';
import {MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import { MaterialAppModule } from './ngmaterial/ngmaterial.module';
import { AdminsTableComponent } from './admins-table/admins-table.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { PopupEditUserComponent } from './popup-edit-user/popup-edit-user.component';
import { PopupAddUserComponent } from './popup-add-user/popup-add-user.component';
import { BooksTableComponent } from './books-table/books-table.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ParamInterceptor } from './api.interceptor';
import { BookShopComponent } from './book-shop/book-shop.component';
import { BookComponent } from './book/book.component';
import { PopupBasketComponent } from './popup-basket/popup-basket.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { BookService } from './services/book.service';
import { ChooseImageService } from './services/chooseImage.service';
import { DescriptionLenthPipe } from './description-lenth.pipe';
import { JwtInterceptor } from './jwtInterceptor.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    AppLoginComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    SettingUserInformationComponent,
    AdminsTableComponent,
    PopupEditUserComponent,
    PopupAddUserComponent,
    BooksTableComponent,
    AddBookComponent,
    EditBookComponent,
    BookShopComponent,
    BookComponent,
    PopupBasketComponent,
    DescriptionLenthPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MaterialAppModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  entryComponents: [PopupEditUserComponent, PopupAddUserComponent, AddBookComponent, EditBookComponent, PopupBasketComponent],
  providers: [DataSubjectService, AuthGuard, AuthGuardUser, UserService, BookService, ChooseImageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ParamInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
