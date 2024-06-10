const express = require('express');
const mailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const itens = require('./itens.json');
// mapear todas as marcas que ah no arquivo itens.json mas não duplicar ignorando letras maiusculas
let brand = itens.map((item) => item.marca).filter((value, index, self) => self.indexOf(value) === index);
brand = brand.sort();

const smtp = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secureConnection: true,
    auth: {
        user: 'cashfortcontato@gmail.com',
        pass: ''
    }
});

console.log(brand);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

app.post('/send', (req, res)=>{
    const {name, email, text, target} = req.body;
    console.log(target);
    smtp.sendMail({
        to: target,
        subject: 'Contato CashFort',
        html: `<h2>Nome: ${name}</h2><h2>Email: ${email}</h2><h3>Mensagem: ${text}</h3>`
    }).then(()=>{
        console.log('Mensagem enviada com sucesso!');
    }).catch((error)=>{
        console.log('Erro ao enviar mensagem: ' + error);
    }).finally(()=>{
        res.redirect('/contact');
    });
})

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