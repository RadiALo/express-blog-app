import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let articles = [];

fs.readFile(path.join(__dirname, 'data', 'articles.json'), 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
  }

  articles = JSON.parse(data);

  articles.forEach((article, index) => {
    article.id = index
    article.link = `articles/${article.id}`
  });
})

console.log(articles)

const app = express();

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public/stylesheets'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/stylesheets',
    force: true
  })
);

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => { res.render('index', { title: 'Blog app', articles }) })
app.get('/categories', (req, res) => { res.render('categories', { title: 'Blog app', articles }) })
app.get('/articles', (req, res) => { res.render('articles', { title: 'Blog app', articles }) })
app.get('/articles/:id', (req, res) => { res.render('article', { title: 'Blog app', article: articles[req.params.id] }) })

app.listen(3000, () => console.log('Server is running on port 3000!'));
