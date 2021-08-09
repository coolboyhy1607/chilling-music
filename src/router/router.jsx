import {Switch, Route } from "react-router-dom";
import { routerSetting } from "./routerSetting";

export const Router=()=>{
    return(

        <Switch>
            {routerSetting.map((router)=>(
                <Route
                key={router.path}
                exact={router.exact}
                path={router.path}
                >
                    {router.children}
                </Route>
            ))}
        </Switch>
    )
}