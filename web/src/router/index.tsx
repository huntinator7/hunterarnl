import { Route, Router } from "@solidjs/router";
import routes from "@/router/routes";
import { Container } from "@/views/Container";

export default (
  <Router>
    <Route path="/" component={Container}>
      {...routes}
    </Route>
  </Router>
);
