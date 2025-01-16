import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, FunctionComponent } from "react";
import { Link, useLocation } from "react-router";

export interface Breadcrumb {
  to: string;
  text: string;
}

interface Props {
  routes: Breadcrumb[];
}

export const Breadcrumbs: FunctionComponent<Props> = ({ routes }) => {
  const nav = useLocation();
  return (
    <div className="flex flex-row items-center">
      {routes.map((r, index) => (
        <Fragment key={r.to}>
          {nav.pathname === r.to ? (
            <span className="text-lg">{r.text}</span>
          ) : (
            <Link to={r.to} className="text-lg">
              {r.text}
            </Link>
          )}
          {index === routes.length - 1 ? (
            <></>
          ) : (
            <FontAwesomeIcon icon={faChevronRight} className="px-2" />
          )}
        </Fragment>
      ))}
    </div>
  );
};
