import Administrators from '../models/Administrators.js';
import jwt from 'jsonwebtoken';
import { local } from '../utils/axios.js';

// Register Administrator
export const register = async (req, res) => {
  try {
    const {
      id,
      name,
      nickname,
      login,
      password,
      birthday,
      organization,
      jobTitle,
      email,
      phone,
    } = req.body;

    if (!id || id.length < 2)
      return res.json({
        message: 'Заполните поле id Telegram',
      });
    if (!name || name.length < 2)
      return res.json({
        message: 'Заполните поле name',
      });
    // if (!nickname || nickname.length < 3)
    //   return res.json({
    //     message: 'Заполните полe nickname',
    //   });
    // if (!password || password.length < 5)
    //   return res.json({
    //     message: 'Заполните поле password',
    //   });

    const isUsed = await Administrators.findOne({ login });

    if (isUsed) {
      return res.json({
        message: 'Данный nickname уже занят.',
      });
    }

    const newAdministrator = new Administrators({
      id,
      name,
      nickname,
      login,
      password,
      birthday,
      organization,
      jobTitle,
      email,
      phone,
    });

    await newAdministrator.save();

    res.json({
      newAdministrator,
      message: `Регистрация польхователя ${newAdministrator.name} прошла успешно`,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Ошибка при создании пользователя.' + error });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await Administrators.findOne({ login });

    if (!user) {
      return res.json({
        message: 'Такого юзера не существует.',
      });
    }

    if (password !== user.password) {
      return res.json({
        message: 'Неверный пароль.',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      user,
      token,
      message: `Вы вошли в систему под пользователем ${user.nickname}`,
    });
  } catch (error) {
    res.json({ message: `Ошибка при авторизации.` });
    console.log(error);
  }
};

// Get Me
export const getMe = async (req, res) => {
  try {
    const user = await Administrators.findById(req.userId);

    if (!user) {
      return res.json({
        message: 'Такого юзера не существует.',
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      user,
      token,
      message: 'Проверка успешна',
    });
  } catch (error) {
    res.json({ message: 'Нет доступа.' });
  }
};

// // Remove user
// export const removeUser = async (req, res) => {
//   try {
//     const { _id } = req.body;

//     const user = await User.findByIdAndDelete({ _id });
//     // const user = await User.find({ _id });

//     if (!user)
//       return res.json({
//         message: 'Такого пользователя не существует',
//       });
//     res.json({
//       message: `Пользователь ${user.surname} был удален`,
//     });
//   } catch (error) {
//     res.json({ message: 'Что то пошло не так.' });
//   }
// };

