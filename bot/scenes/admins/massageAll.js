const { Markup, Composer, Scenes } = require('telegraf')
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const botMessage = new TelegramBot(process.env.BOT_TOKEN);
const fs = require('fs');
const { Console } = require('console');
// const { connect } = require('../../functions/connectDb');



const messageText = new Composer()
messageText.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data = {}
        ctx.wizard.state.data.id = ctx.message.message_id
        ctx.wizard.state.data.userId = ctx.message.from.id

        ctx.wizard.state.data.userName = ctx.message.from.username
        ctx.wizard.state.data.firstName = ctx.message.from.first_name
        ctx.wizard.state.data.lastName = ctx.message.from.last_name
        ctx.wizard.state.data.text = ctx.message.text


        await ctx.replyWithHTML("Введите сообщение")
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const newMessage = new Composer()
newMessage.on("text", async (ctx) => {
    try {

        ctx.wizard.state.data.messageText = ctx.message.text
        const wizardData = ctx.wizard.state.data

        const db = await connect()
        const customer = db.collection("customer");
        const customerArr = await customer.find().toArray()
        console.log(customerArr);
        // let customerFile = fs.readFileSync('./db/customer.json', 'utf-8')
        // let customerFileParse = JSON.parse(customerFile)

        let number = [];
        for (i in customerArr) {
            try {
                await botMessage.sendMessage(customerArr[i].id, wizardData.messageText);
                number.push(customerArr[i].id)
            } catch (e) {
                console.log(`${customerArr[i].id}, ${customerArr[i].firstName} Пользователь завершил общение с ботом`);
            }
        }

        await ctx.reply(`Сообщение отправиленно ${number.length} пользователям`, Markup.removeKeyboard())
        return ctx.scene.leave()
    } catch (e) {
        console.error(e)
    }

})

const messageAllScene = new Scenes.WizardScene('messageAllWizard', messageText, newMessage)
module.exports = messageAllScene
