import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Aluno } from "../../../common/aluno";
import { AlunoService } from "./aluno.service";

@Component({
  selector: "app-root",
  templateUrl: "./alunos.component.html",
  styleUrls: ["./alunos.component.css"],
})
export class AlunosComponent implements OnInit, OnDestroy {
  aluno: Aluno = { nome: "", cpf: "", email: "" };
  errorMessage: string = "";
  alunos: Aluno[] = [];
  alunosSubscription: Subscription;

  constructor(private readonly alunoService: AlunoService) {}

  ngOnInit(): void {
    this.alunosSubscription = this.alunoService.getAlunos().subscribe({
      next: (alunos) => {
        this.alunos = alunos;
      },
      error: (error) => alert(error.message),
    });
  }

  ngOnDestroy(): void {
    if (this.alunosSubscription) {
      this.alunosSubscription.unsubscribe();
    }
  }

  cadastrarAluno(aluno: Aluno): void {
    this.errorMessage = "";
    this.alunoService.cadastrar(aluno).subscribe({
      next: (aluno) => {
        this.alunos.push(aluno);
        this.aluno = { nome: "", cpf: "", email: "" };
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.aluno = { nome: "", cpf: "", email: "" };
      }
    });
  }
}
