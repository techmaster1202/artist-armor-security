import { Navigate, Route, Routes } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { menuItems } from "../../constants/admin/menu";
import { ROUTES } from "../../constants/admin/routes";
import DefaultLayout from "../../layout/DefaultLayout";

const Admin = () => {
  return (
    <DefaultLayout menuItems={menuItems} rootPath="/admin">
      <Routes>
        {ROUTES.map(({ title, path, element }, index) => (
          <Route
            key={index}
            path={path}
            element={
              <>
                <PageTitle title={`${title} - Admin Dashboard`} />
                {element}
              </>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </DefaultLayout>
  );
};

export default Admin;
