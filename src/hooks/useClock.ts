import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Player } from "../types/Player";
import { timeDifference } from "../utils/date";

const useClock = () => {
  const { username } = useParams();

  const [timeSincelastOnline, setTimeSincelastOnline] = useState<
    string | null
  >();

  /*
  @tanstack/react-query caches the data returned by the endpoint,
  that's why we access the query results here again
  instead of just "reusing" the `query.data` from `Profile.tsx` Page
  */
  const query = useQuery<Player>({
    queryKey: [`player/${username}`],
    // refetchInterval: 1000, // Refetch every second
  });

  const { data } = query;
  const lastOnline = data?.last_online;

  useEffect(() => {
    const updateClock = () => {
      if (lastOnline) {
        const lastOnlineDate = new Date(0);
        lastOnlineDate.setUTCSeconds(lastOnline || 0);
        setTimeSincelastOnline(timeDifference(lastOnlineDate));
      }
    };

    setInterval(updateClock, 1000); // Update it every second
    // updateClock(); // Update it once
  }, [lastOnline]);

  return { timeSincelastOnline };
};

export default useClock;
