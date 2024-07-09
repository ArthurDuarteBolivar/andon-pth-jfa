import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './pages/counter/counter.component';
import { AppComponent } from './app.component';
import { ErrorRouterComponent } from './pages/error-router/error-router.component';
import { AnaliseComponent } from './pages/analise/analise.component';

const routes: Routes = [
  { path: "counter/:name", component: CounterComponent },
  {path: "error", component: ErrorRouterComponent},
  { path: 'lider', component: AnaliseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
