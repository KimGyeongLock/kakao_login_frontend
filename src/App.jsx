import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [loginUrl, setLoginUrl] = useState('');
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        axios.get('/api/kakao-login-url')
            .then(response => {
                setLoginUrl(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the Kakao login URL!', error);
            });

        axios.get('/api/login-status', { withCredentials: true })
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.error('User is not logged in', error);
            });
    }, []);

    const handleLogin = () => {
        window.location.href = loginUrl;
    };

    const handleLogout = () => {
        axios.post('/api/logout', {}, { withCredentials: true })
            .then(() => {
                setUserInfo(null); // 로그아웃 후 사용자 정보 초기화
            })
            .catch(error => {
                console.error('Logout error', error);
            });
    };

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('code')) {
            axios.get(`/api/callback?code=${query.get('code')}`, { withCredentials: true })
                .then(response => {
                    setUserInfo(response.data);
                    window.history.replaceState(null, '', '/');
                })
                .catch(error => {
                    console.error('Login callback error', error);
                });
        }
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Kakao Login</h1>
                {userInfo ? (
                    <div>
                        <h2>Welcome, {userInfo.properties.nickname}</h2>
                        <img src={userInfo.properties.profile_image} alt="Profile" />
                        <button onClick={handleLogout}>Logout</button> {/* 로그아웃 버튼 */}
                    </div>
                ) : (
                    <button onClick={handleLogin}>
                        <img src="/kakao_login_medium_narrow.png" alt="Kakao Login" />
                    </button>
                )}
            </header>
        </div>
    );
}

export default App;
