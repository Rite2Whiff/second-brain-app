import { useRecoilState } from "recoil";
import { authFormAtom } from "../../atoms";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formValue, setFormValue] = useRecoilState(authFormAtom);
  const navigate = useNavigate();

  async function handleLogin(e): Promise<void> {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/api/v1/login", {
      username: formValue.username,
      password: formValue.password,
    });
    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);
      alert("successfully signed in");
      navigate("/dashboard");
    } else {
      return;
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <form
        onSubmit={handleLogin}
        className="flex flex-col  gap-2 min-w-[500px] min-h-[300px]"
      >
        <div className="sm:col-span-4">
          <label
            htmlFor="username"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Username
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input
                value={formValue.username}
                onChange={(e) =>
                  setFormValue({ ...formValue, username: e.target.value })
                }
                id="username"
                name="username"
                type="text"
                placeholder="username"
                autoComplete="username"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input
                value={formValue.password}
                onChange={(e) =>
                  setFormValue({ ...formValue, password: e.target.value })
                }
                id="password"
                name="password"
                type="text"
                placeholder="password"
                autoComplete="username"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <div className="self-center">
          <button
            type="submit"
            className="self-center px-8  py-2 border-2 rounded-lg bg-purple-600 text-white"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
