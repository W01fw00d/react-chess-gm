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
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
