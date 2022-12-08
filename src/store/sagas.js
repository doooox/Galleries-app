import * as gallerySagas from "./gallery/saga";
import * as authSagas from "./auth/saga";

const sagas = {
  ...gallerySagas,
  ...authSagas,
};

export default sagas;