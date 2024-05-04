import { Link, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  /* const GET_ALL_GRANDMASTERS = "titled/GM";

  const query = useQuery<{ players: string[] }>({
    queryKey: [GET_ALL_GRANDMASTERS],
  }); */

  const { username } = useParams();

  return (
    <div>
      <div>{username}</div>
      <br />
      <Link to={{ pathname: "/" }}>Go back to list</Link>
    </div>
  );
};

export default Profile;
