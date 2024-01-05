
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <>
      {/* Header */}
      <Outlet></Outlet>
      {/* Footer */}
    </>
  );
}

export default MainLayout;