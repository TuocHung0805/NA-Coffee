import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
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
import { IngredientComponent } from './admin/ingredient/ingredient.component';
import { ModItemComponent } from './admin/mod-item/mod-item.component';
import { NotificationComponent } from './admin/notification/notification.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { PromotionManagementComponent } from './admin/promotion-management/promotion-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { RecipeComponent } from './admin/recipe/recipe.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
    IngredientComponent,
    ModItemComponent,
    NotificationComponent,
    OrderListComponent,
    PromotionManagementComponent,
    UserManagementComponent,
    RecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
