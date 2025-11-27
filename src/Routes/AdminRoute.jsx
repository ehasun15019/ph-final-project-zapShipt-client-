import React from 'react'
import useAuth from '../Hooks/useAuth'
import Loading from '../Components/Loading/Loading';
import useUserRole from '../Hooks/useUserRole';
import ForBidden from '../Components/ForBidden/ForBidden';

const AdminRoute = ({children}) => {

    const { loading} = useAuth();
    const {role, roleLoading} = useUserRole();

    if(loading || roleLoading) {
        return <Loading></Loading>
    }


    if(role !== 'admin'){
        return <ForBidden></ForBidden>
    }

  return children
}

export default AdminRoute
