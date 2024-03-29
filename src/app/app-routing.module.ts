import { CadastroComponent } from './components/cadastro/cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TableMedicalComponent } from './components/table-medical/table-medical.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HorariosConsultaComponent } from './components/horarios-consulta/horarios-consulta.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: CadastroComponent },
  {path: 'horarios-consulta/:id', component: HorariosConsultaComponent},
  {path: 'consult-medical', component: TableMedicalComponent}
  // {path: 'consult-medical', component: TableMedicalComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }