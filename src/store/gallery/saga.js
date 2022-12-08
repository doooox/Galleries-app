import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import GalleryService from "../../services/GalleryService";
import { getGalleries, setGalleries } from "./slice";

function* getGalleriesHandler(action) {
  try {
    const response = yield call(GalleryService.getAll, action.payload);
    yield put(setGalleries(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watchGallery() {
    yield takeLatest(getGalleries.type, getGalleriesHandler);
  }
