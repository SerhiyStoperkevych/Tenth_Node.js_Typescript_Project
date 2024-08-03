import React, { useEffect } from "react";
import axios from "axios";
import { useMyContext } from "../MyContext";

const UseEffectSigning: React.FC = () => {

    const {setUsers} = useMyContext();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [setUsers]);

    return null
}

export default UseEffectSigning
