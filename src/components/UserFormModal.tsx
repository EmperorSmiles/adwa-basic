import { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  password?: string;
}

interface Props {
  mode: "add" | "edit";
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
}

const UserFormModal = ({ mode, user, onClose, onSave }: Props) => {
  const [form, setForm] = useState<User>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
    password: "",
  });

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center">
      <div className="bg-black text-white/70 p-6 rounded shadow-lg w-96 space-y-4 border-2 border-gray-100">
        <h2 className="text-xl font-semibold">
          {mode === "add" ? "Add" : "Edit"} User
        </h2>
        <input
          placeholder="First Name"
          className="w-full p-2 border"
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          required
        />
        <input
          placeholder="Last Name"
          className="w-full p-2 border"
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          className="w-full p-2 border"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Password"
          className="w-full p-2 border"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <div className="flex justify-end space-x-2">
          <Button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 hover:cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onSave(form)}
            disabled={!form.first_name || !form.last_name || !form.email}
            className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
