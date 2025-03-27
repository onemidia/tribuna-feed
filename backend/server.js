// backend/server.js
const express = require('express');
const fetch = require('node-fetch');
const xml2js = require('xml2js');

const app = express();
const PORT = process.env.PORT || 3000;

// URL do feed RSS
const rssUrl = 'https://www.tribunaonline.net/feed/';

// Função para converter RSS XML em JSON
const convertRSS = async () => {
  const response = await fetch(rssUrl);
  const xmlData = await response.text();
  const parser = new xml2js.Parser();
  return parser.parseStringPromise(xmlData);
};

// Endpoint que retorna o feed RSS como JSON
app.get('/api/rss-feed', async (req, res) => {
  try {
    const jsonFeed = await convertRSS();
    res.json(jsonFeed);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar o feed RSS' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
