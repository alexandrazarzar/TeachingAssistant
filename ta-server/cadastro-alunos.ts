import { Aluno } from "../common/aluno";

export class CadastroAlunos {
  private readonly alunos: Aluno[] = [];

  getAlunos(): Aluno[] {
    return this.alunos;
  }

  cadastrar(aluno: Aluno): Aluno | null {
    if (this.alunos.some((a) => a.cpf === aluno.cpf)) {
      return null;
    }
    this.alunos.push(aluno);
    return aluno;
  }
}
