const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app =express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "es"
})

app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: "Campos obrigatórios não preenchidos." });
    }
  
    const query = "SELECT * FROM user WHERE username = ? AND senha = ?";
    db.query(query, [username, password], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Erro no servidor." });
      }
  
      if (results.length > 0) {
        res.status(200).json({ message: "Login bem-sucedido!" });
      } else {
        res.status(401).json({ message: "Credenciais inválidas!" });
      }
    });
  });

app.get("/", (req, res)=>{
    const sql = "Select * from user";
    db.query(sql,(err,data)=>{
        if(err) return res.json("Erro");
        return res.json(data);
    })
})

app.get("/docs/:nuid", (req, res)=>{
    const nuid = req.params.nuid;
    const sql = "Select * from doc where NUID =?";
    db.query(sql,[nuid],(err,data)=>{
        if(err) return res.json("Erro");
        return res.json(data);
    })
})

app.get("/detalhesdoc/:cod_doc", (req, res)=>{
    const cod_doc = req.params.cod_doc;
    const sql = "Select * from doc where cod_doc =?";
    db.query(sql,[cod_doc],(err,data)=>{
        if(err) return res.json("Erro");
        return res.json(data[0]);
    })
})

app.get("/detalhesBi/:num", (req, res)=>{
    const num = req.params.num;
    const sql = "Select * from bi where num =?";
    db.query(sql,[num],(err,data)=>{
        if(err) return res.json("Erro");
        return res.json(data[0]);
    })
})


app.get("/credenciais/:nuid", (req, res) => {
    const sql = "SELECT * FROM user WHERE NUID = ?";
    const nuid = req.params.nuid;

    db.query(sql, [nuid], (err, data) => {
        if (err) {
            // Retornar erro 500 com uma mensagem mais detalhada
            return res.status(500).json({ error: "Erro ao consultar o banco de dados", details: err });
        }

        if (data.length === 0) {
            // Retornar erro 404 com mensagem em formato JSON
            return res.status(404).json({ message: "User não encontrado" });
        }

        // Retornar os dados do usuário em formato JSON
        return res.json(data[0]);
    });
});

app.get("/nd/:username", (req, res) => {
    const sql = "SELECT * FROM user WHERE username = ?";
    const user = req.params.username;

    db.query(sql, [user], (err, data) => {
        if (err) return res.status(500).json("Erro");
        if (data.length === 0) return res.status(404).json("User não encontrado");
        return res.json(data[0]);
    });
})

app.get("/nome/:nuid", (req, res) => {
    const sql = "SELECT * FROM bi WHERE nuid = ?";
    const nuid = req.params.nuid;

    db.query(sql, [nuid], (err, data) => {
        if (err) return res.status(500).json("Erro");
        if (data.length === 0) return res.status(404).json("User não encontrado");
        return res.json(data[0]);
    });
})

app.post('/createDoc', (req, res) => {
    const sql2 = "INSERT INTO doc (NUID, cod_doc, nome_doc, detalhes) VALUES (?, ?, ?, ?)";
    const values2 = [req.body.nuid, req.body.num, req.body.nome_doc, req.body.detalhes];

    db.query(sql2, values2, (err2, data2) => {
        if (err2) {
            console.error("Erro na inserção na tabela 'doc':", err2);
            return res.status(500).json({ error: "Erro ao inserir documento." });
        }
        // Retornar uma mensagem de sucesso com o ID do documento inserido (se relevante)
        return res.status(201).json({ message: "Documento inserido com sucesso!", docId: data2.insertId });
    });
});

app.post('/create', (req, res) => {
    // Gerar o NUID no formato "2024Mxxxx"
    const year = new Date().getFullYear(); // Ano atual
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4 dígitos aleatórios
    const nuid = (year*10+randomDigits);

    // Gerar o username e senha no formato "nome123"
    const username = req.body.nome.toLowerCase() + '123'; // nome em minúsculas + '123'
    const senha = username; // senha igual ao username

    // Inserir na tabela 'user' primeiro
    const sql2 = "INSERT INTO user (NUID, username, senha) VALUES (?, ?, ?)";
    const values2 = [nuid, username, senha];

    db.query(sql2, values2, (err2, data2) => {
        if (err2) {
            console.error("Erro na inserção na tabela 'user':", err2);  // Adicionado para depuração
            return res.status(500).json({ error: "Erro ao inserir usuário." });
        }

        // Inserir na tabela 'BI' depois
        const sql = "INSERT INTO BI (nuid, num, nome, data_nasc, nome_p, nome_m, residencia, altura) VALUES (?,?, ?, ?, ?, ?, ?, ?)";
        const values = [
            nuid,
            req.body.num,
            req.body.nome,
            req.body.data_nasc,
            req.body.nome_p,
            req.body.nome_m,
            req.body.residencia,
            req.body.altura,
        ];

        db.query(sql, values, (err, data) => {
            if (err) {
                console.error("Erro na inserção na tabela 'BI':", err);  // Adicionado para depuração
                return res.status(500).json({ error: "Erro ao inserir BI." });
            }
            return res.json({ nuid: nuid }); // Retorna o NUID gerado
        });
    });
})



app.listen(8081,()=>{
    console.log("Ouvindo");
})