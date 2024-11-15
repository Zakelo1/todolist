type LocalStorageCopy = { [key: string]: string };

function copyLocalStorage(): void {
    const copy: LocalStorageCopy = {};
    
  
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== null) {
            const value = localStorage.getItem(key);
            if (value !== null) {
                copy[key] = value;
            }
        }
    }


    localStorage.setItem('localStorageCopy', JSON.stringify(copy));
}

function getLocalStorageCopy(): LocalStorageCopy | null {

    const copy = localStorage.getItem('localStorageCopy');
    return copy ? JSON.parse(copy) : null;
}

copyLocalStorage();

const copiedData = getLocalStorageCopy();
console.log(copiedData); 
export default LocalStorageCopy;

