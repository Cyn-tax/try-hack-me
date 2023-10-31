import { config } from "../config";

const Auth = () => {
  const checkLoginStatus = async () => {
    try {
      if (localStorage.getItem("token")) {
        const response = await fetch(`${config.API_URL}/api/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` || "",
          },
        });
        return response.ok;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };
  return checkLoginStatus();
};

export default Auth;
