import { useEffect, useState } from "react";

import UserTable from "./components/UserTable";
import UserPagination from "./components/UserPagination";
import UserTableSkeleton from "./components/UserTableSkeleton";
import { AlertTriangle } from "lucide-react";
import { Button } from "./components/ui/button";
import UserFormModal from "./components/UserFormModal";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  password?: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const rowsPerPage = 6;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `https://reqres.in/api/users?page=${currentPage}&per_page=${rowsPerPage}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ApiResponse = await res.json();
        setUsers(data.data);
        setTotalUsers(data.total);
        setTotalPages(data.total_pages);
        console.log("Fetched users:", data);
      } catch (error) {
        setError(true);
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, rowsPerPage]);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setTotalUsers((prev) => prev - 1);
      setTotalPages(Math.ceil((totalUsers - 1) / rowsPerPage));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const newId = Math.max(...users.map((u) => u.id), 0) + 1;

  const handleSaveUser = async (user: User) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    const payload = {
      name: fullName,
      email: user.email,
      password: user.password,
    };

    if (formMode === "add") {
      const res = await fetch("https://reqres.in/api/users", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("User added:", data);
      setUsers((prev) => [
        ...prev,
        { ...user, id: newId, avatar: "https://via.placeholder.com/150" },
      ]);
      setTotalUsers((prev) => prev + 1);
      setTotalPages(Math.ceil((totalUsers + 1) / rowsPerPage));
    }
    if (formMode === "edit" && selectedUser) {
      await fetch(`https://reqres.in/api/users/${selectedUser.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...selectedUser, ...user } : u
        )
      );
    }

    setFormMode(null);
    setSelectedUser(null);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setLoading(true);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-black text-white p-6 space-y-6">
      <div className="flex justify-between items-center w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Users</h1>
        <Button
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 hover:cursor-pointer"
          onClick={() => {
            setFormMode("add");
            setSelectedUser(null);
          }}
        >
          Add User
        </Button>
      </div>

      {loading ? (
        <UserTableSkeleton />
      ) : error ? (
        <div className="flex flex-col items-center">
          <AlertTriangle className="text-destructive mb-2" />
          <p className="text-destructive">Failed to load users.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-400">
            Showing page {currentPage} of {totalPages} ({totalUsers} users)
          </p>
          <div className="w-full max-w-4xl overflow-x-auto">
            <UserTable
              users={users}
              onDelete={handleDelete}
              onEdit={(user) => {
                setFormMode("edit");
                setSelectedUser(user);
              }}
            />
          </div>
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {formMode && (
        <UserFormModal
          mode={formMode}
          user={selectedUser}
          onClose={() => setFormMode(null)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}

export default App;
