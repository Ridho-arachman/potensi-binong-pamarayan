import SidebarAdmin from "@/components/admin/SidebarAdmin";
import { Toaster } from "@/components/ui/sonner";

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
        <Toaster />
      </div>
    </>
  );
}
