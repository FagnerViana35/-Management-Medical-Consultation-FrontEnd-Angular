import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Horario } from '../interfaces/Time.interface';
import { Observable } from 'rxjs';
import { Medico } from '../interfaces/medico.interface';

@Injectable({
    providedIn: 'root'
  })
  export class HorariosService {
    apiUrl: string = 'http://localhost:3000'
    constructor(private http: HttpClient) {}
  
    getHorarios(): Observable<Horario[]> {
      return this.http.get<Horario[]>(`${this.apiUrl}/consultas`);
    }

    getMedicos(): Observable<Medico[]> {
      return this.http.get<Medico[]>(`${this.apiUrl}/medicos`);
    }

    getMedicoById(medicoId: number): Observable<Horario[]> {
      const url = `${this.apiUrl}/consultas/?medicoId=${medicoId}`;
        return this.http.get<Horario[]>(url);
      }

    updateHorario(id: Horario, updateObject: any): Observable<Horario> {
      const url = `${this.apiUrl}/consultas/${id}`;
      return this.http.put<any>(url, updateObject);
    }
    
    salvarHorariosSelecionados(horariosSelecionados: Horario[]) {
      return this.http.post(`${this.apiUrl}/consultas`, horariosSelecionados);
    }
  }
