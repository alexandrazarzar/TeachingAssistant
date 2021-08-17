import { CadastroAlunos } from "../cadastro-alunos";
import { Aluno } from "../../common/aluno";

describe("O cadastro de alunos", () => {
  var cadastro: CadastroAlunos;

  beforeEach(() => (cadastro = new CadastroAlunos()));

  it("é inicialmente vazio", () => {
    expect(cadastro.getAlunos().length).toBe(0);
  });

  it("cadastra alunos corretamente", () => {
    const aluno = new Aluno("Joao Pedro", "38387348074", "joao@email.com");
    cadastro.cadastrar(aluno);

    expect(cadastro.getAlunos()).toContain(aluno);
  });

  it("não cadastra alunos com cpf duplicado", () => {
    const aluno1 = new Aluno("Joao Pedro", "38387348074", "joao@email.com");
    const aluno2 = new Aluno("Edlamar", "38387348074", "edlamar@email.com");

    cadastro.cadastrar(aluno1);
    cadastro.cadastrar(aluno2);

    expect(cadastro.getAlunos()).toContain(aluno1);
    expect(cadastro.getAlunos()).not.toContain(aluno2);
  });

  it("não cadastra alunos com CPF inválido", () => {
    const aluno = new Aluno("Joao Pedro", "12345678910", "joao@email.com");

    cadastro.cadastrar(aluno);

    expect(cadastro.getAlunos()).not.toContain(aluno);
  });
});
