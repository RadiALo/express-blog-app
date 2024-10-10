import express from 'express';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => { res.render('index', { title: 'Blog app' }) })
app.get('/categories', (req, res) => { res.render('categories', { title: 'Blog app'}) })
app.get('/articles', (req, res) => { res.render('articles', { title: 'Blog app'}) })
app.listen(3000, () => console.log('Server is running on port 3000!'));