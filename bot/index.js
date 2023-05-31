const { Telegraf, Markup, Scenes, session } = require('telegraf');

const local = require('./utils/axios');

require('dotenv').config();
const bot = new Telegraf(process.env.BOT_TOKEN);

//admins
const takeApplicationScene = require('./scenes/admins/takeApplication');
const closedApplicationScene = require('./scenes/admins/closedApplication');
const myOpenApplicationScene = require('./scenes/admins/myOpenApplication');
const myClosedMonthApplicationScene = require('./scenes/admins/myClosedMonthApplication');
const allOpenApplicationScene = require('./scenes/admins/allOpenApplication');
const sendApplicationScene = require('./scenes/admins/sendApplication');
const messageAllScene = require('./scenes/admins/massageAll');

//users
const applicationScene = require('./scenes/users/application');
const customerOpenApplicationScene = require('./scenes/users/customerOpenApplication');

const stage = new Scenes.Stage([
  takeApplicationScene,
  closedApplicationScene,
  myOpenApplicationScene,
  myClosedMonthApplicationScene,
  allOpenApplicationScene,
  sendApplicationScene,
  messageAllScene,
  applicationScene,
  customerOpenApplicationScene,
]);

bot.use(session());
bot.use(stage.middleware());

let date = new Date();

const getAdministrator = async (ctx) => {
  return await local.get('/administrators/').then(function (res) {
    return res.data.find((admin) => admin.id == ctx.from.id);
  });
};

bot.command('admin', async (ctx) => {
  console.log(ctx.message.text, ctx.chat, date.toLocaleString());

  if (ctx.chat.type == 'private') {
    const administrator = await getAdministrator(ctx);
    if (administrator == undefined) {
      ctx.reply(
        'Что бы отправить завяку в ИТ отдел, нажмите /new_application',
        Markup.removeKeyboard()
      );
    } else {
      ctx.replyWithHTML(
        'Выберите из меню нужное действие',
        Markup.keyboard([
          ['Взять заявку по ID', 'Закрыть заявку по ID'],
          ['Мои открытые заявки', 'Мои закрытые заявки за этот месяц'],
          ['Открытые заявки', 'Изменить исполнителя'],
          ['Отправить сообщение'],
        ])
          .oneTime()
          .resize()
      );
    }
  }
});

bot.hears('Взять заявку по ID', async (ctx) => {
  console.log(ctx.message.text, ctx.chat, date.toLocaleString());
  const administrator = await getAdministrator(ctx);
  if (ctx.chat.type == 'private' || administrator == undefined) {
    ctx.scene.enter('takeApplicationWizard');
  }
});

bot.hears('Закрыть заявку по ID', async (ctx) => {
  console.log(ctx.message.text, ctx.chat, date.toLocaleString());
  const administrator = await getAdministrator(ctx);
  if (ctx.chat.type == 'private' || administrator == undefined) {
    ctx.scene.enter('closedApplicationWizard');
  }
});

bot.hears('Мои открытые заявки', async (ctx) => {
  console.log(ctx.message.text, ctx.chat, date.toLocaleString());
  const administrator = await getAdministrator(ctx);
  if (ctx.chat.type == 'private' || administrator == undefined) {
    ctx.scene.enter('myOpenApplicationWizard');
  }
});

bot.hears('Мои закрытые заявки за этот месяц', async (ctx) => {
  console.log(ctx.message.text, ctx.chat, date.toLocaleString());
  const administrator = await getAdministrator(ctx);
  if (ctx.chat.type == 'private' || administrator == undefined) {
    ctx.scene.enter('myClosedMonthApplicationWizard');
  }
});

bot.hears('Открытые заявки', async (ctx) => {
  console.log(ctx.message.text, ctx.chat, date.toLocaleString());
  const administrator = await getAdministrator(ctx);
  if (ctx.chat.type == 'private' || administrator == undefined) {
    ctx.scene.enter('allOpenApplicationWizard');
  }
});

bot.hears('Изменить исполнителя', async (ctx) => {
  console.log(ctx.message.text, ctx.chat, date.toLocaleString());
  const administrator = await getAdministrator(ctx);
  if (ctx.chat.type == 'private' || administrator == undefined) {
    ctx.scene.enter('sendApplicationWizard');
  }
});

bot.hears('Отправить сообщение', async (ctx) => {
  console.log(ctx.message.text, ctx.chat, date.toLocaleString());
  const administrator = await getAdministrator(ctx);
  if (ctx.chat.type == 'private' || administrator == undefined) {
    ctx.scene.enter('messageAllWizard');
  }
});

bot.command('new_application', (ctx) => {
  console.log(ctx.message.text, ctx.chat, date.toLocaleString());
  if (ctx.chat.type == 'private') {
    ctx.scene.enter('applicationWizard');
  }
});

bot.command('open_application', (ctx) => {
  console.log(ctx.message.text, ctx.chat, date.toLocaleString());
  if (ctx.chat.type == 'private') {
    ctx.scene.enter('customerOpenApplicationWizard');
  }
});

// bot.on('photo', async (ctx) => {

//     let file_id = ctx.message.photo[ctx.message.photo.length - 1]?.file_id;
//     console.log(file_id);
//     const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=${file_id}`
//     const responselink = await fetch(url);
//     const body = await responselink.json()

//     const fileLink = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${body.result.file_path}`

//     // const file_path = body.result.file_path;
//     // const urljpg = await fetch(`https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file_path}`);

//     // const responseimg = await fetch(`https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${body.result.file_path}`);

//     // console.log(responseimg);

//     const streamPipeline = promisify(pipeline);

//     const response = await fetch(fileLink);

//     if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

//     await streamPipeline(response.body, createWriteStream(`./uploads/${body.result.file_path}`));

//     console.log('Сообщение', ctx.message, body.result.file_path, ctx.chat, date.toLocaleString())
//     if (ctx.chat.type == 'private') {
//         ctx.reply(fileLink, Markup.removeKeyboard())
//     }
// })

bot.on('message', (ctx) => {
  console.log('Сообщение', ctx.message.text, ctx.chat, date.toLocaleString());
  if (ctx.chat.type == 'private') {
    ctx.reply(
      'Что бы отправить завяку в ИТ отдел, нажмите /new_application',
      Markup.removeKeyboard()
    );
  }
});

bot.launch();
