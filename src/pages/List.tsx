import { useQuery } from "@tanstack/react-query";

const List = () => {
  const GET_ALL_GRANDMASTERS = "titled/GM";

  const query = useQuery<{ players: string[] }>({
    queryKey: [GET_ALL_GRANDMASTERS],
  });

  return <>{query?.data?.players}</>;
};

export default List;
