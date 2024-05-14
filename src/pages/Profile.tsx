import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useClock from "../hooks/useClock";
import { Player } from "../types/Player";

const ExternalLink = ({ url }: { url: string }) => <a href={url}>{url}</a>;

const Profile = () => {
  const { username } = useParams();

  const query = useQuery<Player>({
    queryKey: [`player/${username}`],
    // refetchInterval: 1000, // Refetch every second
  });

  const { data } = query;

  const joinedInDate = new Date(0);
  joinedInDate.setUTCSeconds(data?.joined || 0);

  /*
  [Note]
  I assume Step 3 "...it should update every second." means
  just updating the current exact time minus the last response result.
  I understand it doesn't mean doing a request every second
  to get the most updated `data.last_online` possible.

  This second requirement could be accomplished by refetching every second,
  but it would be quite expensive in performance.

  Best solution would to use WebSockets to achieve that,
  which would involve implementing a WebSocket server:
  https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
  */
  const { timeSincelastOnline } = useClock();

  return (
    <div>
      {data && (
        <div>
          {data.avatar && (
            <img src={data.avatar} alt={`${data.username}'s Avatar`} />
          )}
          <div>Username: {data.username}</div>
          {data.name && <div>Full name: {data.name}</div>}
          <div>
            Url: <ExternalLink url={data.url} />
          </div>
          <br />
          {data.location && <div>Location: {data.location}</div>}
          <div>
            Country Url: <ExternalLink url={data.country} />
          </div>
          <br />
          <div>Joined in: {joinedInDate.toLocaleDateString()}</div>

          {timeSincelastOnline && (
            <div>
              <b>Time since user was last online: {timeSincelastOnline}</b>
            </div>
          )}

          <br />
          {data.title && <div>Title: {data.title}</div>}
          <div>League: {data.league}</div>
          <div>FIDE rating: {data.fide}</div>
          <br />
          <div>Followers: {data.followers}</div>
          <div>Is streamer? {data.is_streamer ? "Yes" : "No"} </div>
          {data.streaming_platforms?.length > 0 && (
            <div>
              Streaming Platforms:
              {data.streaming_platforms.map((platform) => (
                <div>{platform}</div>
              ))}
            </div>
          )}
          {data.twitch_url && (
            <div>
              Twitch Url: <ExternalLink url={data.twitch_url} />
            </div>
          )}
          <br />
          <div>ID: {data.player_id}</div>
          <div>Status: {data.status}</div>
          <div>Is verified? {data.verified ? "Yes" : "No"} </div>
        </div>
      )}

      <br />
      <br />
      <Link to={{ pathname: "/" }}>Go back to list</Link>
    </div>
  );
};

export default Profile;
