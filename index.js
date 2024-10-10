import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => { res.render('index', { title: 'Blog app' }) })
app.listen(3000, () => console.log('Server is running on port 3000!'));