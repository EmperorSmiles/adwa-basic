import { Trash2 } from "lucide-react";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  return (
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
        {users.map((user) => (
          <tr key={user.email} className="border-b border-gray-700">
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
  );
};

export default UserTable;
