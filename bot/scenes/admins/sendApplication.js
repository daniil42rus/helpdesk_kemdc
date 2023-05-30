const { Markup, Composer, Scenes } = require('telegraf')
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const botMessage = new TelegramBot(process.env.BOT_TOKEN);
const fs = require('fs');
const { Console } = require('console');
// const { connect } = require('../../functions/connectDb');


const idApplication = new Composer()
idApplication.on("text", async (ctx) => {

    try {
        const db = await connect()
        const executors = db.collection("executors");

        ctx.wizard.state.data = {}
        ctx.wizard.state.data.id = ctx.message.message_id
        ctx.wizard.state.data.userId = ctx.message.from.id

        ctx.wizard.state.data.userName = ctx.message.from.username
        ctx.wizard.state.data.firstName = ctx.message.from.first_name
        ctx.wizard.state.data.lastName = ctx.message.from.last_name
        ctx.wizard.state.data.text = ctx.message.text

        let executorID = await executors.findOne({ 'id': parseInt(ctx.message.from.id) })
        console.log(executorID.name);
        console.log(ctx.message.from.id);

        ctx.wizard.state.data.executorGet = executorID.name

        await ctx.replyWithHTML("Введите ID", Markup.removeKeyboard())
        return ctx.wizard.next()
    } catch (e) {
        console.error(e)
    }
})


const whomSendIdApplication = new Composer()
whomSendIdApplication.on("text", async (ctx) => {
    try {
        const db = await connect()
        const applications = db.collection("applications");

        ctx.wizard.state.data.idApplication = ctx.message.text

        let findApplicationID = await applications.findOne({ id: parseInt(ctx.message.text) })

        if (findApplicationID == null) {
            await ctx.reply("Заявка с таким ID  не найдена", Markup.removeKeyboard())
            return ctx.scene.leave()

        }
        if (!findApplicationID.open) {
            await ctx.reply("Эта заявка уже закрыта, нельзя передавать закрытую заявку", Markup.removeKeyboard())
            return ctx.scene.leave()
        }

        if (findApplicationID.executor.id != ctx.message.from.id) {
            await ctx.reply("Эта заявка вам не пренадлежит, нельзя передавать чужую заявку", Markup.removeKeyboard())
            return ctx.scene.leave()
        }


        await ctx.replyWithHTML("Кому хотите передать зяаявку", Markup.keyboard([
            ['Сапрыкин Станислав Евгеньевич', 'Кулешов Даниил Олегович'],
            ['Газдик Дмитрий Евгеньевич', 'Смаль Артем Вячеславович'],
            ['Никитин Максим Александрович', 'Анисимов Сергей Андреевич'],
            ['Лучников Александр Александрович'],
        ]).oneTime().resize())
        return ctx.wizard.next()
    } catch (e) {
        console.error(e)
    }
})

const SendIdApplication = new Composer()
SendIdApplication.on("text", async (ctx) => {

    try {

        const db = await connect()
        const applications = db.collection("applications");
        const executors = db.collection("executors");

        ctx.wizard.state.data.whomSendIdApplication = ctx.message.text
        const wizardData = ctx.wizard.state.data

        let executorID = await executors.findOne({ name: wizardData.whomSendIdApplication })
        console.log(executorID);

        applications.updateOne(
            { id: parseInt(wizardData.idApplication) },
            {
                $set: {
                    executor: {
                        name: executorID.name,
                        id: executorID.id,
                        nickName: executorID.nickName,
                    }
                }
            }
        )

        let findApplicationID = await applications.findOne({ id: parseInt(wizardData.idApplication) })

        await botMessage.sendMessage(executorID.id, `${wizardData.executorGet} передал вам заявку с ID ${wizardData.idApplication}`);
        await botMessage.sendMessage(findApplicationID.customer.id, `Ваша заявка с ID ${wizardData.idApplication} передана\nНовый исполнитель ${executorID.name}.\nСвязь с новым исполнителем t.me/${executorID.nickName}`);
        await ctx.replyWithHTML("Заявка передана", Markup.removeKeyboard())

        return ctx.scene.leave()
    } catch (e) {
        console.error(e)
    }

})




const sendApplicationScene = new Scenes.WizardScene('sendApplicationWizard', idApplication, whomSendIdApplication, SendIdApplication)
module.exports = sendApplicationScene
