import request = require("request-promise");
import { Aluno } from "../../common/aluno";

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server: any;

  beforeAll(() => {
    server = require("../ta-server");
  });

  afterAll(() => {
    server.closeServer();
  });

  it("inicialmente retorna uma lista de alunos vazia", async () => {
    const body = await request.get(`${base_url}alunos`, { json: true });
    expect(body).toEqual([]);
  });

  it("só cadastra alunos", async () => {
    const aluno = {
      nome: "Joao Pedro",
      cpf: "38387348074",
      email: "joao@email.com",
    };

    const response = await request.post(`${base_url}alunos`, {
      body: aluno,
      json: true,
    });
    expect(response).toEqual({ success: "Aluno cadastrado com sucesso" });

    const listaAlunos = await request.get(`${base_url}alunos`, { json: true });
    expect(listaAlunos).toContain(aluno);
  });

  it("não cadastra alunos com CPF duplicado", async () => {
    const aluno1 = {
      nome: "Joao Pedro",
      cpf: "75270336065",
      email: "joao@email.com",
    };

    await request.post(`${base_url}alunos`, {
      body: aluno1,
      json: true,
    });

    const aluno2 = {
      nome: "Edlamar",
      cpf: "75270336065",
      email: "edlamar@email.com",
    };

    const response = await request.post(`${base_url}alunos`, {
      body: aluno2,
      json: true,
    });
    expect(response).toEqual({
      failure: "Aluno não cadastrado. CPF duplicado",
    });

    const listaAlunos = await request.get(`${base_url}alunos`, { json: true });
    expect(listaAlunos).toContain(aluno1);
    expect(listaAlunos).not.toContain(aluno2);
  });
});
