const { Markup, Composer, Scenes } = require('telegraf');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const botMessage = new TelegramBot(process.env.BOT_TOKEN);
const fs = require('fs');
const { Console } = require('console');
const local = require('../../utils/axios');

const idApplication = new Composer();
idApplication.on('text', async (ctx) => {
  ctx.wizard.state.data = {};
  ctx.wizard.state.data.id = ctx.message.message_id;
  ctx.wizard.state.data.userId = ctx.message.from.id;

  ctx.wizard.state.data.userName = ctx.message.from.username;
  ctx.wizard.state.data.firstName = ctx.message.from.first_name;
  ctx.wizard.state.data.lastName = ctx.message.from.last_name;
  ctx.wizard.state.data.text = ctx.message.text;

  try {
    await ctx.replyWithHTML('Введите ID');
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

const addIdApplication = new Composer();
addIdApplication.on('text', async (ctx) => {
  try {
   

    ctx.wizard.state.data.idApplication = ctx.message.text;
    const wizardData = ctx.wizard.state.data;

    const application = await local.get('/applications').then(function (res) {
      return res.data.filter((app) => app.id == wizardData.idApplication);
    });

    const administrator = await local
      .get('/administrators')
      .then(function (res) {
        return res.data.filter((admin) => admin.id == wizardData.userId);
      });

    if (!application.length) {
      await ctx.reply('Заявка не найдена');
      return ctx.scene.leave();
    }
    
    if (
      application[0].administrator &&
      application[0].administrator.id == wizardData.userId
    ) {
      await ctx.reply('Это уже ваша заявка');
      return ctx.scene.leave();
    }

    if (application[0].administrator) {
      ctx.replyWithHTML(
        `Заявку уже принял ${application[0].administrator.name}`
      );
      return ctx.scene.leave();
    }

    if (application.length && !application[0].administrator) {
      await local.post('/applications/take', {
        _id: application[0]._id,
        administrator: administrator[0],
      });

      await ctx.reply(
        `Вам добавленна заявка ID ${application[0].id} от ${application[0].client.name} `,
        Markup.removeKeyboard()
      );
      await botMessage.sendMessage(
        application[0].client.id,
        `Вашу заявку принял ${administrator[0].name} \n Связь с исполнителем \n t.me/${administrator[0].nickname}`,
        { disable_web_page_preview: true }
      );
    }
    return ctx.scene.leave();
  } catch (e) {
    console.error(e);
  }
});

const takeApplicationScene = new Scenes.WizardScene(
  'takeApplicationWizard',
  idApplication,
  addIdApplication
);
module.exports = takeApplicationScene;
