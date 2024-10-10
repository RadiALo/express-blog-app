import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

app.get('/', (req, res) => { res.render('index', { title: 'Blog app' }) })
app.get('/categories', (req, res) => { res.render('categories', { title: 'Blog app'}) })
app.get('/articles', (req, res) => { res.render('articles', { title: 'Blog app'}) })
app.listen(3000, () => console.log('Server is running on port 3000!'));