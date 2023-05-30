const { Markup, Composer, Scenes } = require('telegraf');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const botMessage = new TelegramBot(process.env.BOT_TOKEN);
const local = require('../../utils/axios');

const department = new Composer();
department.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data = {};
    ctx.wizard.state.data.id = ctx.message.message_id;
    ctx.wizard.state.data.userId = ctx.message.from.id;
    ctx.wizard.state.data.userName = ctx.message.from.username;
    ctx.wizard.state.data.firstName = ctx.message.from.first_name;
    ctx.wizard.state.data.lastName = ctx.message.from.last_name;
    ctx.wizard.state.data.text = ctx.message.text;

    await ctx.replyWithHTML(
      'Выберите подразделение из меню',
      Markup.keyboard([
        ['Диагностический центр', 'Дарвина'],
        ['1 поликлиника', '2 поликлиника'],
        ['3 поликлиника', '4 поликлиника'],
        ['10 поликлиника', 'Женская консультация'],
        ['ТП', 'ЦМР'],
        ['Отмена заявки'],
      ])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

const problems = new Composer();
problems.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data.title = ctx.message.text;

    switch (ctx.message.text) {
      case 'Диагностический центр':
      case 'Дарвина':
      case '1 поликлиника':
      case '2 поликлиника':
      case '3 поликлиника':
      case '4 поликлиника':
      case '10 поликлиника':
      case 'Женская консультация':
      case 'ТП':
      case 'ЦМР':
        break;
      case 'Отмена заявки':
        await ctx.reply('Вы отменили заявку', Markup.removeKeyboard());
        return ctx.scene.leave();
      default:
        await ctx.replyWithHTML('Нет такого подразделения');
        return;
    }

    await ctx.replyWithHTML(
      'В чем проблема? Опишите или выберите из меню',
      Markup.keyboard([
        ['Арена', 'Принтер'],
        ['1С', 'Компьютер'],
        ['ФСС', 'Регистры'],
        ['Оборудование', 'ЭЦП'],
        ['Отмена заявки'],
      ])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

const problemsDetails = new Composer();
let problemsDetailsText = 'Немного подробнее? Опишите или выберите из меню';
problemsDetails.hears('Арена', async (ctx) => {
  try {
    ctx.wizard.state.data.problems = ctx.message.text;
    await ctx.replyWithHTML(
      problemsDetailsText,
      Markup.keyboard([
        ['Не запускается', '  Не работает '],
        ['Зависла', 'Нет шаблона'],
        ['Создать шаблон', 'Ошибка на экране'],
        ['Не печатает', 'ЭЦП не подписывает'],
        ['Отмена заявки'],
      ])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

problemsDetails.hears('Принтер', async (ctx) => {
  try {
    ctx.wizard.state.data.problems = ctx.message.text;
    await ctx.replyWithHTML(
      problemsDetailsText,
      Markup.keyboard([
        ['Замена катриджа', 'Не печатает'],
        ['Замятие бумаги', 'Высыпался тонер'],
        ['Отмена заявки'],
      ])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

problemsDetails.hears('1С', async (ctx) => {
  try {
    ctx.wizard.state.data.problems = ctx.message.text;
    await ctx.replyWithHTML(
      problemsDetailsText,
      Markup.keyboard([
        ['Не запускается ', 'Не работает '],
        ['Завис', 'Не печатает'],
        ['Отмена заявки'],
      ])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

problemsDetails.hears('Компьютер', async (ctx) => {
  try {
    ctx.wizard.state.data.problems = ctx.message.text;
    await ctx.replyWithHTML(
      problemsDetailsText,
      Markup.keyboard([
        ['Не включается  ', 'Синий экран '],
        ['Завис', 'Нет интернета'],
        ['Не работает монитор', 'Не работает клавиатура/мышь'],
        ['Не работает программа', 'Установить новое ПО'],
        ['Отмена заявки'],
      ])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

problemsDetails.hears('ФСС', async (ctx) => {
  try {
    ctx.wizard.state.data.problems = ctx.message.text;
    await ctx.replyWithHTML(
      problemsDetailsText,
      Markup.keyboard([
        ['Не отправляет  ', 'Не принимает  '],
        ['ЭЦП не подписывает'],
        ['Отмена заявки'],
      ])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

problemsDetails.hears('Регистры', async (ctx) => {
  try {
    ctx.wizard.state.data.problems = ctx.message.text;
    await ctx.replyWithHTML(
      problemsDetailsText,
      Markup.keyboard([
        ['Не открываются  ', 'Не корректный логин/пароль  '],
        ['Отмена заявки'],
      ])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

problemsDetails.hears('Оборудование', async (ctx) => {
  try {
    ctx.wizard.state.data.problems = ctx.message.text;
    await ctx.replyWithHTML(
      problemsDetailsText,
      Markup.keyboard([
        ['Не считываются мониторы', '  Не загружается аппаратура'],
        ['Аппарат не видит принтер'],
        ['Отмена заявки'],
      ])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

problemsDetails.hears('Отмена заявки', async (ctx) => {
  try {
    await ctx.reply('Вы отменили заявку', Markup.removeKeyboard());
    return ctx.scene.leave();
  } catch (e) {
    console.error(e);
  }
});

problemsDetails.hears('ЭЦП', async (ctx) => {
  try {
    ctx.wizard.state.data.problems = ctx.message.text;
    await ctx.replyWithHTML(
      problemsDetailsText,
      Markup.keyboard([
        ['Выпустить ЭЦП', '  Установить ЭЦП'],
        ['Аннулировать ЭЦП', 'ЭЦП не подписывает'],
        ['Отмена заявки'],
      ])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

problemsDetails.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data.problems = ctx.message.text;
    await ctx.replyWithHTML(
      'Немного подробнее?',
      Markup.keyboard([['Отмена заявки']])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

const urgency = new Composer();
urgency.hears('Отмена заявки', async (ctx) => {
  try {
    await ctx.reply('Вы отменили заявку', Markup.removeKeyboard());
    return ctx.scene.leave();
  } catch (e) {
    console.error(e);
  }
});

urgency.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data.problemsDetails = ctx.message.text;
    await ctx.replyWithHTML(
      'Укажите срочночть заявки',
      Markup.keyboard([
        ['Срочно (1-2 часа)', 'В течении дня'],
        ['В течении 2х-3х дней', 'В течении недели'],
        ['Отмена заявки'],
      ])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

const roomNumber = new Composer();
roomNumber.on('text', async (ctx) => {
  try {
    switch (ctx.message.text) {
      case 'Срочно (1-2 часа)':
        break;
      case 'В течении дня':
        break;
      case 'В течении 2х-3х дней':
        break;
      case 'В течении недели':
        break;
      case 'Отмена заявки':
        await ctx.reply('Вы отменили заявку', Markup.removeKeyboard());
        return ctx.scene.leave();
      default:
        await ctx.replyWithHTML('Нет такого периода срочности');
        return;
    }

    ctx.wizard.state.data.urgency = ctx.message.text;

    if (ctx.wizard.state.data.problems == 'ЭЦП') {
      await ctx.replyWithHTML(
        'ФИО и должность врача? ',
        Markup.keyboard([['Отмена заявки']])
          .oneTime()
          .resize()
      );
    } else {
      await ctx.replyWithHTML(
        'Какой у вас кабинет? ',
        Markup.keyboard([['Отмена заявки']])
          .oneTime()
          .resize()
      );
    }
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

const conditionStep = new Composer();
conditionStep.hears('Отмена заявки', async (ctx) => {
  try {
    await ctx.reply('Вы отменили заявку', Markup.removeKeyboard());
    return ctx.scene.leave();
  } catch (e) {
    console.error(e);
  }
});

conditionStep.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data.roomNumber = ctx.message.text;
    const wizardData = ctx.wizard.state.data;

    const clientInfo = `t.me/${wizardData.userName}
    tg://user?id=${wizardData.userId}`;

    const answerJSON = {
      application: {
        department: wizardData.title,
        room: wizardData.roomNumber,
        problems: wizardData.problems,
        details: wizardData.problemsDetails,
        urgency: wizardData.urgency,
      },
      client: {
        name: wizardData.firstName,
        id: wizardData.userId,
        nickname: wizardData.userName,
      },
    };

    let clientJson = {
      name: wizardData.firstName,
      id: wizardData.userId,
      nickname: wizardData.userName,
    };

    // await botMessage.sendMessage(
    //   process.env.applicationChat,
    //   answer + clientInfo,
    //   {
    //     disable_web_page_preview: true,
    //   }
    // );

    //положить заявку в БД

    await local
      .post('/applications/', answerJSON)
      .then(function (response) {
        if (response.data.code === 200) {
          // console.log(response.data.newApplications.id);

          const answer = `${wizardData.title} 
    Номер кабинета: ${wizardData.roomNumber}
    Срочность: ${wizardData.urgency}
    Отправитель: ${wizardData.firstName}
    В чем проблема: ${wizardData.problems}
    Описание: ${wizardData.problemsDetails}
     id заявки: ${response.data.newApplications.id}\n
    `;

          ctx.reply(answer, Markup.removeKeyboard(), {
            disable_web_page_preview: true,
          });

          botMessage.sendMessage(
            process.env.applicationChat,
            answer + clientInfo,
            {
              disable_web_page_preview: true,
            }
          );
        } else {
          ctx.reply(response.data.message, Markup.removeKeyboard(), {
            disable_web_page_preview: true,
          });
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    const getClient = await local.get('/clients/').then(function (res) {
      return res.data.find((client) => client.id == wizardData.userId);
    });

    if (getClient == undefined) {
      await local
        .post('/clients/', clientJson)
        .then(function (response) {
          // console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log('Полдьзователь добавлен в БД');
    } else {
      console.log('Полдьзователь имеется в БД');
    }

    return ctx.scene.leave();
  } catch (e) {
    console.error(e);
  }
});

const applicationScene = new Scenes.WizardScene(
  'applicationWizard',
  department,
  problems,
  problemsDetails,
  urgency,
  roomNumber,
  conditionStep
);
module.exports = applicationScene;
