const express = require('express');
const app = express();
const itens = require('./itens.json');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const port = 3000;

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/product/:name', (req, res) => {
    const { name } = req.params;
    itens.map((item) => {
        if(item.name === name){
            res.render('product', {item: item});
        }
    });
});

app.get('/products', (req, res) => {
    res.render('products', {itens: itens});
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});