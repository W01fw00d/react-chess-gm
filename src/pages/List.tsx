import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import pageStyles from "./Page.module.css";
import listStyles from "./List.module.css";

const List = () => {
  const GET_ALL_GRANDMASTERS = "titled/GM";

  const query = useQuery<{ players: string[] }>({
    queryKey: [GET_ALL_GRANDMASTERS],
  });

  const { data, isLoading } = query;

  return (
    <div className={`${pageStyles.page} ${listStyles.container}`}>
      <h1>♟ GRANDMASTERS</h1>
      <br />
      <ul>
        {isLoading || !data ? (
          <div className={pageStyles.page}>Loading...</div>
        ) : (
          data.players.map((name) => (
            <li key={name}>
              <Link to={{ pathname: `profile/${name}` }}>{name}</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default List;
