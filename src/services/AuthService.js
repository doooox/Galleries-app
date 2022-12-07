import HttpService from "./HttpService";
class AuthService extends HttpService {
  login = async (credentials) => {
    const response = await this.client.post("/login", credentials);
    localStorage.setItem("token", response.data.authorization.token);
  };
}
export default new AuthService();
