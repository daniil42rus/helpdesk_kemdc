import Applications from '../models/Applications.js';

export const applications = async (req, res) => {
  try {
    const { id, open, application, client } = req.body;

    const newApplications = new Applications({
      id,
      open,
      application,
      client,
    });

    await newApplications.save();

    res.json({
      newApplications,
      message: `Заявка ${newApplications.id} добавлен на ${newApplications.open}`,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Ошибка при создании заявки.' });
  }
};

// Get All applications

export const getAllApplications = async (req, res) => {
  try {
    const allApplications = await Applications.find();

    if (!allApplications) {
      return res.json({
        message: 'Пользователей нет.' + allApplications,
      });
    }

    res.json(allApplications );
    
  } catch (error) {
    res.json({ message: 'Что-то пошло не так' });
  }
};
