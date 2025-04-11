const express = require('express'); 
const app = express(); 
const port = 3000;

app.use(express.json()); 


let pessoas = [
  { nome: "Joazinho", idade: 22 },
  { nome: "Aninha", idade: 25 },
  { nome: "Zezinho", idade: 21 },
];


app.get('/', (req, res) => {
  console.log("Alguém acionou a rota raiz.");
  res.send('Servidor rodando com Express!');
});


app.get('/pessoas', (req, res) => {
  console.log("Alguém acessou a rota /pessoas.");
  res.json(pessoas);
});

app.get('/pessoas/:id', (req, res) => {
  const { id } = req.params;
  const index = parseInt(id);

  if (isNaN(index) || index < 0 || index >= pessoas.length) {
    return res.status(404).json({ erro: "Pessoa não encontrada." });
  }

  console.log(`ID recebido: ${id}`);
  res.json(pessoas[index]);
});


app.post('/pessoas', (req, res) => {
  const novaPessoa = req.body;

  if (!novaPessoa.nome || !novaPessoa.idade) {
    return res.status(400).json({ erro: "Nome e idade são obrigatórios." });
  }

  pessoas.push(novaPessoa);
  console.log(`Pessoa adicionada: ${novaPessoa.nome}`);
  res.status(201).json(novaPessoa);
});


app.delete('/pessoas/:nome', (req, res) => {
  const nome = req.params.nome;
  const index = pessoas.findIndex(p => p.nome.toLowerCase() === nome.toLowerCase());

  if (index === -1) {
    return res.status(404).json({ erro: "Pessoa não encontrada." });
  }

  const pessoaRemovida = pessoas.splice(index, 1);
  console.log(`Pessoa removida: ${pessoaRemovida[0].nome}`);
  res.json({ mensagem: "Pessoa removida com sucesso." });
});


app.listen(port, () => {
  console.log(`Servidor ouvindo em http://localhost:${port}`);
});
