import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips/chips-module';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Main } from 'src/app/model/main';
import { Nodemcu } from 'src/app/model/nodemcu';
import { Operation } from 'src/app/model/operation/operation';
import { Realizado } from 'src/app/model/realizado';
import { OperationService } from 'src/app/service/operation.service';
import { SheetsService } from 'src/app/service/sheets.service';
import { DialogHelpComponent } from 'src/app/shared/dialog-help/dialog-help.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAvisoComponent } from 'src/app/shared/dialog-aviso/dialog-aviso.component';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit, OnDestroy {
  constructor(
    private operationService: OperationService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private sheetsService: SheetsService,
    private router: Router
  ) { }


  analiseButton: boolean = false;
  onAnalise: boolean = false;

  loadingButton: boolean = false;
  imposto: number = 0;
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
  realizadoHora!: Realizado;
  realizadoHoraAtual: number = 0;
  currentState: string = '';
  azulStateCalled: boolean = false;
  vermelhoStateCalled: boolean = false;
  verificarSeFoiUmaVez: boolean = true;
  localData: Date | undefined;
  intervalo!: NodeJS.Timer;
  tempoOcioso: number = 0;
  stateButton: boolean = true;
  contadorRodando: boolean = false;
  contador: number = 0;
  intervalRef: any;
  realizadoInterval!: NodeJS.Timer;
  count: number = 0;
  maintenance: number = 0;
  lmitedTime: number = 0;
  teste: any = true;
  nomeOperacao: number = 0;
  labelPosition: string = '';
  newConter: number = 0;
  newMaintenance: number = 0;
  onPausa: boolean = false;
  onAjuda: boolean = false
  limitedTimeOcioso: number = 0;
  operation: Operation = {
    id: 0,
    name: '',
    limitedTime: 0,
    ocupado: false,
    pausa: false,
    analise: false
  };
  storage: Storage = localStorage;

  @HostListener('window:beforeunload', ['$event'])
  async onBeforeUnload(event: Event) {
    this.operationService
      .atualizarOcupado(this.nomeOperacao.toString(), false)
      .subscribe();
  }
  openPopup() {
    const dialogRef = this.dialog.open(DialogHelpComponent, {
      width: '250px',
      data: { message: 'Tempo de ciclo indisponível, favor comunicar a líder' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('O popup foi fechado com resultado:', result);
      // Aqui você pode adicionar lógica para lidar com o resultado do popup
    });
  }
  
  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.nomeOperacao = params['name'];
        this.operationService.get(params['name']).subscribe(
          (res) => {
            if (res == null) {
              this.router.navigate(['http://172.16.34.229:4200/counter/070']);
            }
            this.operation = res;
            // if(this.operation.ocupado == true){
            //   this.router.navigate(['/error'])
            // }
            this.operationService
              .atualizarOcupado(this.nomeOperacao.toString(), true)
              .subscribe();
            this.operationService.getByName(this.operation.name).subscribe(
              (res) => {
                this.count = res.count;
                this.maintenance = res.maintenance;
                var newOperation = this.storage.getItem('operation')!;
                this.newConter = parseInt(this.storage.getItem('counter')!);
                this.newMaintenance = parseInt(
                  this.storage.getItem('maintenance')!
                );
                if (isNaN(this.newConter)) {
                  this.storage.setItem('operation', this.operation.name);
                  this.storage.setItem('counter', '0');
                  this.storage.setItem('maintenance', '0');
                } else {
                  if (newOperation != this.operation.name) {
                    this.storage.setItem('operation', this.operation.name);
                    this.storage.setItem('counter', '0');
                    this.storage.setItem('maintenance', '0');
                  }
                }
                this.newConter = parseInt(this.storage.getItem('counter')!);
                this.newMaintenance = parseInt(
                  this.storage.getItem('maintenance')!
                );
              },
              (errr) => {
                this.openSnackBar('Erro no Service', 'Ok');
              }
            );
          },
          (errr) => {
            console.log();
            this.router.navigate(['http://172.16.34.229:4200/counter/070']);
          }
        );
        this.operationService
          .getRealizadoHoraria(`${this.nomeOperacao}`)
          .subscribe((res: any) => {
            this.realizadoHora = res;
          });
      },
      (errr) => {
        this.router.navigate(['http://172.16.34.229:4200/counter/070']);
      }
    );

    this.operationService.getTCimposto().subscribe(
      (res: Main[]) => {
        res.forEach((res) => {
          this.lmitedTime = res.tcimposto;
          this.limitedTimeOcioso = res.tcimposto;
        });
      },
      (error) => {
        this.openSnackBar('Erro no Service', 'Ok');
      }
    );
    setInterval(() => {
      this.operationService.get(this.operation.name).subscribe(res => {
        if(res.analise == true){
          this.onAnalise = true
          clearInterval(this.intervalRef
          )
          clearInterval(this.intervalo)
          this.vermelhoStateCalled = false
          this.tempoOcioso =  0
          this.stateButton = true;
          this.contador = 0;
          this.tempoOcioso = 0;
          this.stateButton = true;
          this.contadorRodando = false;
          this.contador = 0;
          this.azulStateCalled = true;

        }
        else{
          this.onAnalise = false;
          this.azulStateCalled = false
          this.currentState = 'verde'
          clearInterval(this.intervalo)
          this.intervaloCounter()
        }

        if (res.pausa == true) {
          this.onPausa = true;
          clearInterval(this.intervalRef);
          clearInterval(this.intervalo);
          this.vermelhoStateCalled = false;
          this.tempoOcioso = 0;
          this.stateButton = true;
          this.contador = 0;
          this.tempoOcioso = 0;
          this.stateButton = true;
          this.contadorRodando = false;
          this.contador = 0;
          this.operationService.atualizarState(this.operation.name, 'verde');
        } else {
          this.onPausa = false;
          clearInterval(this.intervalo)
          this.intervaloCounter()
        }
      })
    }, 5000)
    setInterval(() => {
      this.operationService.getTCimposto().subscribe(
        (res: Main[]) => {
          res.forEach((res) => {
            
            this.lmitedTime = res.tcimposto;
            this.ajustarTempoToroide()
          });
        },
        (error) => {
          this.openSnackBar('Erro no Service', 'Ok');
        }
      );
      const data = new Date();
      if (data.getMinutes() == 0 && this.verificarSeFoiUmaVez == true) {
        this.verificarSeFoiUmaVez = false;
        var body: Nodemcu = {
          count: this.newConter,
          time: 0,
          state: 'verde',
          currentTC: this.contador,
          nameId: this.operation,
          maintenance: this.newMaintenance,
          shortestTC: this.contador,
          modelo: this.labelPosition,
        };
        this.sheetsService.submitForm(body, true).subscribe();
        this.newConter = 0;
        this.newMaintenance = 0;
        this.storage.setItem('counter', this.newConter.toString());
        this.storage.setItem('maintenance', this.newMaintenance.toString());
      } else if (data.getMinutes() == 1) {
        this.verificarSeFoiUmaVez = true;
      }
    }, 40000);
    setTimeout(() => {
      this.intervaloCounter();
    }, 1000);

    this.operationService.getTCimposto().subscribe((res: Main[]) => {
      this.imposto = res[0].imposto;
      this.shiftTime = res[0].shiftTime;
    });
    setInterval(() => {
      this.operationService
        .getRealizadoHoraria(`${this.nomeOperacao}`)
        .subscribe((res: any) => {
          this.count = 0;
          this.realizadoHora = res;
          this.count += res.horas7;
          this.count += res.horas8;
          this.count += res.horas9;
          this.count += res.horas10;
          this.count += res.horas11;
          this.count += res.horas12;
          this.count += res.horas13;
          this.count += res.horas14;
          this.count += res.horas15;
          this.count += res.horas16;
          this.count += res.horas17;
          var horas = new Date().getHours();
          if (horas == 7) {
            this.realizadoHoraAtual = this.realizadoHora.horas7;
          } else if (horas == 8) {
            this.realizadoHoraAtual = this.realizadoHora.horas8;
          } else if (horas == 9) {
            this.realizadoHoraAtual = this.realizadoHora.horas9;
          } else if (horas == 10) {
            this.realizadoHoraAtual = this.realizadoHora.horas10;
          } else if (horas == 11) {
            this.realizadoHoraAtual = this.realizadoHora.horas11;
          } else if (horas == 12) {
            this.realizadoHoraAtual = this.realizadoHora.horas12;
          } else if (horas == 13) {
            this.realizadoHoraAtual = this.realizadoHora.horas13;
          } else if (horas == 14) {
            this.realizadoHoraAtual = this.realizadoHora.horas14;
          } else if (horas == 15) {
            this.realizadoHoraAtual = this.realizadoHora.horas15;
          } else if (horas == 16) {
            this.realizadoHoraAtual = this.realizadoHora.horas16;
          }
        });
      var horas = new Date().getHours();
      if (horas == 7) {
        this.minutos8 = new Date().getMinutes();
      } else if (horas == 8) {
        this.minutos8 = 60;
        this.minutos9 = new Date().getMinutes();
      } else if (horas == 9) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = new Date().getMinutes();
      } else if (horas == 10) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = new Date().getMinutes();
      } else if (horas == 11) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = new Date().getMinutes();
      } else if (horas == 12) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = new Date().getMinutes();
      } else if (horas == 13) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = 60;
        this.minutos14 = new Date().getMinutes();
      } else if (horas == 14) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = 60;
        this.minutos14 = 60;
        this.minutos15 = new Date().getMinutes();
      } else if (horas == 15) {
        this.minutos8 = 60;
        this.minutos9 = 60;
        this.minutos10 = 60;
        this.minutos11 = 60;
        this.minutos12 = 60;
        this.minutos13 = 60;
        this.minutos14 = 60;
        this.minutos15 = 60;
        this.minutos16 = new Date().getMinutes();
      } else if (horas == 16) {
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
      } else if (horas == 17) {
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
    }, 1000);
  }

  enterFullscreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }

  intervaloCounter() {
    this.intervalo = setInterval(() => {
      if (!this.contadorRodando && this.analiseButton != true && this.onAnalise != true ) {
        if (this.tempoOcioso > this.limitedTimeOcioso) {
          if (!this.vermelhoStateCalled) {
            this.operationService.atualizarState(this.operation.name, 'vermelho');
            this.vermelhoStateCalled = true;
          }
        }
        if (this.operation.name == "100" || this.operation.name == "110" || this.operation.name == "080" || this.operation.name == "090") {
          this.vermelhoStateCalled = false
        }

        if (this.tempoOcioso === parseInt((this.limitedTimeOcioso + 60).toFixed(0))) {
          this.operationService.changeTimeExcess(this.operation.name);
        }

        this.tempoOcioso++;

      }
    }, 1000);
  }


  ngOnDestroy() {
    clearInterval(this.realizadoInterval)
    clearInterval(this.intervalo)
    this.stopTimer('');
  }
  openDialogAviso(): void {
    this.dialog.open(DialogAvisoComponent, {
      width: '900px',
      height: '400px',
    });
  }
  toggleContagem(state: string) {
    clearInterval(this.intervalo);
    this.vermelhoStateCalled = false;
    this.tempoOcioso = 0;
    if (this.contadorRodando) {
      if (this.contador >= 15) {
        this.tempoOcioso = 0;
        this.intervaloCounter();
        this.stopTimer(state);
        this.stateButton = true;
        this.contador = 0;
        this.operationService.atualizar(this.operation.name, this.contador);
      } else {
        this.openDialogAviso();
      }
    } else {
      if (state != 'refuse') {
        this.iniciarContagem(state);
        this.stateButton = false;
      }
    }
  }

  iniciarContagem(state: string) {
    this.currentState = 'verde';
    this.contadorRodando = true;
    this.intervalRef = setInterval(() => {
      this.contador++;
      this.operationService.atualizar(this.operation.name, this.contador);
      if (this.contador === parseInt((this.limitedTimeOcioso + 60).toFixed(0))) {
        this.operationService.changeTimeExcess(this.operation.name);
        console.log("enviou1")
      }
      if (
        this.operation.name == '160' ||
        this.operation.name == '170' ||
        this.operation.name == '180' ||
        this.operation.name == '190' ||
        this.operation.name == '200' ||
        this.operation.name == '210' ||
        this.operation.name == '220' ||
        this.operation.name == '230' 
      ) 
      {
      if (this.contador > 9999) {
        this.stopTimer(state);
      } else if (this.contador > 240 && this.currentState == 'azul') {
        console.log(this.currentState);
        this.currentState = 'vermelho';
        this.operationService.atualizarState(this.operation.name, 'vermelho');
      } else if (this.contador < 240 && this.currentState == 'verde') {
        this.currentState = 'azul';
        this.operationService.atualizarState(this.operation.name, 'verde');
      }
      } else {
        if (this.contador > 9999) {
          this.stopTimer(state);
      } else if (
        this.contador > this.lmitedTime &&
        this.currentState == 'azul'
      ) {
        this.currentState = 'vermelho';
        this.operationService.atualizarState(this.operation.name, 'vermelho');
      } else if (
        this.contador > this.lmitedTime &&
        this.currentState == 'vermelho'
      ) {
        this.currentState = 'verde';
        this.operationService.atualizarState(this.operation.name, 'vermelho');
      } else if (
        this.contador < this.lmitedTime &&
        this.currentState == 'verde'
       ) {
        this.currentState = 'vermelho';
        this.operationService.atualizarState(this.operation.name, 'verde');
      }
      }
    }, 1000);
  }

  stopTimer(state: string) {
    this.operationService.getTCimposto().subscribe((res: Main[]) => {
      this.operationService.atualizar(this.operation.name, this.contador);
      res.forEach((res) => {
        this.lmitedTime = res.tcimposto;
      });
    });
    if (state == 'count') {
      this.newConter++;
      this.storage.setItem('counter', this.newConter.toString());
    } else if (state == 'refuse') {
      this.maintenance++;
      this.newMaintenance++;
      this.storage.setItem('maintenance', this.newMaintenance.toString());
    }
    this.contadorRodando = false;
    clearInterval(this.intervalRef);
    if (
      this.contador > this.lmitedTime &&
      this.contador < this.lmitedTime * 3
    ) {
      var body: Nodemcu = {
        count: this.count,
        time: 0,
        state: 'verde',
        currentTC: this.contador,
        nameId: this.operation,
        maintenance: this.maintenance,
        shortestTC: this.contador,
        modelo: this.labelPosition,
      };
      this.operationService.post(body).subscribe((res) => {
        if (res) {
          this.openSnackBar('Enviado com sucesso', 'Ok');
        } else {
          this.openSnackBar('Erro ao enviar', 'Ok');
        }
      });
    } else if (this.contador >= this.lmitedTime * 3) {
      var body: Nodemcu = {
        count: this.count,
        time: 0,
        state: 'verde',
        currentTC: this.contador,
        nameId: this.operation,
        maintenance: this.maintenance,
        shortestTC: this.contador,
        modelo: this.labelPosition,
      };
      this.operationService.post(body).subscribe((res) => {
        if (res) {
          this.openSnackBar('Enviado com sucesso', 'Ok');
        } else {
          this.openSnackBar('Erro ao enviar', 'Ok');
        }
      });
    } else {
      var body: Nodemcu = {
        count: this.count,
        time: 0,
        state: 'verde',
        currentTC: this.contador,
        nameId: this.operation,
        maintenance: this.maintenance,
        shortestTC: this.contador,
        modelo: this.labelPosition,
      };
      this.operationService.post(body).subscribe((res) => {
        if (res) {
          this.openSnackBar('Enviado com sucesso', 'Ok');
        } else {
          this.openSnackBar('Erro ao enviar', 'Ok');
        }
      });
    }
    this.contador = 0; // Reseta o contador para 0 quando a contagem é parada
    this.operationService.atualizar(this.operation.name, 0);
    var body: Nodemcu = {
      count: this.newConter,
      time: 0,
      state: 'verde',
      currentTC: this.contador,
      nameId: this.operation,
      maintenance: this.newMaintenance,
      shortestTC: this.contador,
      modelo: this.labelPosition,
    };
    this.sheetsService.submitForm(body, false).subscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogHelpComponent, {
      data: this.operation.name,
    });
  }

  ajustarTempoToroide() {
    if (this.operation.name == "170" || this.operation.name == "180" || this.operation.name == "160" || this.operation.name == "150") {
      this.lmitedTime = 240
    }
  }

  analise() {
    this.operationService.changeAnalise(this.operation.name, !this.analiseButton)
    this.analiseButton = !this.analiseButton
    if (this.analiseButton) {
      clearInterval(this.intervalRef);
      this.onAnalise = true;
      this.contadorRodando = false;
      this.vermelhoStateCalled = false;
      this.tempoOcioso = 0;
      this.intervaloCounter();
      this.stateButton = true;
      this.contador = 0;

      clearInterval(this.intervalRef);

      setTimeout(() => {
        this.azulStateCalled = true;
      }, 100)
    } else {
      this.azulStateCalled = false;
      this.onAnalise = false;
    }
  }

  ajuda() {
    this.onAjuda = !this.onAjuda; // Alternar entre verdadeiro e falso ao clicar
    if (this.onAjuda) {
        // Se a ajuda estiver ativada
        this.operationService.changeAjuda(this.operation.name);
        clearInterval(this.intervalo);
        this.tempoOcioso = 0;
        this.intervaloCounter();
        this.stateButton = true;
        this.contador = 0;
        this.contadorRodando = false;
        clearInterval(this.intervalRef);
        this.vermelhoStateCalled = false;
        this.azulStateCalled = false;
    } else {
        this.operationService.atualizarState(this.operation.name, 'verde');
      
    }
}

}

