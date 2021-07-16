import React, {useEffect} from 'react';
import Event from "./containers/Event";

import './App.scss';
import {Redirect, Route, Switch} from 'react-router';
import {lazyLoad} from "./utils";
import Yaro from "./landings/Yaro";
import Veres from "./landings/Veres";
import GNP from "./landings/GNP";

function App() {
    useEffect(() => {

    }, [window.location.host]);

    return (
        <>
            <div className='App'>
                <main className='Main'>
                    <Switch>
                        {
                            window.location.host === 'https://yaro.bea-ambrosus.io' &&
                            (<Route exact path='/'>
                                <Yaro
                                    assetIdProp={'0x649ba9ddc96e34321131d1a829b654eabf634bbfab2eb7532ff219e3a96751ed'}
                                    hermesIdProp={'https://hermes-bea2.bea-ambrosus.io'}/>
                            </Route>)
                        } {
                            window.location.host === 'localhost:3000' &&
                            (<Route exact path='/'>
                                <Yaro
                                    assetIdProp={'0x649ba9ddc96e34321131d1a829b654eabf634bbfab2eb7532ff219e3a96751ed'}
                                    hermesIdProp={'https://hermes-bea2.bea-ambrosus.io'}/>
                            </Route>)
                        }
                        {
                            window.location.host === 'https://veres.bea-ambrosus.io' &&
                            (<Route exact path='/'>
                                <Veres
                                    assetIdProp={'0x65f4a8bf0a6b964b9bc32d3a926b3e5edbc218c29bf71fed8fb246fc6ebba449'}
                                    hermesIdProp={'https://hermes-bea0.bea-ambrosus.io'}/>
                            </Route>)
                        }
                        {
                            window.location.host === 'https://gnp.bea-ambrosus.io' &&
                            (<Route exact path='/'>
                                <GNP
                                    assetIdProp={'0x4efe2723f33387eede1b03cda4b410417cd3c15e88e8125047271489597711e5'}
                                    hermesIdProp={'https://hermes-bea1.bea-ambrosus.io'}/>
                            </Route>)
                        }
                        <Route exact path='/events/:eventId' render={lazyLoad(Event)}/>
                        <Redirect to={"/"}/>
                    </Switch>
                </main>
            </div>
        </>
    );
}

export default App;
