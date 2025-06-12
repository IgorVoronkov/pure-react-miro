import { Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "@/features/header";
import { ROUTES } from "@/shared/model/routes";

export function App() {
  const { pathname } = useLocation();

  const isAuthPage = pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER;

  return (
    <div>
      {!isAuthPage && <AppHeader />}
      <Outlet />
    </div>
  );
}
