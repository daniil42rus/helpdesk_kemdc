const { Markup, Composer, Scenes } = require('telegraf');
require('dotenv').config();
const axios = require('axios').default;

const customerOpenApplication = new Composer();
customerOpenApplication.on('text', async (ctx) => {
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

    const applications = await axios
      .get('http://localhost:3002/api/applications')
      .then(function (res) {
        const userapp = res.data.filter(
          (app) => app.client.id == wizardData.userId
        );
        const userOpenApp = userapp.filter((app) => app.open);

        return userOpenApp;
      });

    for (i of applications) {
      let answer = `
                    ${i.application.department} 
              Номер кабинета: ${i.application.room}       
              Срочность:  ${i.application.urgency}       
              Отправитель:  ${i.client.name}      
              В чем проблема:   ${i.application.problems}      
              Описание:   ${i.application.details} 
              id заявки:  ${i.id}      
              Исполнитель: ${
                !i.administrator
                  ? 'не назначен'
                  : i.administrator.name + ' - t.me/' + i.administrator.nickName
              }
              `;

      await ctx.reply(answer, {
        disable_web_page_preview: true,
      });
    }

    await ctx.reply(
      `Всего ${applications.length} шт.`,
      Markup.removeKeyboard()
    );

    return ctx.scene.leave();
  } catch (e) {
    console.error(e);
  }
});

const customerOpenApplicationScene = new Scenes.WizardScene(
  'customerOpenApplicationWizard',
  customerOpenApplication
);
module.exports = customerOpenApplicationScene;
