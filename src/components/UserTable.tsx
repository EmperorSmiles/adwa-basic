import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UserTableProps {
  users: User[];
  onDelete: (id: number) => void;
  onEdit: (user: User) => void;
}

const UserTable = ({ users, onDelete, onEdit }: UserTableProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      onDelete(userToDelete);
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };
  return (
    <>
      <table className="w-full table-auto border-separate border-spacing-y-4 border-spacing-x-8">
        <thead className="text-left text-gray-400">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Avatar</th>
            <th>Email Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-700">
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <a
                  href={user.avatar}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Avatar
                </a>
              </td>
              <td>{user.email}</td>
              <td className="flex gap-2">
                <button
                  className="text-yellow-400 hover:text-yellow-600"
                  onClick={() => onEdit(user)}
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="text-red-400 hover:text-red-600"
                  onClick={() => handleDelete(user.id)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center">
          <div className="bg-black p-6 text-white border-2 border-gray-100 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-800"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;
