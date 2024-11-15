import { Menu, Home, User, Wallet, Clock, Pen, Plus, Trash, Goal } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from './localStorageUtils';
import { useState, useEffect } from 'react';

const Editer = () => {
    const navigate = useNavigate();
    const goToPage = (path: string) => {
        navigate(path);
    };

    const [items, setItems] = useState<string[]>([]);
    const [newItem, setNewItem] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [copyItem, setCopyItem] = useState<string[]>([]);
    useEffect(() => {
        const storedUserId = localStorage.getItem("loggedInUserId");
        console.log('User ID from localStorage:', storedUserId); 
        if (storedUserId) {
            setUserId(storedUserId);
            const savedTasks = getTasksFromLocalStorage();
            console.log('Tasks loaded from localStorage:', savedTasks);  
            setItems(savedTasks);
        } else {
            console.log('No user ID found, please log in!');
        }
    }, []);

    const addItem = () => {
        console.log('Adding item:', newItem); 
        console.log('User ID:', userId); 
    
        if (newItem.trim() !== "" && userId) {
            const updatedItems = [...items, newItem];
            setItems(updatedItems);
            saveTasksToLocalStorage(updatedItems); 
            setCopyItem((prevCopy) => {
                const updatedCopy = [...prevCopy, newItem];
                localStorage.setItem('copyItem', JSON.stringify(updatedCopy)); // Sauvegarde dans localStorage
                return updatedCopy;
            });
            setNewItem(""); 
        } else {
            console.log('Item is empty or user is not logged in');
        }
    };


    const deleteItem = (index: number) => {
        const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);
        setItems(updatedItems);
        if (userId) {
            saveTasksToLocalStorage(updatedItems); // Met à jour les tâches dans le localStorage
        }
    };

    return (
        <div className="flex flex-col items-center pt-2 mb-5 mx-5 overflow-auto">
            <div className="fixed flex justify-between items-center w-full">
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

            <div className='flex items-center justify-center min-h-screen'>
                <div className='flex flex-col items-center'>
                    <ul className='m-4'>
                        {items.map((item, index) => (
                            <li key={index} className='p-4 bg-gray-100 border-b'>
                                {item}
                                <Button size="icon" variant="ghost" onClick={() => deleteItem(index)}>
                                    <Trash />
                                </Button>
                            </li>
                        ))}
                    </ul>

                    <div className='flex flex-row items-center'>
                        <input
                            type="text"
                            className='w-full h-20 text-center text-2xl border-2 rounded-l-full'
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className='w-10 h-20 bg-gray-200 rounded-none rounded-r-full'
                            onClick={addItem}
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editer;
