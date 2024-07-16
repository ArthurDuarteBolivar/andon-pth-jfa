import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NodemcuService } from './service/nodemcu.service';
import { Nodemcu } from './module/nodemcu';
import { MatDialog } from '@angular/material/dialog';
import { DialogMetaComponent } from './shared/dialog-meta/dialog-meta.component';
import { MainService } from './service/main.service';
import { Realizado } from './module/realizado';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(

  ) {}

}
