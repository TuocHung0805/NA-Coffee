import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { AgencyComponent } from './admin/agency/agency.component';
import { IngredientComponent } from './admin/ingredient/ingredient.component';
import { ModItemComponent } from './admin/mod-item/mod-item.component';
import { NotificationComponent } from './admin/notification/notification.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { PromotionManagementComponent } from './admin/promotion-management/promotion-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { RecipeComponent } from './admin/recipe/recipe.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
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
    AgencyComponent,
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
    provideFirebaseApp(() => initializeApp({"projectId":"na-coffee","appId":"1:755920000175:web:0ab921f2e9c0e44a88f05a","storageBucket":"na-coffee.appspot.com","apiKey":"AIzaSyD8m9Ko0e3zIOUpyP6ZASJ4zkawNZuYnas","authDomain":"na-coffee.firebaseapp.com","messagingSenderId":"755920000175"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
