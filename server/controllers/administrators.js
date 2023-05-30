import Administrators from '../models/Administrators.js';

export const administrators = async (req, res) => {
  try {
    const { login, id, name, nickname } = req.body;

    const newAdministrators = new Administrators({
      login,
      id,
      name,
      nickname,
    });

    await newAdministrators.save();

    res.json({
      newAdministrators,
      message: `Пользователь ${newAdministrators.login} добавлен `,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Ошибка при создании пользователя.' });
  }
};

// Get All applications

export const getAllAdministrators = async (req, res) => {
  try {
    const allAdministrators = await Administrators.find();

    if (!allAdministrators) {
      return res.json({
        message: 'Пользователей нет.' + allAdministrators,
      });
    }

    res.json(allAdministrators);
  } catch (error) {
    res.json({ message: 'Что-то пошло не так' });
  }
};
