const axios = require('axios');
const cheerio = require('cheerio');
const urls = [
    'https://www.cashfort.com.br/cold-wallets/trezor-t-p1',
    'https://www.cashfort.com.br/cold-wallets/trezor-one-black-p2',
    'https://www.cashfort.com.br/cold-wallets/secux-w20-p6',
    'https://www.cashfort.com.br/cold-wallets/trezor-one-white-p9',
    'https://www.cashfort.com.br/cold-wallets/dcent-biometric-wallet-p16',
    'https://www.cashfort.com.br/cold-wallets/dcent-card-wallet-eth-p17',
    'https://www.cashfort.com.br/cold-wallets/safepal-s1-p21',
    'https://www.cashfort.com.br/cold-wallets/coolwallet-s-p25',
    'https://www.cashfort.com.br/cold-wallets/ellipal-mnemonics-metal-p31',
    'https://www.cashfort.com.br/cold-wallets/secux-w10-p32',
    'https://www.cashfort.com.br/cold-wallets/ledger-stax-lista-de-espera-p36',
    'https://www.cashfort.com.br/cold-wallets/ellipal-titan-mini-p37',
    'https://www.cashfort.com.br/cold-wallets/ledger-nano-s-plus-p39',
    'https://www.cashfort.com.br/cold-wallets/ledger-nano-x-p40',
    'https://www.cashfort.com.br/cold-wallets/case-safepal-s1-p42',
    'https://www.cashfort.com.br/cold-wallets/trezor-safe-3-p43',
    'https://www.cashfort.com.br/yubico/yubikey-5-nfc-yubico-p19',
    'https://www.cashfort.com.br/yubico/yubikey-5c-nfc-yubico-p20',
    'https://www.cashfort.com.br/yubico/security-key-nfc-yubico-p28',
    'https://www.cashfort.com.br/yubico/yubikey-5ci-p30',
    'https://www.cashfort.com.br/yubico/security-key-nfc-usb-c-yubico-p35',
    'https://www.cashfort.com.br/acessorios/ellipal-mnemonics-metal-p31',
    'https://www.cashfort.com.br/acessorios/cabo-otg-dcent-2-em-1-p38',
    'https://www.cashfort.com.br/acessorios/seedfort-proteja-suas-palavras-sementes-p41',
    'https://www.cashfort.com.br/acessorios/case-safepal-s1-p42'
]
let resjson = [];

async function checkStock(url){
    let response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let item = "{";

    console.log('\nChecking stock for: ' + url);
    let price = $('#preco_atual b').text().replace('R$ ', '');
    let marca = $('.lista-espc').text().trim().replaceAll('\t', '').replaceAll('\n', ':').replaceAll(':::::::', '\n').replaceAll(':::','').replaceAll('\n:','').replace('Funciona com Computador','').replace('Funciona com Celular','').replace('Código Aberto','').replace('Suporta Staking','');
    marca = marca.split('\n')
    for(let idx in marca){
        if(marca[idx] == ''){
            marca.splice(idx, 2);
        }
    }
    for(let idx in marca){
        marca[idx] = marca[idx].split(':');
        item += `"${marca[idx][0]}" : "${marca[idx][1]}",`;
    }
    item += `"price" : "${price.replace('.', '').replace(',', '.')}",`
    item += `"name": "${url.split('/')[url.split('/').length-1].replaceAll('-',' ')}"}`;
    resjson.push(JSON.parse(item));
}

async function doAll(){
    for(let idx in urls){
        await checkStock(urls[idx]);
    }
    console.log(resjson);
}
doAll();



