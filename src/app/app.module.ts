import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './sharepage/header/header.component';
import { FooterComponent } from './sharepage/footer/footer.component';
import { HomeComponent } from './page/home/home.component';
import { MenuComponent } from './page/menu/menu.component';
import { CartComponent } from './page/cart/cart.component';
import { BlogComponent } from './page/blog/blog.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MenuDetailComponent } from './page/menu/menu-detail/menu-detail.component';
import { SigninComponent } from './page/signin/signin.component';
import { SignupComponent } from './page/signup/signup.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NavSidebarComponent } from './admin/nav-sidebar/nav-sidebar.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    CartComponent,
    BlogComponent,
    DashboardComponent,
    MenuDetailComponent,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    AdminDashboardComponent,
    NavSidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
