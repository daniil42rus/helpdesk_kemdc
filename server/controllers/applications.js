import Applications from '../models/Applications.js';
import { local } from '../utils/axios.js';

export const applications = async (req, res) => {
  try {
    const { application, client } = req.body;

    const app = await local.get('/applications/').then(function (res) {
      return res.data[res.data.length - 1].id;
    });

    const newApplications = new Applications({
      id: app + 1,
      application,
      client,
    });

    await newApplications.save();

    res.json({
      newApplications,
      message: `Заявка №${newApplications.id} создана`,
      code: 200,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Ошибка при создании заявки.', code: 404 });
  }
};

// Get All applications

export const getAllApplications = async (req, res) => {
  try {
    const allApplications = await Applications.find();

    if (!allApplications) {
      return res.json({
        message: 'Заявок нет.' + allApplications,
      });
    }

    res.json(allApplications);
  } catch (error) {
    res.json({ message: 'Что-то пошло не так' });
  }
};

// Update app
export const closedApplication = async (req, res) => {
  try {
    const { _id, administrator } = req.body;

    console.log(_id);
    console.log(administrator);
    const app = await Applications.findById({ _id });

    if (!app)
      return res.json({
        message: 'Такого пользователя не существует',
      });

    app.open = false;
    app.application.closing = Date.now();

    app.administrator.id = administrator.id;
    app.administrator.name = administrator.name;
    app.administrator.nickname = administrator.nickname;
    await app.save();

    res.json({
      app,
      message: `Заявка №${app.id} закрыта`,
    });
  } catch (error) {
    res.json({ message: 'Что то пошло не так.' + error });
  }
};
