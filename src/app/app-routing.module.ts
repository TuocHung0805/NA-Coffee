import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './sharepage/header/header.component';
import { FooterComponent } from './sharepage/footer/footer.component';
import { HomeComponent } from './page/home/home.component';
import { CartComponent } from './page/cart/cart.component';
import { MenuComponent } from './page/menu/menu.component';
import { MenuDetailComponent } from './page/menu/menu-detail/menu-detail.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { BlogComponent } from './page/blog/blog.component';
import { SigninComponent } from './page/signin/signin.component';
import { SignupComponent } from './page/signup/signup.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NavSidebarComponent } from './admin/nav-sidebar/nav-sidebar.component';

const routes: Routes = [
  {path: 'header', component:HeaderComponent},
  {path: 'footer', component:FooterComponent},
  {path: '', component:HomeComponent},
  {path: 'blog', component:BlogComponent},
  {path:'menu',component:MenuComponent},
  {path:'detail',component:MenuDetailComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'cart',component:CartComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgot',component:ForgotPasswordComponent},
  {path:'admin',component:AdminDashboardComponent},
  {path:'nav',component:NavSidebarComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
