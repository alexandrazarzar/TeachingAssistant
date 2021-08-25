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

    if (this.cpfInvalido(aluno.cpf)) {
      return null;
    }

    if(this.emailInvalido(aluno.email)) {
      return null;
    }

    this.alunos.push(aluno);
    return aluno;
  }

  atualizar(aluno: Aluno, cpf: string): Aluno | null {
    var alunoASerAtualizado: Aluno = this.alunos.find(a => a.cpf === cpf);
    if (this.cpfNaoDuplicado(aluno, cpf) && this.dadosValidos(aluno)){
      this.atualizarDados(alunoASerAtualizado, aluno);
      return alunoASerAtualizado;
  }
    return null;
  }

  private cpfInvalido(cpf: string) {
    let soma = 0;
    let resto = 0;

    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) {
      resto = 0;
    }
    if (resto != parseInt(cpf.substring(9, 10)) || (cpf.length > 11)) {
      return true;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;

    return resto != parseInt(cpf.substring(10, 11));
  }

  private emailInvalido(email: string) {
    return !email.endsWith('@cin.ufpe.br');
  }

  private dadosValidos(aluno: Aluno) {
    return (!this.cpfInvalido(aluno.cpf) && !this.emailInvalido(aluno.email) && (aluno.nome !== ""));
  }

  private cpfNaoDuplicado(aluno: Aluno, cpf: string) {
    return(aluno.cpf === cpf || !this.alunos.find((a) => a.cpf === aluno.cpf))
  }

  private atualizarDados(alunoInicial: Aluno, alunoFinal: Aluno){
    alunoInicial.nome = alunoFinal.nome;
    alunoInicial.cpf = alunoFinal.cpf;
    alunoInicial.email = alunoFinal.email;
  }

}
