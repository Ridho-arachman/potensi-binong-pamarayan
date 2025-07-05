import SidebarAdmin from "@/components/admin/SidebarAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarAdmin />
      <div className="lg:ml-64">
        <main className="p-6">{children}</main>
      </div>
    </>
  );
}
