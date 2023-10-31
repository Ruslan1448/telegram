const TelegramBot = require("node-telegram-bot-api");
const API_KEY_BOT = '6803401621:AAExJ1nRh8YRAJdUXuac9368ej45Uv___ls';
const axios = require('axios');

const getExchangeInfo = async () => {
  const apiUrl = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5';
  const result = await axios.get(apiUrl, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  console.log(result.data)
  return result.data;
};


const bot = new TelegramBot(API_KEY_BOT, {

    polling: true,
    interval:300
    
});

const commands = [
  {command: "usd",
    description: "Dolar"},
  {command: "eur",
  description: "Euro"}
]
  bot.setMyCommands(commands);
bot.on('text', async msg => {
    console.log(msg);
    const exchanges = await getExchangeInfo();
    const exchange = exchanges.find((exchange) => exchange.ccy.toLowerCase() === msg.text.slice(1))
    if(msg.text.startsWith('/')) await bot.sendMessage(msg.chat.id, `Валюта ${exchange.ccy} до валюти ${exchange.base_ccy} \nЦіна покупки: ${exchange.buy} \nЦіна продажу: ${exchange.sale}`)
    
})

