const { Markup, Composer, Scenes } = require('telegraf')
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const botMessage = new TelegramBot(process.env.BOT_TOKEN);
const fs = require('fs');
const { Console } = require('console');
// const { connect } = require('../../functions/connectDb');

const idApplication = new Composer()
idApplication.on("text", async (ctx) => {

    ctx.wizard.state.data = {}
    ctx.wizard.state.data.id = ctx.message.message_id
    ctx.wizard.state.data.userId = ctx.message.from.id

    ctx.wizard.state.data.userName = ctx.message.from.username
    ctx.wizard.state.data.firstName = ctx.message.from.first_name
    ctx.wizard.state.data.lastName = ctx.message.from.last_name
    ctx.wizard.state.data.text = ctx.message.text

    try {
        await ctx.replyWithHTML("Введите ID")
        return ctx.wizard.next()
    } catch (e) {
        console.error(e)
    }
})

const addIdApplication = new Composer()
addIdApplication.on("text", async (ctx) => {

    try {

        const db = await connect();
        const applications = db.collection("applications");
        const executors = db.collection("executors");

        ctx.wizard.state.data.idApplication = ctx.message.text
        const wizardData = ctx.wizard.state.data

        let findApplicationID = await applications.findOne({ id: parseInt(wizardData.idApplication) })


        let executorID = await executors.findOne({ 'id': wizardData.userId })

        if (findApplicationID == null) {
            await ctx.reply("Заявка не найдена");
            return ctx.scene.leave()
        }

        if (findApplicationID.executor.id == wizardData.userId) {
            await ctx.reply("Это уже ваша заявка");
            return ctx.scene.leave()
        }

        if (findApplicationID.executor.name) {
            ctx.replyWithHTML(`Заявку уже принял ${findApplicationID.executor.name}`);
            return ctx.scene.leave()
        }

        if (findApplicationID && !findApplicationID.executor.name) {
            applications.updateOne(
                { id: parseInt(wizardData.idApplication) },
                {
                    $set: {
                        executor:{
                            name:executorID.name,
                            id:wizardData.userId,
                            nickName:wizardData.userName,
                        }
                    }
                }
            )

            await ctx.reply(`Вам добавленна заявка ID ${findApplicationID.id} от ${findApplicationID.customer.firstName} `, Markup.removeKeyboard());
          
            await botMessage.sendMessage(findApplicationID.customer.id, `Вашу заявку принял ${executorID.name} \n Связь с исполнителем \n t.me/${executorID.nickName}`,
                { disable_web_page_preview: true });
            return ctx.scene.leave()
        }
    } catch (e) {
        console.error(e)
    }

})

const takeApplicationScene = new Scenes.WizardScene('takeApplicationWizard', idApplication, addIdApplication)
module.exports = takeApplicationScene
