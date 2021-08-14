import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Aluno } from "../../../common/aluno";

@Injectable()
export class AlunoService {
  private static readonly SERVER_URL = "http://localhost:3000";

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

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${AlunoService.SERVER_URL}/alunos`);
  }
}
