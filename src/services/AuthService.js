import HttpService from "./HttpService";

class AuthService extends HttpService {

  login = async (userData) => {
    const response = await this.client.post("/login", userData);
    localStorage.setItem("token", response.data.authorization.token);
    localStorage.setItem("userId", response.data.user.id);
  };

  register = async (user) => {
    const response = await this.client.post("/register", user);
    localStorage.setItem("token", response.data.authorization.token);
    localStorage.setItem("userId", response.data.user.id);
  };

  logout = async () => {
    await this.client.post("/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };
  
}
export default new AuthService();
