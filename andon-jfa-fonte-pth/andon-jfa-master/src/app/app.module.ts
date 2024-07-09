import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogMetaComponent } from './shared/dialog-meta/dialog-meta.component';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DECIMAL_FORMAT_DEFAULT } from 'src/decimal-format.provider';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import { PausaComponent } from './pausa/pausa.component';
import { HomeComponent } from './pages/home/home.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogPausaComponent } from './shared/dialog-pausa/dialog-pausa.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogMetaComponent,
    PausaComponent,
    HomeComponent,
    DialogPausaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatIconModule,
    MatSnackBarModule,
    
  ],
  providers: [DECIMAL_FORMAT_DEFAULT ],
  bootstrap: [AppComponent]
})
export class AppModule { }
