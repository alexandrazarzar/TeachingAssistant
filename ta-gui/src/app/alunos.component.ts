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
  cpfAluno: string = "";
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

  atualizarAluno(aluno: Aluno): void {
    this.errorMessage = "";
    let alunoNew: Aluno = this.inputDeAtualizacao("new_nome_input", "new_cpf_input", "new_email_input");

    this.alunoService.atualizar(alunoNew, this.cpfAluno).subscribe({
      next: (alunoNew) => {
        this.cpfAluno = "";
        this.copiar(aluno, alunoNew);
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.cpfAluno = "";
      }
    });
  }

  editarAluno(aluno: Aluno): void{
    this.cpfAluno = aluno.cpf as string;
  }

  inputDeAtualizacao(inputNome, inputCpf, inputEmail: string): Aluno {
    let nome  = (document.getElementById(inputNome) as HTMLInputElement).value;
    let cpf   = (document.getElementById(inputCpf) as HTMLInputElement).value;
    let email = (document.getElementById(inputEmail) as HTMLInputElement).value;
    let aluno: Aluno = new Aluno(nome, cpf, email);
    return aluno
  }

  copiar(alunoInicial, alunoFinal: Aluno): void{
    alunoInicial.nome = alunoFinal.nome;
    alunoInicial.cpf = alunoFinal.cpf;
    alunoInicial.email = alunoFinal.email;
  }
}
