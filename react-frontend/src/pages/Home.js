import React from 'react'

export default function Home() {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ allUsers { id name email userType } }' }),
        })
        .then(res => res.json())
        .then(result => setUsers(result.data.allUsers));
    }, []);
  return (
    <div>
        {users?.map(user => (
            <div key={user.id}>
                <p>ID: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>User Type: {user.userType}</p>
                <hr />
            </div>
        ))}
    </div>
  )
}
