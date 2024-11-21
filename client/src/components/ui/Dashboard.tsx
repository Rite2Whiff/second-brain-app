import Sidebar from "./Sidebar";
import Content from "./Content";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-5 min-h-screen">
      <Sidebar />
      <Content />
    </div>
  );
};

export default Dashboard;
