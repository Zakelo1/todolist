import { useEffect, useState } from 'react';
import { getTasksFromLocalStorage } from './localStorageUtils';
import Button from './Button'
import { Menu, Home, Goal, Pen, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const [copyItem, setCopyItem] = useState<string[]>([]);
    const navigate = useNavigate()
    const goToPage = (path: string) => {
      navigate(path);
  };
    useEffect(() => {
        const savedCopyItem = localStorage.getItem('copyItem');
        if (savedCopyItem) {
            setCopyItem(JSON.parse(savedCopyItem)); // On le met dans l'état de ce composant
        }
    }, []);

    return (
      <div className="flex flex-col items-center pt-2 mb-5 mx-5 overflow-auto">
    
        <div className=" fixed flex justify-between items-center w-full">
        <div className="flex gap-4 items-center flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={()=> goToPage('/app')}>
            <Menu />
          </Button>
          <Button variant="ghost" size="icon">
            <Home />
          </Button>
        </div>
        <div className="flex items-center">
        <Button size="icon" variant="ghost" onClick={()=> goToPage('/Complete')}>
            <Goal/>
          </Button>
        <Button size="icon" variant="ghost" onClick={()=> goToPage('/Editer')}>
            <Pen/>
        </Button>
          <Button size="icon" variant="ghost" onClick={()=> goToPage('/History')}>
            <Clock  />
          </Button>
          <Button size="icon" variant="ghost" onClick={()=> goToPage('/account')}>
            <User />
          </Button>
        </div>
    </div> 
        <div className="flex flex-col items-center pt-5">
            <h1 className="text-2xl font-bold mb-4">Historique des tâches</h1>
            <ul>
                {copyItem.length > 0 ? (
                    copyItem.map((item : string, index :number) => (
                        <li key={index} className="p-4 bg-gray-100 border-b">
                            {item}
                        </li>
                    ))
                ) : (
                    <p>Aucune tâche enregistrée.</p>
                )}
            </ul>
        </div>
        </div>
    );
};

export default History;
