import { CadastroAlunos } from "../cadastro-alunos";
import { Aluno } from "../../common/aluno";

describe("O cadastro de alunos", () => {
  var cadastro: CadastroAlunos;

  beforeEach(() => (cadastro = new CadastroAlunos()));

  it("é inicialmente vazio", () => {
    expect(cadastro.getAlunos().length).toBe(0);
  });

  it("cadastra alunos corretamente", () => {
    const aluno = new Aluno("Joao Pedro", "38387348074", "joao@cin.ufpe.br");
    cadastro.cadastrar(aluno);

    expect(cadastro.getAlunos()).toContain(aluno);
  });

  it("não cadastra alunos com cpf duplicado", () => {
    const aluno1 = new Aluno("Joao Pedro", "38387348074", "joao@cin.ufpe.br");
    const aluno2 = new Aluno("Edlamar", "38387348074", "edlamar@cin.ufpe.br");

    cadastro.cadastrar(aluno1);
    cadastro.cadastrar(aluno2);

    expect(cadastro.getAlunos()).toContain(aluno1);
    expect(cadastro.getAlunos()).not.toContain(aluno2);
  });

  it("não cadastra alunos com CPF inválido", () => {
    const aluno = new Aluno("Joao Pedro", "12345678910", "joao@cin.ufpe.br");

    cadastro.cadastrar(aluno);

    expect(cadastro.getAlunos()).not.toContain(aluno);
  });

  it("não cadastra alunos com email que não sejam do CIN", () => {
    const aluno = new Aluno("Joao Pedro", "73410777008", "joao@gmail.com");

    cadastro.cadastrar(aluno);

    expect(cadastro.getAlunos()).not.toContain(aluno);
  });
  //atualizacao

  it("atualiza aluno com sucesso", () => {
    const alunoInicial = new Aluno("Alexandra", "09562980448", "alexandra@cin.ufpe.br");
    const alunoFinal = new Aluno("Alexandra", "12894620039", "alexandra@cin.ufpe.br");

    cadastro.cadastrar(alunoInicial);
    cadastro.atualizar(alunoFinal, alunoInicial.cpf);
    expect(cadastro.getAlunos()).toContain(alunoFinal)
  });

  it("atualizacao sem sucesso por motivo de cpf duplicado", () => {
    const aluno1 = new Aluno("Alexandra", "09562980448", "alexandra@cin.ufpe.br");
    const aluno2 = new Aluno("David", "94811596048", "david@cin.ufpe.br");
    const aluno1comCpfDuplicado = new Aluno("Alexandra", "94811596048", "alexandra@cin.ufpe.br");

    cadastro.cadastrar(aluno1);
    cadastro.cadastrar(aluno2);
    cadastro.atualizar(aluno1comCpfDuplicado, aluno1.cpf);
    expect(cadastro.getAlunos()).toContain(aluno1)
    expect(cadastro.getAlunos()).toContain(aluno2)
  });

  it("atualizacao sem sucesso por motivo de cpf invalido", () => {
    const alunoInicial = new Aluno("Alexandra", "09562980448", "alexandra@cin.ufpe.br");
    const alunoFinal = new Aluno("Alexandra", "01", "alexandra@cin.ufpe.br");

    cadastro.cadastrar(alunoInicial);
    cadastro.atualizar(alunoFinal, alunoInicial.cpf);
    expect(cadastro.getAlunos()).toContain(alunoInicial);
    expect(cadastro.getAlunos()).not.toContain(alunoFinal);

  });

  it("atualizacao sem sucesso por motivo de campos vazios", () => {
    const alunoInicial = new Aluno("Alexandra", "09562980448", "alexandra@cin.ufpe.br");
    const alunoFinal = new Aluno("Alexandra", "", "");

    cadastro.cadastrar(alunoInicial);
    cadastro.atualizar(alunoFinal, alunoInicial.cpf);
    expect(cadastro.getAlunos()).toContain(alunoInicial);
  });

});
