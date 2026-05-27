import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

export default function ViewUser() {

    const [user, setUser] = useState(null);

    const {id} = useParams();

    useEffect(() => {
        // Fetch user data from API
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:8000/graphql`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: `{ userById(id: ${id}) { id name email userType } }` }),
            });
            const data = await response.json();
            setUser(data.data.userById);
        };
        fetchUser();
    }, [id]);

  return (
    <div>
        <h1>View User</h1>
        <div>
            <p>ID: {user?.id}</p>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>User Type: {user?.userType ? user.userType.toLowerCase() : user?.userType}</p>
        </div>

    </div>
  )
}
