import Clients from '../models/Clients.js';


export const clients = async (req, res) => {
  try {
    const { id, name, nickname } = req.body;

    const newClients = new Clients({
      id,
      name,
      nickname,
    });

    await newClients.save();

    res.json({
      newClients,
      message: `Пользователя ${newClients.name} добавлен `,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Ошибка при создании пользователя.' });
  }
};

// Get All Clients

export const getAllClients = async (req, res) => {
  try {
    const allClients = await Clients.find();

    if (!allClients) {
      return res.json({
        message: 'Пользователей нет.' + allClients,
      });
    }

    res.json(allClients);
  } catch (error) {
    res.json({ message: 'Что-то пошло не так' });
  }
};
