import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { local } from '../../../utils/axios';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
  allUsers: [],
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password, surname, access }) => {
    try {
      const { data } = await local.post('/auth/register', {
        username,
        password,
        surname,
        access,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login/',
  async ({ login, password }) => {
    try {
      const { data } = await local.post('/auth/login/', {
        login,
        password,
      });
      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMe = createAsyncThunk('/auth/me', async () => {
  try {
    const { data } = await local.get('/auth/me');
    return data;
  } catch (error) {
    console.log(error);
  }
});

// export const removeUser = createAsyncThunk(
// 	'auth/register/removeUser',
// 	async ({ _id }) => {
// 		try {
// 			const { data } = await local.post(`/auth/register/removeUser`, { _id });
// 			return data;
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}
// );


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: {
    // Register user
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    [registerUser.rejectWithValue]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    // Login user
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    // Проверка авторизации
    [getMe.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false;
    //   state.status = action.payload.message;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    [getMe.rejectWithValue]: (state, action) => {
    //   state.status = action.payload.message;
      state.isLoading = false;
    },

    // // Удалить пользователя
    // [removeUser.pending]: (state) => {
    // 	state.isLoading = true;
    // },
    // [removeUser.fulfilled]: (state, action) => {
    // 	state.isLoading = false;
    // 	state.status = action.payload.message;
    // 	state.allUsers = state.allUsers.filter(
    // 		(user) => user._id !== action.meta.arg._id
    // 	);
    // },
    // [removeUser.rejectWithValue]: (state, action) => {
    // 	state.isLoading = false;
    // 	state.status = action.payload.message;
    // },

    // // Обновить пользователя
    // [updateUser.pending]: (state) => {
    // 	state.isLoading = true;
    // 	state.status = null;
    // },
    // [updateUser.fulfilled]: (state, action) => {
    // 	state.isLoading = false;
    // 	state.status = action.payload.message;
    // },
    // [updateUser.rejectWithValue]: (state, action) => {
    // 	state.isLoading = false;
    // 	state.status = action.payload.message;
    // },
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const thisUser = (state) => state.auth.user;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
