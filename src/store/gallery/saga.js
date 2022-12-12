import { call, put, takeLatest } from "redux-saga/effects";
import GalleryService from "../../services/GalleryService";
import {
  addGalleries,
  addGallery,
  createGallery,
  deleteGallery,
  editGallery,
  getGalleries,
  getGallery,
  getMyGalleries,
  getUserGalleries,
  setGalleries,
  setGallery,
  setIsHidden,
} from "./slice";

function* getGalleriesHandler(action) {
  try {
    const data = yield call(GalleryService.getAll, action.payload);
    if (action.payload.page > 1) yield put(addGalleries(data.data));
    else yield put(setGalleries(data.data));

    yield put(setIsHidden(!data.next_page_url));
  } catch (error) {
    console.log(error);
  }
}

function* getMyGalleriesHandler(action) {
  try {
    const data = yield call(GalleryService.getMyGalleries, action.payload);
    if (action.payload.page > 1) yield put(addGalleries(data.data));
    else yield put(setGalleries(data.data));
    yield put(setIsHidden(!data.next_page_url));
  } catch (error) {
    console.log(error);
  }
}

function* getUserGalleriesHandler(action) {
  try {
    const data = yield call(GalleryService.getUserGalleries, action.payload);
    if (action.payload.page > 1) yield put(addGalleries(data.data));
    else yield put(setGalleries(data.data));
    yield put(setIsHidden(!data.next_page_url));
  } catch (error) {
    console.log(error);
  }
}
function* getGalleryHandler(action) {
  try {
    const data = yield call(GalleryService.getGallery, action.payload);
    yield put(setGallery(data));
  } catch (error) {
    console.log(error);
  }
}

function* createGalleryHandler(action) {
  try {
    const gallery = yield call(
      GalleryService.createGallery,
      action.payload.gallery
    );
    yield put(addGallery(gallery));
    if (action.payload.meta) {
      yield call(action.payload.meta.onSuccess);
    }
  } catch (error) {
    console.log(error.response);
  }
}

function* editGalleryHandler(action) {
  try {
    yield call(GalleryService.editGallery, action.payload.content);
    if (action.payload.meta.onSuccess) {
      yield call(action.payload.meta.onSuccess);
    }
  } catch (error) {
    console.log(error);
  }
}
function* deleteGalleryHandler(action) {
  yield call(GalleryService.deleteGallery, action.payload.id);
  if (action.payload.meta.onSuccess) {
    yield call(action.payload.meta.onSuccess);
  }
}

export function* watchGallery() {
  yield takeLatest(getGalleries.type, getGalleriesHandler);
  yield takeLatest(getMyGalleries.type, getMyGalleriesHandler);
  yield takeLatest(getUserGalleries.type, getUserGalleriesHandler);
  yield takeLatest(getGallery.type, getGalleryHandler);
  yield takeLatest(createGallery.type, createGalleryHandler);
  yield takeLatest(editGallery.type, editGalleryHandler);
  yield takeLatest(deleteGallery.type, deleteGalleryHandler);
}