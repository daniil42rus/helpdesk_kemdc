const { Markup, Composer, Scenes } = require('telegraf');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const botMessage = new TelegramBot(process.env.BOT_TOKEN);
const fs = require('fs');
const { Console } = require('console');
const local = require('../../utils/axios');
// const { connect } = require('../../functions/connectDb');

const idApplication = new Composer();
idApplication.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data = {};
    ctx.wizard.state.data.id = ctx.message.message_id;
    ctx.wizard.state.data.userId = ctx.message.from.id;

    ctx.wizard.state.data.userName = ctx.message.from.username;
    ctx.wizard.state.data.firstName = ctx.message.from.first_name;
    ctx.wizard.state.data.lastName = ctx.message.from.last_name;
    ctx.wizard.state.data.text = ctx.message.text;

    await ctx.replyWithHTML('Введите ID', Markup.removeKeyboard());
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

const whomSendIdApplication = new Composer();
whomSendIdApplication.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data.idApplication = ctx.message.text;

  

    ctx.wizard.state.data.executorGet = ctx.message.from.id;

    const application = await local.get('/applications').then(function (res) {
      return res.data.filter((app) => app.id == ctx.message.text);
    });

    if (!application.length) {
      await ctx.reply('Заявка с таким ID  не найдена', Markup.removeKeyboard());
      return ctx.scene.leave();
    }
    if (!application[0].open) {
      await ctx.reply(
        'Эта заявка уже закрыта, нельзя передавать закрытую заявку',
        Markup.removeKeyboard()
      );
      return ctx.scene.leave();
    }

    if (
      application[0].administrator &&
      application[0].administrator.id != ctx.message.from.id
    ) {
      await ctx.reply(
        'Эта заявка вам не пренадлежит, нельзя передавать чужую заявку',
        Markup.removeKeyboard()
      );
      return ctx.scene.leave();
    }

    await ctx.replyWithHTML(
      'Кому хотите передать зяаявку',
      Markup.keyboard([
        ['Сапрыкин Станислав Евгеньевич', 'Кулешов Даниил Олегович'],
        ['Газдик Дмитрий Евгеньевич', 'Смаль Артем Вячеславович'],
        ['Никитин Максим Александрович', 'Анисимов Сергей Андреевич'],
        ['Лучников Александр Александрович'],
      ])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

const SendIdApplication = new Composer();
SendIdApplication.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data.whomSendIdApplication = ctx.message.text;
    const wizardData = ctx.wizard.state.data;

    const administrator = await local
      .get('/administrators')
      .then(function (res) {
        return res.data.filter(
          (admin) => admin.name == wizardData.whomSendIdApplication
        );
      });

    const application = await local.get('/applications').then(function (res) {
      return res.data.filter((app) => app.id == wizardData.idApplication);
    });

    await local.post('/applications/take', {
      _id: application[0]._id,
      administrator: administrator[0],
    });

    await botMessage.sendMessage(
      administrator[0].id,
      `${wizardData.executorGet} передал вам заявку с ID ${wizardData.idApplication}`
    );
    await botMessage.sendMessage(
      application[0].client.id,
      `Ваша заявка с ID ${wizardData.idApplication} передана\nНовый исполнитель ${administrator[0].name}.\nСвязь с новым исполнителем t.me/${administrator[0].nickName}`
    );
    await ctx.replyWithHTML('Заявка передана', Markup.removeKeyboard());

    return ctx.scene.leave();
  } catch (e) {
    console.error(e);
  }
});

const sendApplicationScene = new Scenes.WizardScene(
  'sendApplicationWizard',
  idApplication,
  whomSendIdApplication,
  SendIdApplication
);
module.exports = sendApplicationScene;
