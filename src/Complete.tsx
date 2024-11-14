import { Menu, Home, Pen, Clock, User, Goal } from "lucide-react";
import Button from "./Button";
import { useNavigate } from 'react-router-dom'

const Complete = () =>{
const navigate = useNavigate()
    const goToPage = (path: string) => {
        navigate(path);}
        return(
    <div className="flex flex-col items-center pt-2 mb-5 mx-5 overflow-auto">
    
        <div className=" fixed flex justify-between items-center w-full">
        <div className="flex gap-4 items-center flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={()=> goToPage('/app')}>
            <Menu />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => goToPage('/')}>
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

        <div>
        
    
        </div>
    
    </div>
)
}
export default Complete;