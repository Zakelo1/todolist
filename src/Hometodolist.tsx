import React, { useEffect, useState } from "react";
import { Menu, Home, Pen, User, Clock, Goal, Stamp } from 'lucide-react';
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { getTasksFromLocalStorage } from './localStorageUtils';

const Hometodolist = () => {
  const [finishitem, setfinishitem] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const navigate = useNavigate();

  const goToPage = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const savedTasks = getTasksFromLocalStorage();
    setItems(savedTasks);
  }, []);

  const finisheditem = (index: number) => {
    const savingItem = items[index]; // L'élément à supprimer
    const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);
    setItems(updatedItems);

    // Sauvegarder les éléments dans le localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedItems));

    // Mettre à jour la liste des éléments terminés
    setfinishitem((prevDeletedItems) => {
      const newFinishItems = [...prevDeletedItems, savingItem];
      localStorage.setItem('finishitem', JSON.stringify(newFinishItems));
      return newFinishItems;
    });
  };

  return (
    <div className="flex flex-col items-center pt-2 mb-5 mx-5 overflow-auto">
      <div className="fixed flex justify-between items-center w-full">
        <div className="flex gap-4 items-center flex-shrink-0">
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
          <Button variant="ghost" size="icon">
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

      <div>
        <div className="flex flex-col items-center pt-5">
          <h1 className="text-3xl font-bold mb-4">TODOLIST</h1>
          <ul>
            {items.length > 0 ? (
              items.map((item, index) => (
                <li key={index} className="p-4 mt-8 bg-gray-100 border-b">
                  {item}
                  <Button size="icon" variant="ghost" onClick={() => finisheditem(index)}>
                    <Stamp />
                  </Button>
                </li>
              ))
            ) : (
              <p>Aucun objectif dans la vie</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hometodolist;
