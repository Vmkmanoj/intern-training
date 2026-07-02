import { createContext ,useContext , useState , type ReactNode } from "react";


interface UserContextType{
    name : string,
    setName : React.Dispatch<React.SetStateAction<string>>,
    city : string,
    setCity : React.Dispatch<React.SetStateAction<string>>,
    counter : number,
    setCounter : React.Dispatch<React.SetStateAction<number>>,
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children : ReactNode;
}

export function UserProvider({children} : UserProviderProps){
    
    const [name,setName] = useState<string>("")
    const [city,setCity] = useState<string>("")
    const [counter,setCounter] =useState<number>(0)
    
    return(
        <UserContext.Provider value={{name,setName , city, setCity , setCounter,counter }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}