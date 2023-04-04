import { SelectionModel } from '@angular/cdk/collections';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Horario } from 'src/app/interfaces/Time.interface';
import { Medical } from 'src/app/interfaces/medical.interface';
import { HorariosService } from 'src/app/services/time.services';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-horarios-consulta',
  templateUrl: './horarios-consulta.component.html',
  styleUrls: ['./horarios-consulta.component.scss']
})
export class HorariosConsultaComponent {

  ELEMENT_DATA: any = [];
  displayedColumns: string[] = ['data', 'horario', 'disponivel', 'selecionar-consultar'];
  dataSource = new MatTableDataSource<Horario>(this.ELEMENT_DATA);
  
  horarios: any;
  atualizado!: boolean;
  endpointInput: any;
  menuItemSelected: any;
  isOptionalCookieChecked: boolean = true;
  selection = new SelectionModel<Medical>(true, []);
  listaCheck!: Horario;
  checkedSelecionado: boolean = false;
  updateObject: any;
  horariosConsulta: any;
  id!: number;

  emailData = {
    from: '',
    fromName: '',
    to: '',
    subject: '',
    bodyHtml: ''
  };

  constructor(private emailService: EmailService, private location: Location, private horarioService: HorariosService, private router: ActivatedRoute, private dialog: MatDialog, private route: Router) {}

  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  onCheckboxChange(row: any, event: any) { 
    if (event.target.checked) {
      this.listaCheck = row.id;
      this.updateObject = {
        ...row,
        escolhido: event.target.checked,
        disponivel: !event.target.checked
      };
      this.checkedSelecionado = event.target.checked;
      console.log(this.checkedSelecionado)
    } else {
      this.checkedSelecionado = event.target.checked;
      console.log(this.checkedSelecionado)
    }
  }

  onUpdateHorario(id: any) {
    this.horarioService.updateHorario(id, this.updateObject).subscribe(() => {
      console.log('Horário atualizado com sucesso!');
    });
  }
  
  salvarSelecionados() {
    const subject = `Nova mensagem de )`;
    const text = `Mensagem:`;
    const to = 'fagner.viana@domvsit.com.br';

    if (this.checkedSelecionado === true) {
      this.horariosConsulta.filter((horario: any) => horario.id);
      this.horariosConsulta.forEach((horario: any) => {
        console.log(horario.selecionado)
          this.horarioService.updateHorario(this.listaCheck, this.updateObject).subscribe(
            (response) => {
              console.log('Horário atualizado com sucesso:', response);
              setTimeout(() => {
                this.route.navigate(['']);
              }, 1000);
            },
            (error) => {
              console.error('Erro ao atualizar horário:', error);
            }
          );
      });
    }
  }
  
  back() {
    this.location.back();
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.horarioService.getMedicoById(this.id).subscribe(horarios =>{
      console.log(horarios)
      this.horariosConsulta = horarios;
    })
  }
  

  onNoClick(): void {}

}