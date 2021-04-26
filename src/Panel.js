import React from "react";
import { useRouteMatch, Route, Switch, useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import Assets from "./Assets";
import CreateNewRelease from "./CreateNewRelease";
import ArtistTab from "./ArtistTab";
import AddNewArtist from "./AddNewArtist";
import Labels from "./Labels";
import AddLabel from "./AddLabel";
import Transactions from "./Transactions";
import Account from "./Account";
import Dispute from "./Dispute";
import CreateNewDispute from "./CreateNewDispute";
import Viewalbum from "./Viewalbum";

function Panel() {
  let { path } = useRouteMatch();
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className=" w-full overflow-y-auto">
        <Switch>
          <Route path={`${path}/assets`}>
            <Assets />
          </Route>
          <Route path={`${path}/viewAlbum/:id`}>
            <Viewalbum />
          </Route>
          <Route path={`${path}/create_new_release`}>
            <CreateNewRelease />
          </Route>
          <Route path={`${path}/create_new_dispute`}>
            <CreateNewDispute />
          </Route>
          <Route path={`${path}/artist`}>
            <ArtistTab />
          </Route>
          <Route path={`${path}/view_artist/:id`}>
            <AddNewArtist />
          </Route>
          <Route path={`${path}/labels`}>
            <Labels />
          </Route>
          <Route path={`${path}/view_labels/:id`}>
            <AddLabel />
          </Route>
          <Route path={`${path}/add_label`}>
            <AddLabel />
          </Route>
          <Route path={`${path}/add_new_artist`}>
            <AddNewArtist />
          </Route>
          <Route path={`${path}/transactions`}>
            <Transactions />
          </Route>
          <Route path={`${path}/dispute`}>
            <Dispute />
          </Route>
          <Route path={`${path}/account`}>
            <Account />
          </Route>
          <Route path={`${path}/dashboard`}>
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Panel;
