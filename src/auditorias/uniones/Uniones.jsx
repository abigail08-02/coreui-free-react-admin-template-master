import { Route, Switch } from 'react-router-dom';
import UnionesTable from './UnionesTable';
import AddEdditUnion from './AddEditUnion';

const Uniones = ()=> {

    return (
        <Switch>
            <Route exact path="/uniones">
                <UnionesTable></UnionesTable>
            </Route>
            <Route path="/uniones/add">
                <AddEdditUnion></AddEdditUnion>
            </Route>
            <Route path="/uniones/edit/:id">
                <AddEdditUnion></AddEdditUnion>
            </Route>
        </Switch>
    )

}

export default Uniones