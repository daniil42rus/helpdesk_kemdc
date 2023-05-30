const { Markup, Composer, Scenes } = require('telegraf')
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const botMessage = new TelegramBot(process.env.BOT_TOKEN);
const fs = require('fs');
const { Console } = require('console');
// const { connect } = require('../../functions/connectDb');




const personApplication = new Composer()
personApplication.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data = {}
        ctx.wizard.state.data.id = ctx.message.message_id
        ctx.wizard.state.data.userId = ctx.message.from.id
        ctx.wizard.state.data.userName = ctx.message.from.username
        ctx.wizard.state.data.firstName = ctx.message.from.first_name
        ctx.wizard.state.data.lastName = ctx.message.from.last_name
        ctx.wizard.state.data.text = ctx.message.text
        ctx.wizard.state.data.idApplication = ctx.message.text


        await ctx.replyWithHTML("Чьи открытые заявки хотите посмотреть", Markup.keyboard([
            ['Сапрыкин Станислав Евгеньевич', 'Кулешов Даниил Олегович'],
            ['Газдик Дмитрий Евгеньевич', 'Смаль Артем Вячеславович'],
            ['Никитин Максим Александрович', 'Лучников Александр Александрович'],
            [''],
        ]).oneTime().resize())
        return ctx.wizard.next()
    } catch (e) {
        console.error(e)
    }
})

const openApplication = new Composer()
openApplication.on("text", async (ctx) => {
    try {

        const db = await connect()
        const applications = db.collection("applications");

        ctx.wizard.state.data.personApplication = ctx.message.text

        const wizardData = ctx.wizard.state.data

        // let readFile = fs.readFileSync('./db/applications.json', 'utf-8')
        // let readFileParse = JSON.parse(readFile)

        let applicationsArr = await applications.find({ 'executor.name': wizardData.personApplication }).toArray()
        let applicationsArrOpen = applicationsArr.filter(obj => obj.open)



        let number = [];


        for (i of applicationsArrOpen) {

            let answer = (
                `
                ${i.application.department} 
          Номер кабинета: ${i.application.roomNumber}       
          Срочность:  ${i.application.urgency}       
          Отправитель:  ${i.customer.firstName}      
          В чем проблема:   ${i.application.problems}      
          Описание:   ${i.application.problemsDetails} 
          id заявки:  ${i.id}       
            `);


            // if (i.open && wizardData.personApplication == i.executor.name) {
                number.push(i.id)
                await ctx.reply(`${answer} `);
            // }
        }

        await ctx.reply(`Всего ${number.length} шт.`, Markup.removeKeyboard());

        return ctx.scene.leave()
    } catch (e) {
        console.error(e)
    }
})

const personOpenApplicationScene = new Scenes.WizardScene('personOpenApplicationWizard', personApplication, openApplication)
module.exports = personOpenApplicationScene
