import HttpService from "./HttpService";
class CommentService extends HttpService {
  createComment = async ({ id, content }) => {
    const response = await this.client.post(`/comments/${id}`, { content });
    return response.data;
  };
  deleteComment = async (id) => {
    const response = await this.client.post(`/comments/delete/${id}`);
    return response.data;
  };
}
export default new CommentService();