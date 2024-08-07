import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Modelo } from 'src/app/module/modelo';
import { Nodemcu } from 'src/app/module/nodemcu';
import { Realizado } from 'src/app/module/realizado';
import { MainService } from 'src/app/service/main.service';
import { ModeloService } from 'src/app/service/modelo.service';
import { NodemcuService } from 'src/app/service/nodemcu.service';
import { DialogMetaComponent } from 'src/app/shared/dialog-meta/dialog-meta.component';
import { DialogPausaComponent } from 'src/app/shared/dialog-pausa/dialog-pausa.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private nodemcuService: NodemcuService,
    public dialog: MatDialog,
    private mainService: MainService,
    private modeloService: ModeloService
  ) { }
  modeloAtual!: Modelo;
  dataAtual = new Date()
  diaDaSemanda: Date = new Date();
  dialogRef: any;
  dataGraph: any[] = [];
  countGraph: number[] = [];
  realizado: number = 0;
  imposto: number = 0;
  TCmedioRealizado: number = 0;
  MediaHorarioRealizada: number = 0;
  nodemcu: Nodemcu[] = [];
  date: any;
  op: string = ""
  TCimpostado: number = 0;
  previsto: number = 0;
  shiftTime: number = 8.66;
  minutos8: number = 0;
  minutos9: number = 0;
  minutos10: number = 0;
  minutos11: number = 0;
  minutos12: number = 0;
  minutos13: number = 0;
  minutos14: number = 0;
  minutos15: number = 0;
  minutos16: number = 0;
  minutos17: number = 0;
  hours: any;
  effectiveTime: any;
  ProportionalDiscount: number = 0;
  init: boolean = false;
  currentTC: number[] = [];
  lastTC: number[] = [];
  realizadoHora: Realizado = {
    id: 0,
    horas7: 0,
    horas8: 0,
    horas9: 0,
    horas10: 0,
    horas11: 0,
    horas12: 0,
    horas13: 0,
    horas14: 0,
    horas15: 0,
    horas16: 0,
    horas17: 0,
  };
  horasAtuais: any;
  impostodivididoporshift: any = 0;
  realizado7 = 0
  ngOnInit(): void {
    this.modeloService.getAll().subscribe(res => {
      res.forEach(item => {
        if (item.is_current == true) {
          this.modeloAtual = item
        }
      })
      if (this.modeloAtual == undefined) {
        this.modeloService.changeIsCurrent('STORM 120A', true)
      }
    })
    window.onload = () => {
      this.init = true;
    };
    for (let index = 0; index < 17; index++) {
      this.currentTC[index] = 0;
    }

    this.nodemcuService.getAll().subscribe((res) => {
      this.nodemcu = res;
      this.mainService.getAllMain().subscribe((res: any) => {
        this.imposto = res[0].imposto;
        this.op = res[0].op
      });
    });
    this.nodemcuService.getAllRealizado().subscribe((res) => {
      this.realizadoHora = res[0];
    });
    setInterval(() => {
      this.impostodivididoporshift = ((this.imposto / this.shiftTime) / 60)
      if (this.diaDaSemanda.getDay() == 5) {
        this.shiftTime = 7.66
      }
      this.diaDaSemanda = new Date();
      this.horasAtuais = new Date().getHours();
      if (this.horasAtuais == 7) {
        this.minutos8 = new Date().getMinutes();
      } else if (this.horasAtuais == 8) {
        this.minutos8 = 60;
        this.minutos9 = new Date().getMinutes();
      } else if (this.horasAtuais == 9) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = new Date().getMinutes();
      } else if (this.horasAtuais == 10) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = new Date().getMinutes();
      } else if (this.horasAtuais == 11) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = new Date().getMinutes();
      } else if (this.horasAtuais == 12) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = new Date().getMinutes();
      } else if (this.horasAtuais == 13) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = 60;
        this.minutos14 = new Date().getMinutes();
      } else if (this.horasAtuais == 14) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = 60;
        this.minutos14 = 60;
        this.minutos15 = new Date().getMinutes();
      } else if (this.horasAtuais == 15) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = 60;
        this.minutos14 = 60;
        this.minutos15 = 60;
        this.minutos16 = new Date().getMinutes();
      } else if (this.horasAtuais == 16) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = 60;
        this.minutos14 = 60;
        this.minutos15 = 60;
        this.minutos16 = 60;
        this.minutos17 = new Date().getMinutes();
      } else if (this.horasAtuais == 17) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = 60;
        this.minutos14 = 60;
        this.minutos15 = 60;
        this.minutos16 = 60;
        this.minutos17 = 60;
        this.minutos17 = new Date().getMinutes();
      }

      const currentDate = new Date();
      const newDatehours = new Date(currentDate.getTime() - 7 * 60 * 60 * 1000);
      const hours1 = newDatehours.getHours();
      const minutes1 = newDatehours.getMinutes();
      this.date = hours1 * 60 + minutes1;

      this.effectiveTime = this.date;

      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');

      this.hours = `${hours}:${minutes}`;
      this.getValues();

      this.nodemcuService.getAll().subscribe((res) => {
        this.nodemcu = res;
        this.dataGraph = [];
        this.countGraph = [];
        this.MediaHorarioRealizada = 0;
        this.TCmedioRealizado = 0;
        this.getRealizado();
      });
      this.dataAtual = new Date();
      this.retirarPausa()
    }, 1000);
    setInterval(() => {
      this.realizadoIntevalo();
    }, 5000);
  }

  retirarPausa() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (hours === 9 && minutes === 15) {
      this.nodemcuService.pausa(true).subscribe()
    } 
    if (hours === 9 && minutes === 25) {
      this.nodemcuService.pausa(false).subscribe()
    } 
    if (hours === 11 && minutes === 30) {
      this.nodemcuService.pausa(true).subscribe()
    } 
    if (hours === 12 && minutes === 30) {
      this.nodemcuService.pausa(false).subscribe()
    } 
    if (hours === 15 && minutes === 20) {
      this.nodemcuService.pausa(true).subscribe()
    } 
    if (hours === 15 && minutes === 30) {
      this.nodemcuService.pausa(false).subscribe()
    }
  }

  realizadoIntevalo() {
    this.nodemcuService.getAllRealizado().subscribe((res) => {
      this.realizadoHora = res[0];
    });
    this.mainService.getAllMain().subscribe((res) => {
      this.imposto = res[0].imposto;
      this.op = res[0].op
    });
    this.modeloService.getAll().subscribe(res => {
      res.forEach(item => {
        if (item.is_current == true) {
          this.modeloAtual = item
        }
      })

    })
    this.nodemcu.forEach(item => {
      if (item.nameId.pausa == true) {
        if (!this.dialog.openDialogs.length) {
          this.dialogRef = this.dialog.open(DialogPausaComponent, {
            width: '900px',
            height: '400px'
          });
        }
      } else {
        if (this.dialog.openDialogs.length) {
          this.dialogRef.close()
        }
      }
    });
  }

  getRealizado() {
    this.realizado = 0;
    this.nodemcu.forEach((res) => {
      this.TCmedioRealizado += res.tcmedio;
      this.MediaHorarioRealizada += res.tcmedio;
      if (res.nameId.name == "250") {
        this.realizado += res.count;
      } else if (res.nameId.name == "240") {
        this.realizado += res.count
      }
    });
    this.TCmedioRealizado = this.TCmedioRealizado / this.nodemcu.length - 1;
    this.MediaHorarioRealizada =
      (this.MediaHorarioRealizada / this.nodemcu.length - 1) / 8.5;
  }

  getValues() {
    if (this.hours >= '09:20') {
      this.effectiveTime = this.effectiveTime - 10;
      this.ProportionalDiscount = 10 / (this.TCimpostado / 60);
    }
    if (this.hours >= '12:00') {
      this.effectiveTime = this.effectiveTime - 60;
      this.ProportionalDiscount =
        this.ProportionalDiscount + 60 / (this.TCimpostado / 60);
    }
    if (this.hours >= '14:10') {
      this.effectiveTime = this.effectiveTime - 10;
      this.ProportionalDiscount =
        this.ProportionalDiscount + 10 / (this.TCimpostado / 60);
    }
    this.TCimpostado = 3600 / (this.imposto / this.shiftTime);


    this.previsto =
      this.date / (this.TCimpostado / 60) - this.ProportionalDiscount;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogMetaComponent, { width: '30%', height: '70%' });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        var newImposto = result.split(',')[0];
        if (newImposto != 0) {
          this.imposto = result.split(',')[0];
          this.mainService
            .put(this.imposto, this.TCimpostado, this.shiftTime, this.op)
            .subscribe();
        }
        this.shiftTime = result.split(',')[1];
        if (this.shiftTime == 0) {
          if (this.diaDaSemanda.getDay() == 5) {
            this.shiftTime = 7.66
          } else {
            this.shiftTime = 8.66;
          }
          this.mainService
            .put(this.imposto, this.TCimpostado, this.shiftTime, this.op)
            .subscribe();
          this.getValues();
        }
        var op = result.split(',')[2]
        if (op != "0") {
          this.mainService
            .put(this.imposto, this.TCimpostado, this.shiftTime, op)
            .subscribe();
          this.getValues();
        }
      }
    });
  }
}

