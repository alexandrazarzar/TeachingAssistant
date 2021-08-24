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
      email: "joao@cin.ufpe.br",
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
      email: "joao@cin.ufpe.br",
    };

    await request.post(`${base_url}alunos`, {
      body: aluno1,
      json: true,
    });

    const aluno2 = {
      nome: "Edlamar",
      cpf: "75270336065",
      email: "edlamar@cin.ufpe.br",
    };

    const response = await request.post(`${base_url}alunos`, {
      body: aluno2,
      json: true,
    });
    expect(response).toEqual({
      failure: "Aluno não cadastrado.",
    });

    const listaAlunos = await request.get(`${base_url}alunos`, { json: true });
    expect(listaAlunos).toContain(aluno1);
    expect(listaAlunos).not.toContain(aluno2);
  });

  it("não cadastra alunos com CPF inválido", async () => {
    const aluno = {
      nome: "Edlamar",
      cpf: "12345678910",
      email: "edlamar@cin.ufpe.br",
    };

    const response = await request.post(`${base_url}alunos`, {
      body: aluno,
      json: true,
    });
    expect(response).toEqual({
      failure: "Aluno não cadastrado.",
    });

    const listaAlunos = await request.get(`${base_url}alunos`, { json: true });
    expect(listaAlunos).not.toContain(aluno);
  });

  it("não cadastra alunos com email que não seja do CIn", async () => {
    const aluno = {
      nome: "Edlamar",
      cpf: "73410777008",
      email: "edlamar@gmail.com",
    };

    const response = await request.post(`${base_url}alunos`, {
      body: aluno,
      json: true,
    });
    expect(response).toEqual({
      failure: "Aluno não cadastrado.",
    });

    const listaAlunos = await request.get(`${base_url}alunos`, { json: true });
    expect(listaAlunos).not.toContain(aluno);
  });

  //atualizacao
  it("atualiza aluno com sucesso", async () => {
    const alunoInicial = {
      nome: "Alexandra",
      cpf: "09562980448",
      email: "alexandra@cin.ufpe.br",
    };
    const alunoFinal = {
      nome: "Alexandra",
      cpf: "81194668020",
      email: "alexandra@cin.ufpe.br",
    };
    const response1 = await request.post(`${base_url}alunos`, {
      body: alunoInicial,
      json: true,
    });
    expect(response1).toEqual({ success: "Aluno cadastrado com sucesso" });

    const response2 = await request.put(`${base_url}alunos`, {
      body: {Aluno: alunoFinal, CPF: alunoInicial.cpf},
      json: true,
    });
    
    expect(response2).toEqual({ success: "Aluno atualizado com sucesso" });

    const listaAlunos = await request.get(`${base_url}alunos`, { json: true });
    expect(listaAlunos).toContain(alunoFinal);
  });

  it("atualizacao sem sucesso por motivo de cpf duplicado", async () => {
    const aluno1 = {
      nome: "Eduardo",
      cpf: "22943731030",
      email: "eduardo@cin.ufpe.br",
    };
    const aluno2 = {
      nome: "David",
      cpf: "94811596048",
      email: "david@cin.ufpe.br",
    };
    const aluno1ComCpfDuplicado = {
      nome: "Eduardo",
      cpf: "94811596048",
      email: "eduardo@cin.ufpe.br",
    };
    const response1 = await request.post(`${base_url}alunos`, {
      body: aluno1,
      json: true,
    });
    expect(response1).toEqual({ success: "Aluno cadastrado com sucesso" });

    const response2 = await request.post(`${base_url}alunos`, {
      body: aluno2,
      json: true,
    });
    expect(response2).toEqual({ success: "Aluno cadastrado com sucesso" });

    const response3 = await request.put(`${base_url}alunos`, {
      body: {Aluno: aluno1ComCpfDuplicado, CPF: aluno1.cpf},
      json: true,
    });
    expect(response3).toEqual({ failure: "Erro ao atualizar aluno: dados inválidos ou duplicados. Tente novamente." });

    const listaAlunos = await request.get(`${base_url}alunos`, { json: true });
    expect(listaAlunos).toContain(aluno1);
    expect(listaAlunos).toContain(aluno2);
    expect(listaAlunos).not.toContain(aluno1ComCpfDuplicado);
  });

  it("atualizacao sem sucesso por motivo de cpf invalido", async () => {
    const alunoInicial = {
      nome: "Luisa",
      cpf: "42329889046",
      email: "luisa@cin.ufpe.br",
    };
    const alunoFinal = {
      nome: "Luisa",
      cpf: "01",
      email: "luisa@cin.ufpe.br",
    };
    const response1 = await request.post(`${base_url}alunos`, {
      body: alunoInicial,
      json: true,
    });
    expect(response1).toEqual({ success: "Aluno cadastrado com sucesso" });

    const response2 = await request.put(`${base_url}alunos`, {
      body: {Aluno: alunoFinal, CPF: alunoInicial.cpf},
      json: true,
    });
    expect(response2).toEqual({ failure: "Erro ao atualizar aluno: dados inválidos ou duplicados. Tente novamente." });

    const listaAlunos = await request.get(`${base_url}alunos`, { json: true });
    expect(listaAlunos).toContain(alunoInicial);
    expect(listaAlunos).not.toContain(alunoFinal);

  });

  it("atualizacao sem sucesso por motivo de campos vazios", async () => {
    const alunoInicial = {
      nome: "Bruninho",
      cpf: "38485515005",
      email: "bruninho@cin.ufpe.br",
    };
    const alunoFinal = {
      nome: "Luisa",
      cpf: "",
      email: "",
    };
    const response1 = await request.post(`${base_url}alunos`, {
      body: alunoInicial,
      json: true,
    });
    expect(response1).toEqual({ success: "Aluno cadastrado com sucesso" });

    const response2 = await request.put(`${base_url}alunos`, {
      body: {Aluno: alunoFinal, CPF: alunoInicial.cpf},
      json: true,
    });
    expect(response2).toEqual({ failure: "Erro ao atualizar aluno: dados inválidos ou duplicados. Tente novamente." });

    const listaAlunos = await request.get(`${base_url}alunos`, { json: true });
    expect(listaAlunos).toContain(alunoInicial);
    expect(listaAlunos).not.toContain(alunoFinal);

  });

});
