import { Action, PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { Record } from "./Record";
import { RootState } from "../../app/store";
import { getJsonCSV } from "../../util/cvsHandler";
import axios from "axios";

export const API_URL = "http://127.0.0.1:3333/api"
const apiHandler = axios.create({
  baseURL: API_URL,
  timeout: 3000,
});

export type NotificationToast = {
  content: string,
  type: 'info' | 'success' | 'warning' | 'error' | 'default'
}
export type RecordSlice = {
  records: Record[];
  selectedRecords: Record[] | null;
  jsonCSV: [],
  loading: boolean,
  notification: NotificationToast[],
  cvsModal: boolean,
  duplicatedCount: number,
  contanctCount: number
}
const defaultState: RecordSlice = {
  records: [],
  selectedRecords: [],
  jsonCSV: [],
  loading: false,
  notification: [],
  cvsModal: false,
  duplicatedCount: 0,
  contanctCount: 0,
};


const slice = createSlice({
  name: 'records',
  initialState: defaultState,
  reducers: {
    setRecordsList: (state, action: PayloadAction<Record[]>) => {
      state.records = action.payload;
    },
    setSelectedRecord: (state, action: PayloadAction<Record[]>) => {
      state.selectedRecords = action.payload
    },
    setCSV: (state, action: PayloadAction<any>) => {
      state.jsonCSV = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setNotification: (state, action: PayloadAction<NotificationToast[]>) => {
      state.notification = action.payload
    },
    addNotification: (state, action: PayloadAction<NotificationToast>) => {
      state.notification.push(action.payload)
    },
    openCvsModal: (state, action: PayloadAction<boolean>) => {
      state.cvsModal = action.payload
    },
    setDuplicatedCount: (state, action: PayloadAction<number>) => {
      state.duplicatedCount = action.payload
    },
    setContactCount: (state, action: PayloadAction<number>) => {
      state.contanctCount = action.payload
    },
  },
});

const recordReducer = slice.reducer;

export const {
  setRecordsList,
  setSelectedRecord,
  setNotification,
  setLoading,
  addNotification,
  openCvsModal,
  setDuplicatedCount,
  setContactCount
} = slice.actions

export default recordReducer;


export const getAllArticles = (): ThunkAction<void, RootState, unknown, Action<unknown>> => {
  return async (dispatch, getState) => { }
}

export const getCSVtoJson = (data: File): ThunkAction<void, RootState, unknown, Action<unknown>> => {
  return async (dispatch, getState) => {
    slice.actions.setLoading(true)
    try {

      const text = await data.text()
      const json = await getJsonCSV(text)
      dispatch(slice.actions.setCSV(json))
      dispatch(slice.actions.addNotification({
        content: `cvs readed, trying to update changes`,
        type: 'success'
      }))

      dispatch(slice.actions.setCSV(json))
      dispatch(slice.actions.setLoading(false))
    } catch (error) {
      dispatch(slice.actions.addNotification({
        content: `Something fail reading csv: ${error}`,
        type: 'error'
      }))
      dispatch(slice.actions.setLoading(false))
    }
  }
}

export const createDataByCSV = (): ThunkAction<void, RootState, unknown, Action<unknown>> => {
  return async (dispatch, getState) => {
    const state = getState()
    await apiHandler.post(`/records`, {
      records: state.record.jsonCSV
    })
  }
}

export const heartBeat = (): ThunkAction<void, RootState, unknown, Action<unknown>> => {
  return async (dispatch, getState) => {
    const result = await apiHandler.get(`/records`)
    dispatch(slice.actions.setRecordsList(result.data))
  }
}
