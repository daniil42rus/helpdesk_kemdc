const { Markup, Composer, Scenes } = require('telegraf');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const botMessage = new TelegramBot(process.env.BOT_TOKEN);
const fs = require('fs');
const { Console } = require('console');
const local = require('../../utils/axios');

const myClosedMonthApplication = new Composer();
myClosedMonthApplication.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data = {};
    ctx.wizard.state.data.id = ctx.message.message_id;
    ctx.wizard.state.data.userId = ctx.message.from.id;
    ctx.wizard.state.data.userName = ctx.message.from.username;
    ctx.wizard.state.data.firstName = ctx.message.from.first_name;
    ctx.wizard.state.data.lastName = ctx.message.from.last_name;
    ctx.wizard.state.data.text = ctx.message.text;
    ctx.wizard.state.data.idApplication = ctx.message.text;

    const wizardData = ctx.wizard.state.data;

    const application = await local.get('/applications').then(function (res) {
      return res.data.filter(
        (app) =>
          !app.open &&
          app.administrator &&
          app.administrator.id == wizardData.userId
      );
    });

    console.log(application);

    let currentDate = new Date();
    let mm = currentDate.getMonth() + 1;

    let number = [];

    for (i of application) {
      let closingDate = new Date(i.application.closing);

      let answer = `
      ЗАКРЫТА
      Дата закрытия $${closingDate.toLocaleString()}
      ${i.application.department} 
          Номер кабинета: ${i.application.room}       
          Срочность:  ${i.application.urgency}       
          Отправитель:  ${i.client.name}      
          В чем проблема:   ${i.application.problems}      
          Описание:   ${i.application.details} 
          id заявки:  ${i.id}       
            `;

      if (closingDate.getMonth() + 1 == mm) {
        number.push(i.id);
        await ctx.reply(`${answer} `);
      }
    }

    await ctx.reply(
      `Вами закрыто ${number.length} шт.`,
      Markup.removeKeyboard()
    );

    return ctx.scene.leave();
  } catch (e) {
    console.error(e);
  }
});

const myClosedMonthApplicationScene = new Scenes.WizardScene(
  'myClosedMonthApplicationWizard',
  myClosedMonthApplication
);
module.exports = myClosedMonthApplicationScene;
