const { Markup, Composer, Scenes } = require('telegraf');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const botMessage = new TelegramBot(process.env.BOT_TOKEN);
const fs = require('fs');
const { Console } = require('console');
const local = require('../../utils/axios');

const messageText = new Composer();
messageText.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data = {};
    ctx.wizard.state.data.id = ctx.message.message_id;
    ctx.wizard.state.data.userId = ctx.message.from.id;

    ctx.wizard.state.data.userName = ctx.message.from.username;
    ctx.wizard.state.data.firstName = ctx.message.from.first_name;
    ctx.wizard.state.data.lastName = ctx.message.from.last_name;
    ctx.wizard.state.data.text = ctx.message.text;

    await ctx.replyWithHTML('Введите сообщение');
    return ctx.wizard.next();
  } catch (e) {
    console.log(e);
  }
});

const newMessage = new Composer();
newMessage.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data.messageText = ctx.message.text;
    const wizardData = ctx.wizard.state.data;

    const clients = await local.get('/clients').then(function (res) {
      return res.data;
    });

    let number = [];

    console.log(clients);
    for (i in clients) {
      try {
        await botMessage.sendMessage(clients[i].id, wizardData.messageText);
        number.push(clients[i].id);
      } catch (e) {
        console.log(
          `${clients[i].id}, ${clients[i].firstName} Пользователь завершил общение с ботом`
        );
      }
    }

    await ctx.reply(
      `Сообщение отправиленно ${number.length} пользователям`,
      Markup.removeKeyboard()
    );
    return ctx.scene.leave();
  } catch (e) {
    console.error(e);
  }
});

const messageAllScene = new Scenes.WizardScene(
  'messageAllWizard',
  messageText,
  newMessage
);
module.exports = messageAllScene;
