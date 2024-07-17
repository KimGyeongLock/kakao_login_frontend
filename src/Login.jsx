import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [loginUrl, setLoginUrl] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/login')
            .then(response => {
                setLoginUrl(response.data.location);
            })
            .catch(error => {
                console.error('There was an error fetching the login URL!', error);
            });
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '200px auto' }}>
            <h1>카카오 로그인</h1>
            <a href={loginUrl}>
                <img src="/kakao_login_medium_narrow.png" alt="Kakao Login" />
            </a>
        </div>
    );
};

export default Login;
