import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { PlusIcon } from "../../icons";
import { useNavigate } from "react-router";
import { getUsers } from "./api/action";
import { getStoredUserAdmin } from "../../api/auth";

interface User {
  id: number;
  username: string;
  email: string;
  admin: boolean;
}

export default function Clients() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is admin
  const isAdmin = getStoredUserAdmin();

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (userId: number) => {
    console.log('Edit user:', userId);
    // Add edit functionality here
  };

  // Show access denied message if user is not admin
  if (!isAdmin) {
    return (
      <>
        <PageMeta
          title="Access Denied | TailAdmin - Next.js Admin Dashboard Template"
          description="Access denied. Admin privileges required."
        />
        <PageBreadcrumb pageTitle="Clients" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
              Access Denied
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              You need admin privileges to access this page.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="React.js Clients Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="Clients. This is the clients we give access. Check Facebook Page, Google Analytics, and Search Console data."
      />
      <PageBreadcrumb pageTitle="Clients" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex items-center justify-between mb-5 lg:mb-7">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Clients
          </h3>
          <Button
            size="sm"
            variant="primary"
            startIcon={<PlusIcon className="w-5 h-5" />}
            onClick={() => navigate("/clients/add")}
          >
            Add Client
          </Button>
        </div>
        <div className="space-y-6">
          {loading ? (
            <div className="p-4">Loading users...</div>
          ) : error ? (
            <div className="p-4 text-red-500">Error: {error}</div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                    <tr>
                      <th className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                        Username
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                        Email
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                        Admin
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-5 py-4 text-start">
                          <span className="font-medium text-gray-800 text-sm dark:text-white/90">
                            {user.username}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-start text-sm dark:text-gray-400">
                          {user.email}
                        </td>
                        <td className="px-4 py-3 text-start">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${user.admin ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}>
                            {user.admin ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-start">
                          <Button
                            size="sm"
                            onClick={() => handleEdit(user.id)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}