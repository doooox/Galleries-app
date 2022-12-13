import HttpService from "./HttpService";
class GalleryService extends HttpService {

  getAll = async ({ page, filter }) => {
    const response = await this.client.get("/galleries", {
      params: {
        page,
        filter,
      },
    });
    return response.data;
  };

  getMyGalleries = async ({ page, filter }) => {
    const response = await this.client.get("/my-galleries", {
      params: {
        page,
        filter,
      },
    });
    return response.data;
  };

  getUserGalleries = async ({ page, filter, id }) => {
    const response = await this.client.get(`authors/${id}`, {
      params: {
        page,
        filter,
      },
    });
    return response.data;
  };

  getGallery = async (id) => {
    const response = await this.client.get(`/galleries/${id}`);
    return response.data;
  };

  createGallery = async (gallery) => {
    const response = await this.client.post("/create", gallery);
    return response.data;
  };

  editGallery = async ({ id, gallery }) => {
    const response = await this.client.put(`/edit/${id}`, gallery);
    return response.data;
  };
  
  deleteGallery = async (id) => {
    const response = await this.client.post(`delete/${id}`);
    return response.data;
  };
}
export default new GalleryService();
