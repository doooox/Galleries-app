import HttpService from "./HttpService";
class GalleryService extends HttpService {
  getAll = async ({ page, filter }) => {
    const  response  = await this.client.get("galleries", {
      params: {
        page,
        filter,
      },
    });
    return response.data;
  };
}
export default new GalleryService();
