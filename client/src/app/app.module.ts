import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MapViewComponent } from './map-view/map-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GlobalChatComponent } from './global-chat/global-chat.component';
import { MapComponent } from './map/map.component';
import { CityViewComponent } from './city-view/city-view.component';
import { CityComponent } from './city/city.component';
import { CityDetailComponent } from './city-detail/city-detail.component';
import { MatRippleModule } from '@angular/material/core';
import { MessageboxComponent } from './messagebox/messagebox.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { TradehouseComponent } from './tradehouse/tradehouse.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MapViewComponent,
    MapComponent,
    PageNotFoundComponent,
    GlobalChatComponent,
    CityViewComponent,
    CityComponent,
    CityDetailComponent,
    MessageboxComponent,
    PrivateChatComponent,
    TradehouseComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatToolbarModule,
    MatDialogModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
