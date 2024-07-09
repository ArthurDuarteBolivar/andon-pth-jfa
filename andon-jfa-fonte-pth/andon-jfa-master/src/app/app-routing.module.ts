import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PausaComponent } from './pausa/pausa.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pausa', component: PausaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
