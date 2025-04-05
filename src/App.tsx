import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://reqres.in/api/users?page=1");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ApiResponse = await res.json();
        console.log(data);
        setUsers(data.data);
      } catch (error) {
        setError(error);
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-black text-white p-6">
        <div className="flex flex-col items-center justify-center text-left">
          <h1 className="text-left">Users</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-separate border-spacing-y-4 border-spacing-x-8">
            <thead className="text-left text-gray-400">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Avatar</th>
                <th>Email Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>
                    <a
                      href={user.avatar}
                      className="text-blue-400 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {user.avatar}
                    </a>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <button className="text-red-400 hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
