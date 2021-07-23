import { Route, Switch } from "react-router-dom";

import { Home } from "../pages/home";
import { CreateReview } from "../pages/createReview";
import { Review } from "../pages/review";
import { EditReview } from "../pages/editReview";

export function Routes() {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/review/new" component={CreateReview} />
      <Route exact path="/review/:id" component={Review} />
      <Route exact path="/review/:id/edit" component={EditReview} />
    </Switch>
  );
}
