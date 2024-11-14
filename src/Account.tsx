import { Menu, Home, User, Clock, Pen, Goal } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { saveUserDataToLocalStorage, getUserDataFromLocalStorage, UserData } from './localStorageUtils';
import { useState, useEffect } from 'react';

const Account = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const goToPage = (path: string) => {
        navigate(path);
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem("loggedInUserId");
        if (storedUserId) {
            setUserId(storedUserId);
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        if (userId) {
            const userData = getUserDataFromLocalStorage(userId);
            if (userData) {
                console.log("User data loaded:", userData);
            } else {
                const newUserData: UserData = { userId, username: "NewUser", tasks: [] };
                saveUserDataToLocalStorage(newUserData);
                console.log("New user created:", newUserData);
            }
            localStorage.setItem("loggedInUserId", userId);
            setIsLoggedIn(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("loggedInUserId");
        setIsLoggedIn(false);
        setUserId("");
    };

    return (
        <div className="flex flex-col items-center pt-2 mb-5 mx-5 overflow-auto">
            <div className="fixed flex justify-between items-center w-full">
                {/* Boutons de navigation */}
                <div className="flex gap-4 items-center flex-shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => goToPage('/app')}>
                        <Menu />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => goToPage('/')}>
                        <Home />
                    </Button>
                </div>
                <div className="flex items-center">
                    <Button size="icon" variant="ghost" onClick={() => goToPage('/Complete')}>
                        <Goal />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => goToPage('/Editer')}>
                        <Pen />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => goToPage('/History')}>
                        <Clock />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => goToPage('/account')}>
                        <User />
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-center mt-16">
                {isLoggedIn ? (
                    <div>
                        <p>Bienvenue, {userId}!</p>
                        <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded">
                            Se déconnecter
                        </button>
                    </div>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Enter User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="mb-4 p-2 border rounded"
                        />
                        <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded">
                            Se connecter
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Account;
