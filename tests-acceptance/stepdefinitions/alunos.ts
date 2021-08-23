import { defineSupportCode } from "cucumber";
import { browser, $, by, element } from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
import request = require("request-promise");

var SERVER_URL = "http://localhost:3000";

defineSupportCode(function ({ Given, When, Then }) {
  Given(/^The system has no student with CPF "(\d*)" and name "([^\"]*)"$/, async (cpf, nome) => {
    const response = await request.get(`${SERVER_URL}/alunos`, { json: true });
    expect(response.some((value) => value.cpf == cpf && value.nome == nome  )).to.equal(false);
  });

  When(/^I register the student "([^\"]*)" with CPF "(\d*)" and email "([^\"]*)"$/, async (nome, cpf, email) => {
    const body = { nome, cpf, email };
    const response = await request.post(`${SERVER_URL}/alunos`, { json: true, body });
    expect(response).to.have.any.keys('success', 'failure');
  });

  // atualizar (servidor)
  When(/^I update "([^\"]*)" whose CPF is "(\d*)" to "([^\"]*)" with CPF "(\d*)" and email "([^\"]*)"$/, async (nomeInicial, cpfInicial, nome, cpf, email) => {
    const body = {Aluno: { nome, cpf, email }, CPF: cpfInicial};
    const response = await request.put(`${SERVER_URL}/alunos`, { json: true, body });
    expect(response).to.have.any.keys('success', 'failure');
  });

  Then(/^The system stores "([^\"]*)" with CPF "(\d*)" and email "([^\"]*)"$/, async (nome, cpf, email) => {
    const response = await request.get(`${SERVER_URL}/alunos`, { json: true });
    expect(response.some((value) => value.cpf == cpf && value.nome == nome && value.email == email)).to.equal(true);
  });

  Given(/^The system has a student "([^\"]*)" with CPF "(\d*)" and email "([^\"]*)"$/, async (nome, cpf, email) => {
    const body = { nome, cpf, email };
    await request.post(`${SERVER_URL}/alunos`, { json: true, body });
    const studentList = await request.get(`${SERVER_URL}/alunos`, { json: true });
    expect(studentList.some((value) => value.cpf == cpf && value.nome == nome && value.email == email)).to.equal(true);
  });

  Given(/^I am at the students page$/, async () => {
    await browser.get("http://localhost:4200/");
    await expect(browser.getTitle()).to.eventually.equal('TaGui');
    await $("a[name='alunos']").click();
  })

  Given(/^I cannot see "([^\"]*)" with CPF "(\d*)" and email "([^\"]*)" in the students list$/, async (name, cpf, email) => {
    const alunos = await element.all(by.name('alunolist'))
      .map(async (linhaAluno) => {
        return {
          cpf: await linhaAluno.element(by.name('cpflist')).getText(),
          name: await linhaAluno.element(by.name('nomelist')).getText(),
          email: await linhaAluno.element(by.name('email')).getText()
        }
      }) as {cpf: string, name: string, email: string}[]

    expect(alunos.some(aluno => aluno.cpf == cpf && aluno.name == name && aluno.email == email)).to.equal(false);
  });

  When(/^I try to register the student "([^\"]*)" with CPF "(\d*)" and email "([^\"]*)"$/, async (name, cpf, email) => {
      await $("input[name='nome']").sendKeys(name as string);
      await $("input[name='cpf']").sendKeys(cpf as string);
      await $("input[name='email']").sendKeys(email as string);
      await element(by.buttonText('Cadastrar')).click();
  });

  // atualizar (GUI)
  When(/^I try to update "([^\"]*)" whose CPF is "(\d*)" to "([^\"]*)" with CPF "(\d*)" and email "([^\"]*)"$/, async (nomeInicial, cpfInicial, nome, cpf, email) => {
    await element(by.name('edit_button_' + cpfInicial)).click();
    await $("input[name='newNome']").clear();
    await $("input[name='newNome']").sendKeys(nome as string);
    await $("input[name='newCpf']").clear();
    await $("input[name='newCpf']").sendKeys(cpf as string);
    await $("input[name='newEmail']").clear();
    await $("input[name='newEmail']").sendKeys(email as string);
    await element(by.name('update_button')).click();
  });

  Given(/^I can see "([^\"]*)" with CPF "(\d*)" and email "([^\"]*)" in the students list$/, async (name, cpf, email) => {
    await $("input[name='nome']").sendKeys(name as string);
    await $("input[name='cpf']").sendKeys(cpf as string);
    await $("input[name='email']").sendKeys(email as string);
    await element(by.buttonText('Cadastrar')).click();

    const alunos = await element.all(by.name('alunolist'))
      .map(async (linhaAluno) => {
        return {
          cpf: await linhaAluno.element(by.name('cpflist')).getText(),
          name: await linhaAluno.element(by.name('nomelist')).getText(),
          email: await linhaAluno.element(by.name('email')).getText(),
        } 
      }) as {cpf: string, name: string, email: string}[]

    expect(alunos.some(aluno => aluno.cpf == cpf && aluno.name == name && aluno.email == email)).to.equal(true);
  });

  Then(/^I can see an error message$/, async () => {
    const errorMessage = await element.all(by.name('errorMessage'))

    expect(errorMessage.length).to.equal(1)
  });
});
