import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import {provideAuth,getAuth} from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './Component/shopping-cart/shopping-cart.component';
import { HomeComponent } from './Component/home/home.component';
import {CustomFormsModule} from 'ng2-validation';


//Firebase Configuration
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ProductsComponent } from './Components/products/products.component';
import { CheckOutComponent } from './Components/check-out/check-out.component';
import { OrderSuccessComponent } from './Components/order-success/order-success.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminProductsComponent } from './Components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './Components/admin/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './Components/my-orders/my-orders.component';

import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {  AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { UserService } from './Services/user.service';
import { AuthService } from './Services/auth.service';
import { AdminAuthGuard } from './Services/admin-auth.service';
import { ProductFormComponent } from './Components/admin/product-form/product-form.component';
import { CategoryService } from './Services/category.service';
import { FormsModule } from '@angular/forms';
import { VoiceComponent } from './Component/voice/voice.component';
import { SpeechRecognizerService } from './speech-recognizer.service';
import { ProductFilterComponent } from './Components/products/product-filter/product-filter.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { ProductQuantityComponent } from './Components/product-quantity/product-quantity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {VoiceCleanCart} from "./Component/voice/voice-clean-cart";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShoppingCartComponent,
    HomeComponent,
    MyOrdersComponent,
    LogoutComponent,
    AdminProductsComponent,
    ProductFormComponent,
    ProductsComponent,
    VoiceComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    VoiceCleanCart
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => getFirestore()),
    // provideDatabase(() => getDatabase()),
    // provideAuth(() => getAuth()),

    MatButtonModule,
    MatIconModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(
      [

        {path: "products", component: ProductsComponent},
        {path: "login", component: LoginComponent},
        {path: "shopping-cart", component: ShoppingCartComponent},

        {path: "admin/products/new", component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuard]},
        {path: "admin/products/:id", component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuard]},
        {path: "admin/products", component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuard]},
        {path: "admin/orders", component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuard]},

        {path: "check-out", component: CheckOutComponent, canActivate: [AuthGuardService]},
        {path: "order-success", component: OrderSuccessComponent, canActivate: [AuthGuardService]},

        {path: "my/orders", component: MyOrdersComponent, canActivate: [AuthGuardService]},

      ]
    ),
    BrowserAnimationsModule,
    MatDialogModule

  ],
  providers: [UserService,AuthService,AuthGuardService,CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
