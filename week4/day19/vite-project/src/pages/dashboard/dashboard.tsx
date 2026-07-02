import { tasks } from "../untils/data"
import { List } from "../components/list"

export const Dashboard = () =>{

    return(

        <List items={tasks}></List>

    )


}