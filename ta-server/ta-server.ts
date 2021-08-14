import express = require("express");
import bodyParser = require("body-parser");
import { CadastroAlunos } from "./cadastro-alunos";

var taserver = express();

var cadastro: CadastroAlunos = new CadastroAlunos();

var allowCrossDomain = function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
taserver.use(allowCrossDomain);
taserver.use(bodyParser.json());

taserver.get("/alunos", function (req, res) {
  res.json(cadastro.getAlunos());
});

taserver.post("/alunos", function (req, res) {
  const aluno = req.body;
  const resposta = cadastro.cadastrar(aluno);

  if (resposta) {
    return res.json({ success: "Aluno cadastrado com sucesso" });
  }
  res.json({ failure: "Aluno não cadastrado. CPF duplicado" });
});

var server = taserver.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

function closeServer(): void {
  server.close();
}

export { server, closeServer };
