const UserTableSkeleton = () => {
  return (
    <div className="w-full max-w-4xl overflow-x-auto">
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
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b border-gray-700">
              <td>
                <div className="h-4 w-24 rounded bg-gray-700 animate-pulse" />
              </td>
              <td>
                <div className="h-4 w-24 rounded bg-gray-700 animate-pulse" />
              </td>
              <td>
                <div className="h-4 w-48 rounded bg-gray-700 animate-pulse" />
              </td>
              <td>
                <div className="h-4 w-48 rounded bg-gray-700 animate-pulse" />
              </td>
              <td>
                <div className="h-4 w-6 rounded bg-gray-700 animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableSkeleton;
