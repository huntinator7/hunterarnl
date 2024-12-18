import { Route } from "@solidjs/router";
import Home from "@/views/Home";
import MePage from "@/views/Me/me";
import Login from "@/components/Login";
import { GarbageHistory } from "@/views/Garbage/History";
import { AuthChecker } from "@/components/AuthChecker";
import { GarbageLog } from "@/views/Garbage/Log";
import Daily from "@/views/Daily";

export default (
  <>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/me" component={AuthChecker}>
      <Route path="/" component={MePage} />
      <Route path="/daily" component={Daily} />
      <Route path="/garbage">
        <Route path="/history" component={GarbageHistory} />
        <Route path="/log" component={GarbageLog} />
      </Route>
    </Route>
  </>
);
