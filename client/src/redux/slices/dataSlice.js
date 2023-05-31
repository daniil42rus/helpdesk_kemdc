import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { local } from '../../utils/axios';
import axios from 'axios';

const BOT_TOKEN = process.env.REACT_APP_BOT_TOKEN;

const initialState = {
  applications: [],
  administrators: [],
  clients: [],
};

export const addApplications = createAsyncThunk(
  '/applications',
  async ({ application }) => {
    try {
      const { data } = await local.post('/applications', {
        application,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const closedApp = createAsyncThunk(
  '/applications/closed',
  async ({ appObj, administrator }) => {
    try {
      const { data } = await local.post('/applications/closed', {
        _id: appObj._id,
        administrator,
      });
      const colesMessage = `Вашу заявку с ID ${appObj.id} закрыл ${administrator.name} `;

      data.code === 200 &&
        appObj.client &&
        (await axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${appObj.client.id}&text=${colesMessage}`
        ));

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const takeApp = createAsyncThunk(
  '/applications/take',
  async ({ appObj, administrator }) => {
    try {
      const { data } = await local.post('/applications/take', {
        _id: appObj._id,
        administrator,
      });
      const takeMessage = `Вашу заявку с ID ${appObj.id} взял в рабоу ${administrator.name} `;

      data.code === 200 &&
        appObj.client &&
        (await axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${appObj.client.id}&text=${takeMessage}`
        ));

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    setAdministrators: (state, action) => {
      state.administrators = action.payload;
    },
    setClients: (state, action) => {
      state.clients = action.payload;
    },
  },

  extraReducers: {
    // Register user
    [addApplications.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
      state.index = null;
    },
    [addApplications.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.index = action.payload.index;
    },
    [addApplications.rejectWithValue]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.index = action.payload.index;
    },

    // Закрыть заявку
    [closedApp.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [closedApp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    [closedApp.rejectWithValue]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },

    // Взять себе заявку
    [takeApp.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [takeApp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    [takeApp.rejectWithValue]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setApplications, setAdministrators, setClients } =
  dataSlice.actions;

export default dataSlice.reducer;
