import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const code = new URLSearchParams(location.search).get('code');

        if (code) {
            axios.post('http://localhost:8080/callback', { code }, { withCredentials: true })
                .then(response => {
                    console.log("로그인 처리 성공:", response.data);
                    navigate('/profile'); // 로그인 성공 후 프로필로 이동
                })
                .catch(error => {
                    console.error('로그인 처리 중 오류 발생!', error);
                });
        } else {
            axios.get('http://localhost:8080/profile', { withCredentials: true })
                .then(response => {
                    setUserInfo(response.data);
                    console.log("프로필 정보 가져오기 성공:", response.data);
                })
                .catch(error => {
                    console.error('프로필 정보 가져오기 중 오류 발생!', error);
                });
        }
    }, [location, navigate]);

    const handleLogout = () => {
        axios.post('http://localhost:8080/logout', { withCredentials: true })
            .then(() => {
                navigate('/login') // 로그아웃 후 로그인 페이지로 리다이렉트
            })
            .catch(error => {
                console.error('로그아웃 처리 중 오류 발생!', error);
            });
    };

    return (
        <div>
            <h1>{userInfo ? "Welcome, " + userInfo.properties.nickname : "로딩중..."}</h1>
            {userInfo && (
                <div>
                    <img src={userInfo.properties.profile_image} alt="Profile" />
                </div>
            )}
            {userInfo && <button onClick={handleLogout}>로그아웃</button>}
        </div>
    );
};

export default AuthProfile;
