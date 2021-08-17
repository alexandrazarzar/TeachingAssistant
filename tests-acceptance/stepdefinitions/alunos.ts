import { defineSupportCode } from "cucumber";
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
});
