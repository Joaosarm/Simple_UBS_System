import {createContext} from "react" ;

export type UserData = {
    username: string
    department: number
    setUsername:(c: string) => void
    setDepartment:(c: number) => void
  }

export const UserContext = createContext<UserData>({
    username: "",
    department: 0,
    setUsername: () => {},
    setDepartment: () => {}
});