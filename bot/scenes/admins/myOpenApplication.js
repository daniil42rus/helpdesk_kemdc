const { Markup, Composer, Scenes } = require('telegraf')
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const botMessage = new TelegramBot(process.env.BOT_TOKEN);
const fs = require('fs');
const { Console } = require('console');
// const { connect } = require('../../functions/connectDb');



const myOpenApplication = new Composer()
myOpenApplication.on("text", async (ctx) => {
    try {
        const db = await connect()
        const applications = db.collection("applications");

        ctx.wizard.state.data = {}
        ctx.wizard.state.data.id = ctx.message.message_id
        ctx.wizard.state.data.userId = ctx.message.from.id
        ctx.wizard.state.data.userName = ctx.message.from.username
        ctx.wizard.state.data.firstName = ctx.message.from.first_name
        ctx.wizard.state.data.lastName = ctx.message.from.last_name
        ctx.wizard.state.data.text = ctx.message.text
        ctx.wizard.state.data.idApplication = ctx.message.text

        const wizardData = ctx.wizard.state.data

        let applicationsArr = await applications.find({ 'executor.id': wizardData.userId }).toArray()
        let number = [];
        let findApplications = applicationsArr.filter(results => results.open)

        console.log(findApplications);


        for (i of findApplications) {

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

            number.push(i.id)
            await ctx.reply(`${answer} `);
        }

        await ctx.reply(`Всего ${number.length} шт.`, Markup.removeKeyboard());

        return ctx.scene.leave()
    } catch (e) {
        console.error(e)
    }
})

const myOpenApplicationScene = new Scenes.WizardScene('myOpenApplicationWizard', myOpenApplication)
module.exports = myOpenApplicationScene
