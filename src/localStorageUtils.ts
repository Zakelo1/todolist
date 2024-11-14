export interface UserData {
    userId: string;
    username: string;
    tasks: string[];
  }
  
  export const saveUserDataToLocalStorage = (data: UserData) => {
    localStorage.setItem('userData', JSON.stringify(data));
  };
  
  export const getUserDataFromLocalStorage = (userId: string): UserData | null => {
    const data = localStorage.getItem('userData');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };
  
  
export const getTasksFromLocalStorage = (): string[] => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  };
  

  export const saveTasksToLocalStorage = (tasks: string[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  
  