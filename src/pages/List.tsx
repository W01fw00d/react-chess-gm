import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const List = () => {
  const GET_ALL_GRANDMASTERS = "titled/GM";

  const query = useQuery<{ players: string[] }>({
    queryKey: [GET_ALL_GRANDMASTERS],
  });

  return (
    <div>
      <h1>Names List</h1>
      <ul>
        {query?.data?.players.map((name) => (
          <li key={name}>
            <Link to={{ pathname: `profile/${name}` }}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
