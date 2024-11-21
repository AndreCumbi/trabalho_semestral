const express = require("express");
const cors = require("cors")
const supabase = require('./supabaseClient');  // A classe cliente do Supabase que você forneceu

const app = express();
app.use(express.json())
app.use(cors())

// Rota de login
app.post("/login", async (req, res) => {
    const { username, password } = req.body
  
    if (!username || !password) {
      return res.status(400).json({ message: "Campos obrigatórios não preenchidos." })
    }
  
    const { data, error } = await supabase
      .from('app_users')
      .select('*')
      .eq('username', username)
      .eq('senha', password)
      .single();

    if (error) {
      return res.status(500).json({ message: "Erro no servidor." });
    }

    if (data) {
      res.status(200).json({ message: "Login bem-sucedido!", F:1 });
    } else {
      res.status(401).json({ message: "Credenciais inválidas!" });
    }
})

// Rota para pegar todos os usuários
app.get("/", async (req, res) => {
    const { data, error } = await supabase
      .from('app_users')
      .select('*');
  
    if (error) return res.json("Erro");
    return res.json(data);
});

// Rota para pegar documentos de um usuário
app.get("/docs/:nuid", async (req, res) => {
    const { nuid } = req.params;
    const { data, error } = await supabase
      .from('doc')
      .select('*')
      .eq('nuid', nuid);
  
    if (error) return res.json("Erro");
    return res.json(data);
});

// Rota para pegar detalhes de um documento
app.get("/detalhesdoc/:cod_doc", async (req, res) => {
    const { cod_doc } = req.params;
    const { data, error } = await supabase
      .from('doc')
      .select('*')
      .eq('cod_doc', cod_doc)
      .single();
  
    if (error) return res.json("Erro");
    return res.json(data);
});

// Rota para pegar detalhes de um BI
app.get("/detalhesBi/:num", async (req, res) => {
  const { num } = req.params;

  // Validação do parâmetro
  if (!num) {
      return res.status(400).json({ error: "Número do BI não fornecido" });
  }

  // Consulta ao banco de dados
  const { data, error } = await supabase
    .from('bi')
    .select('*')
    .eq('num', num)
    .single();

  // Tratamento de erro
  if (error) {
      console.error("Erro ao buscar detalhes do BI:", error);
      return res.status(500).json({ error: "Erro ao buscar detalhes do BI", detalhes: error.message });
  }

  return res.status(200).json(data);
});

// Rota para pegar credenciais de um usuário pelo NUID
app.get("/credenciais/:nuid", async (req, res) => {
    const { nuid } = req.params;
    const { data, error } = await supabase
      .from('app_users')
      .select('*')
      .eq('nuid', nuid)
      .single();

    if (error) {
        return res.status(500).json({ error: "Erro ao consultar o banco de dados", details: error.message });
    }

    if (!data) {
        return res.status(404).json({ message: "User não encontrado" });
    }

    return res.json(data);
});

// Rota para pegar um usuário pelo username
app.get("/nd/:username", async (req, res) => {
    const { username } = req.params;
    const { data, error } = await supabase
      .from('app_users')
      .select('*')
      .eq('username', username)
      .single();

    if (error) return res.status(500).json("Erro");
    if (!data) return res.status(404).json("User não encontrado");
    return res.json(data);
})

// Rota para pegar um nome pelo NUID
app.get("/nome/:nuid", async (req, res) => {
    const { nuid } = req.params;
    const { data, error } = await supabase
      .from('bi')
      .select('*')
      .eq('nuid', nuid)
      .single();

    if (error) return res.status(500).json("Erro");
    if (!data) return res.status(404).json("User não encontrado");
    return res.json(data);
})

// Rota para criar um documento
app.post('/createDoc', async (req, res) => {
    const { nuid, num, nome_doc, detalhes } = req.body;
    const { data, error } = await supabase
      .from('doc')
      .insert([{ nuid: nuid, cod_doc: num, nome_doc: nome_doc, detalhes: detalhes }]);

    if (error) {
        console.error("Erro na inserção na tabela 'doc':", error);
        return res.status(500).json({ error: "Erro ao inserir documento." });
    }
    return res.status(201).json({ message: "Documento inserido com sucesso!"});
});

// Rota para criar um usuário e BI
app.post('/create', async (req, res) => {
    // Gerar o NUID no formato "2024Mxxxx"
    const year = new Date().getFullYear(); // Ano atual
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4 dígitos aleatórios
    const nuid = (year * 10 + randomDigits);

    // Gerar o username e senha no formato "nome123"
    const username = req.body.nome.toLowerCase() + '123'; // nome em minúsculas + '123'
    const senha = username; // senha igual ao username

    // Inserir na tabela 'user' primeiro
    const { data: userData, error: userError } = await supabase
      .from('app_users')
      .insert([{ nuid: nuid, username, senha }]);

    if (userError) {
        console.error("Erro na inserção na tabela 'user':", userError);
        return res.status(500).json({ error: "Erro ao inserir usuário." });
    }

    // Inserir na tabela 'bi' depois
    const { data: biData, error: biError } = await supabase
      .from('bi')
      .insert([{
          nuid,
          num: req.body.num,
          nome: req.body.nome,
          data_nasc: req.body.data_nasc,
          nome_p: req.body.nome_p,
          nome_m: req.body.nome_m,

          residencia: req.body.residencia,
          altura: req.body.altura,
      }]);

    if (biError) {
        console.error("Erro na inserção na tabela 'BI':", biError);
        return res.status(500).json({ error: "Erro ao inserir BI." });
    }

    return res.json({ nuid }); // Retorna o NUID gerado
})

app.listen(8081, () => {
    console.log("Ouvindo");
});