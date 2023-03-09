import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/context';

const UserBlogsPage = () => {

    const navigate = useNavigate();
    const { account } = useContext(AppContext);
    // console.log(account);

    if (account === "" || !account) {
      navigate("/");
      window.location.replace("/");
    }

    const { userAddress } = useParams();
    console.log(userAddress);

    return (
        <div className="UserBlogsPage">
            <div className="heading">
                User Blogs Page
            </div>
        </div>
    )
}

export default UserBlogsPage