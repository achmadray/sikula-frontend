import { Route, Routes } from "react-router-dom";
import { HomeLayout, AppLayout } from "@/components/layout";
import { lazyImport } from "@/utils/lazyImport";

// Halaman utama
const { Home } = lazyImport(() => import("@/features/employee"), "Home");
const { DataMasterPage } = lazyImport(
  () => import("@/features/employee/pages"),
  "DataMasterPage"
);
// Halaman lainnya
const { SchedulePage } = lazyImport(
  () => import("@/features/employee/pages/schedule/pages"),
  "SchedulePage"
);
const { SickRequestPage } = lazyImport(
  () => import("@/features/employee/pages/SickRequest"),
  "SickRequestPage"
);
const { LeaveRequestPage } = lazyImport(
  () => import("@/features/employee/pages/LeaveRequest"),
  "LeaveRequestPage"
);
const { CashAdvancePage } = lazyImport(
  () => import("@/features/employee/pages/CashAdvance"),
  "CashAdvancePage"
);
const { SalaryPage } = lazyImport(
  () => import("@/features/employee/pages/Salary"),
  "SalaryPage"
);
const { ProfilePage } = lazyImport(
  () => import("@/features/employee/pages/Profile"),
  "ProfilePage"
);
const { BiodataPage } = lazyImport(
  () => import("@/features/employee/pages/Profile"),
  "BiodataPage"
);
const { BiodataUpdatePage } = lazyImport(
  () => import("@/features/employee/pages/Profile"),
  "BiodataUpdatePage"
);
const { HistoryPage } = lazyImport(
  () => import("@/features/employee/pages/History"),
  "HistoryPage"
);
const { NotificationPage } = lazyImport(
  () => import("@/features/employee/pages/Notification"),
  "NotificationPage"
);
const { CheckLogPage } = lazyImport(
  () => import("@/features/employee/pages/CheckLog"),
  "CheckLogPage"
);

const { AccountListPage } = lazyImport(
  () => import("@/features/employee/pages/Account"),
  "AccountListPage"
);
const { AccountAddPage } = lazyImport(
  () => import("@/features/employee/pages/Account"),
  "AccountAddPage"
);
const { AccountUpdatePage } = lazyImport(
  () => import("@/features/employee/pages/Account"),
  "AccountUpdatePage"
);
const { AccountDetailPage } = lazyImport(
  () => import("@/features/employee/pages/Account"),
  "AccountDetailPage"
);

const { ProductListPage } = lazyImport(
  () => import("@/features/employee/pages/Product"),
  "ProductListPage"
);
const { ProductAddPage } = lazyImport(
  () => import("@/features/employee/pages/Product"),
  "ProductAddPage"
);
const { ProductUpdatePage } = lazyImport(
  () => import("@/features/employee/pages/Product"),
  "ProductUpdatePage"
);
const { ProductDetailPage } = lazyImport(
  () => import("@/features/employee/pages/Product"),
  "ProductDetailPage"
);

const { UnitListPage } = lazyImport(
  () => import("@/features/employee/pages/Unit"),
  "UnitListPage"
);
const { UnitAddPage } = lazyImport(
  () => import("@/features/employee/pages/Unit"),
  "UnitAddPage"
);
const { UnitUpdatePage } = lazyImport(
  () => import("@/features/employee/pages/Unit"),
  "UnitUpdatePage"
);
const { UnitDetailPage } = lazyImport(
  () => import("@/features/employee/pages/Unit"),
  "UnitDetailPage"
);

const { CategoryListPage } = lazyImport(
  () => import("@/features/employee/pages/Category"),
  "CategoryListPage"
);
const { CategoryAddPage } = lazyImport(
  () => import("@/features/employee/pages/Category"),
  "CategoryAddPage"
);
const { CategoryUpdatePage } = lazyImport(
  () => import("@/features/employee/pages/Category"),
  "CategoryUpdatePage"
);
const { CategoryDetailPage } = lazyImport(
  () => import("@/features/employee/pages/Category"),
  "CategoryDetailPage"
);

