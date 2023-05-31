const { Markup, Composer, Scenes } = require('telegraf');
const TelegramBot = require('node-telegram-bot-api');
const local = require('../../utils/axios');
require('dotenv').config();
const botMessage = new TelegramBot(process.env.BOT_TOKEN);

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
    await ctx.replyWithHTML('Введите ID', Markup.removeKeyboard());
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

const closedIdApplication = new Composer();
closedIdApplication.on('text', async (ctx) => {
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
      await ctx.reply('Заявка не найдена', Markup.removeKeyboard());
      return ctx.scene.leave();
    }

    if (!application[0].administrator) {
      await ctx.reply(
        `Заявка с ID ${wizardData.idApplication} никто не взял.\nЧто бы закрыть заявку, ее нужно себе добавить`,
        Markup.removeKeyboard()
      );
      return ctx.scene.leave();
    }

    if (!application[0].open) {
      await ctx.reply(
        `Заявку с ID ${wizardData.idApplication} уже закрыл ${application[0].administrator.name}.`,
        Markup.removeKeyboard()
      );
      const closing = new Date(application[0].application.closing);
      await ctx.reply(
        `Заявка закрыта ${closing.toLocaleString()}`,
        Markup.removeKeyboard()
      );
      return ctx.scene.leave();
    }

    if (
      application[0].administrator &&
      application[0].administrator.id == !wizardData.userId
    ) {
      await ctx.reply(
        `Заявку с ID ${wizardData.idApplication} взял в работу ${application[0].administrator.name}.\nВы не можете закрыть чужую заявку`,
        Markup.removeKeyboard()
      );
      return ctx.scene.leave();
    }

    if (application.length && application[0].administrator) {
      await local.post('/applications/closed', {
        _id: application[0]._id,
        administrator: administrator,
      });

      await ctx.reply(
        `Вы закрыли заявку ID ${application[0].id} от ${application[0].client.name} `
      );
      const closing = new Date();

      await ctx.reply(
        `Заявка закрыта ${closing.toLocaleString()}`,
        Markup.removeKeyboard()
      );

      await botMessage.sendMessage(
        application[0].client.id,
        `Вашу заявку с ID ${application[0].id} закрыл ${
          administrator[0].name
        } \nЗаявка закрыта ${closing.toLocaleString()}`,
        { disable_web_page_preview: true }
      );

      return ctx.scene.leave();
    }
  } catch (e) {
    console.error(e);
  }
});

const closedApplicationScene = new Scenes.WizardScene(
  'closedApplicationWizard',
  idApplication,
  closedIdApplication
);
module.exports = closedApplicationScene;
