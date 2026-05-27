import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: "{ allUsers { id name email userType } }",
      }),
    })
      .then((res) => res.json())
      .then((result) => setUsers(result.data.allUsers));
  }, []);
  return (
    <div className="container mx-auto p-4">
      <table className="w-full border border-slate-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-slate-300">ID</th>
            <th className="border border-slate-300">Name</th>
            <th className="border border-slate-300">Email</th>
            <th className="border border-slate-300">User Type</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td className="border border-slate-300">{user.id}</td>
              <td className="border border-slate-300 MyText text-blue-600 underline hover:text-blue-800">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td className="border border-slate-300">{user.email}</td>
              <td className="border border-slate-300">{user.userType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
