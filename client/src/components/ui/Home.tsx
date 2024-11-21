import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" h-screen flex items-center justify-center">
      <button>
        <Link to="/signup">Signup</Link>
      </button>
      <button>
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
};

export default Home;
