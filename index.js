const express = require('express');
const app = express();
const itens = require('./itens.json');
// mapear todas as marcas que ah no arquivo itens.json mas não duplicar ignorando letras maiusculas
const brand = itens.map((item) => item.marca).filter((value, index, self) => self.indexOf(value) === index);

console.log(brand);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const port = 3000;

app.get('/', (req, res) => {
    res.render('index', {marcas: brand});
});

app.get('/contact', (req, res) => {
    res.render('contact',{marcas: brand});
});

app.get('/product/:name', (req, res) => {
    const { name } = req.params;
    itens.map((item) => {
        if(item.name === name){
            res.render('product', {item: item, marcas: brand});
        }
    });
});

app.get('/brand/:name', (req, res) => {
    const { name } = req.params;
    // filtrar os itens que tem a marca igual ao parametro passado
    const item = itens.filter((item) => item.marca === name);
    res.render('brand', {itens: item, marcas: brand});
});

app.get('/products', (req, res) => {
    res.render('products', {itens: itens, marcas: brand});
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});