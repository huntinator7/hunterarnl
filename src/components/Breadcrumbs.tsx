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
    <div className="flex flex-row flex-wrap items-center bg-neutral-100 text-black px-4 py-2">
      {routes.map((r, index) => (
        <Fragment key={r.to}>
          {nav.pathname === r.to ? (
            <span className="text-3xl">{r.text}</span>
          ) : (
            <Link to={r.to} className="text-3xl">
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
