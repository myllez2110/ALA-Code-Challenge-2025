import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './shared/pages/login-page/login-page';
import { ButtonPage } from './shared/pages/button-page/button-page';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MainTableComponent } from './shared/components/main-table/main-table.component';
import { MatTableModule } from '@angular/material/table';
import { HTTPService } from './core/services/HTTPService';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FooPage } from './shared/pages/foo-page/foo-page';
import { BarPage } from './shared/pages/bar-page/bar-page';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericDialog } from './shared/dialogs/generic-dialog/generic-dialog';
import { ProductComponent } from './shared/dialogs/product/product.component';
import { UsersComponent } from './shared/pages/users/users.component';
import { UserDialogComponent } from './shared/dialogs/user/user-dialog.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPage,
    ButtonPage,
    MainTableComponent,
    FooPage,
    BarPage,
    ProductComponent,
    GenericDialog,
    UsersComponent,
    UserDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    HTTPService,
    { provide: HTTP_INTERCEPTORS, useClass: HTTPService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }