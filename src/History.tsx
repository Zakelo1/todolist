import { useEffect, useState } from 'react';
import { getTasksFromLocalStorage } from './localStorageUtils';

const History = () => {
    const [items, setItems] = useState<string[]>([]);

    useEffect(() => {
        const savedTasks = getTasksFromLocalStorage();
        setItems(savedTasks);
    }, []);

    return (
        <div className="flex flex-col items-center pt-5">
            <h1 className="text-2xl font-bold mb-4">Historique des tâches</h1>
            <ul>
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <li key={index} className="p-4 bg-gray-100 border-b">
                            {item}
                        </li>
                    ))
                ) : (
                    <p>Aucune tâche enregistrée.</p>
                )}
            </ul>
        </div>
    );
};

export default History;