const { MenuListPage } = lazyImport(
  () => import("@/features/employee/pages/Menu"),
  "MenuListPage"
);
const { MenuAddPage } = lazyImport(
  () => import("@/features/employee/pages/Menu"),
  "MenuAddPage"
);
const { MenuUpdatePage } = lazyImport(
  () => import("@/features/employee/pages/Menu"),
  "MenuUpdatePage"
);
const { MenuDetailPage } = lazyImport(
  () => import("@/features/employee/pages/Menu"),
  "MenuDetailPage"
);
const { SuplierListPage } = lazyImport(
  () => import("@/features/employee/pages/Suplier"),
  "SuplierListPage"
);
const { SuplierAddPage } = lazyImport(
  () => import("@/features/employee/pages/Suplier"),
  "SuplierAddPage"
);
const { SuplierUpdatePage } = lazyImport(
  () => import("@/features/employee/pages/Suplier"),
  "SuplierUpdatePage"
);
const { SuplierDetailPage } = lazyImport(
  () => import("@/features/employee/pages/Suplier"),
  "SuplierDetailPage"
);
const { ProductInListPage } = lazyImport(
  () => import("@/features/employee/pages/ProductIn"),
  "ProductInListPage"
);
const { ProductInDetailPage } = lazyImport(
  () => import("@/features/employee/pages/ProductIn"),
  "ProductInDetailPage"
);
const { ProductInHistoryPage } = lazyImport(
  () => import("@/features/employee/pages/ProductIn"),
  "ProductInHistoryPage"
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="sick-request" element={<SickRequestPage />} />
          <Route path="leave-request" element={<LeaveRequestPage />} />
          <Route path="cash-advance-request" element={<CashAdvancePage />} />
          <Route path="salary" element={<SalaryPage />} />

          <Route path="profile">
            <Route index element={<ProfilePage />} />
            <Route path="biodata" element={<BiodataPage />} />
            <Route path="biodata/update" element={<BiodataUpdatePage />} />
          </Route>

          <Route path="history" element={<HistoryPage />} />
          <Route path="notification" element={<NotificationPage />} />
          <Route path="check-log" element={<CheckLogPage />} />

          <Route path="akun">
            <Route index element={<AccountListPage />} />
            <Route path="tambah" element={<AccountAddPage />} />
            <Route path="edit/:id" element={<AccountUpdatePage />} />
            <Route path="detail/:id" element={<AccountDetailPage />} />
          </Route>
          <Route path="data_master">
            <Route index element={<DataMasterPage />} />
          </Route>
            <Route path="barang_masuk">
              <Route path="/barang_masuk" element={<ProductInListPage />} />
              <Route
                path="/barang_masuk/history"
                element={<ProductInHistoryPage />}
              />
              <Route
                path="/barang_masuk/detail"
                element={<ProductInDetailPage />}
              />
            </Route>

          <Route path="data_master">
            <Route path="barang" element={<ProductListPage />} />
            <Route path="barang/tambah" element={<ProductAddPage />} />
            <Route path="barang/edit/:id" element={<ProductUpdatePage />} />
            <Route path="barang/detail" element={<ProductDetailPage />} />

            <Route path="satuan" element={<UnitListPage />} />
            <Route path="satuan/tambah" element={<UnitAddPage />} />
            <Route path="satuan/edit/:id" element={<UnitUpdatePage />} />
            <Route path="satuan/detail" element={<UnitDetailPage />} />

            <Route path="kategori" element={<CategoryListPage />} />
            <Route path="kategori/tambah" element={<CategoryAddPage />} />
            <Route path="kategori/edit/:id" element={<CategoryUpdatePage />} />
            <Route path="kategori/detail" element={<CategoryDetailPage />} />

            <Route path="menu" element={<MenuListPage />} />
            <Route path="menu/tambah" element={<MenuAddPage />} />
            <Route path="menu/edit/:id" element={<MenuUpdatePage />} />
            <Route path="menu/detail" element={<MenuDetailPage />} />

            <Route path="suplier" element={<SuplierListPage />} />
            <Route path="suplier/tambah" element={<SuplierAddPage />} />
            <Route path="suplier/edit/:id" element={<SuplierUpdatePage />} />
            <Route path="suplier/detail" element={<SuplierDetailPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
