import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Aluno } from "../../../common/aluno";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AlunoService {
  private static readonly SERVER_URL = "http://localhost:3000";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private readonly http: HttpClient) {}

  cadastrar(aluno: Aluno): Observable<any> {
    return this.http.post<any>(`${AlunoService.SERVER_URL}/alunos`, aluno).pipe(
      map((res) => {
        if (res.success) {
          return aluno;
        }
        throw new Error(res.failure);
      })
    );
  }

  atualizar(aluno: Aluno, cpf: string): Observable<any> {
    return this.http.put<any>( `${AlunoService.SERVER_URL}/alunos`, JSON.stringify({Aluno: aluno, CPF: cpf}), { headers: this.headers })
      .pipe( 
        map(res => { if (res.success) { return aluno; } else { throw new Error(res.failure); } })
      );
  }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${AlunoService.SERVER_URL}/alunos`);
  }
}
