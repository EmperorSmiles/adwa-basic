import { useEffect, useState } from "react";

import UserTable from "./components/UserTable";

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
        {/* <div className="overflow-x-auto"> */}
        <UserTable users={users} />
        {/* </div> */}
      </div>
    </>
  );
}

export default App;
