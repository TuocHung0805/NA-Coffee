import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { RecipeComponent } from './admin/recipe/recipe.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PromotionManagementComponent } from './admin/promotion-management/promotion-management.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { NotificationComponent } from './admin/notification/notification.component';
import { ModItemComponent } from './admin/mod-item/mod-item.component';
import { IngredientComponent } from './admin/ingredient/ingredient.component';

const routes: Routes = [
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
  {path:'recipe',component:RecipeComponent},
  {path:'mod-item',component:ModItemComponent},
  {path:'notification',component:NotificationComponent},
  {path:'ingredient',component:IngredientComponent},
  {path:'order',component:OrderListComponent},
  {path:'promotion',component:PromotionManagementComponent},
  {path:'user-management',component:UserManagementComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
