const { createClient } = require('@supabase/supabase-js');

// Suas credenciais do Supabase
const SUPABASE_URL = 'https://dohofdxkvdoaztocqbkt.supabase.co'; // Substitua com sua URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaG9mZHhrdmRvYXp0b2NxYmt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxNzM3NjgsImV4cCI6MjA0Nzc0OTc2OH0.qS01SxefwFovGkNsgAsBsrjtx8a4DhcNAG_U65rj6Bs'; // Substitua com sua chave

// Criação do cliente Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Exportando o cliente para uso em outros arquivos
module.exports = supabase;
