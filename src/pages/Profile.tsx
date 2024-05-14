import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useClock from "../hooks/useClock";
import { Player } from "../types/Player";

import pageStyles from "./Page.module.css";
import profileStyles from "./Profile.module.css";

const ExternalLink = ({ url, label }: { url: string; label?: string }) => (
  <a href={url}>{label || url}</a>
);

const Profile = () => {
  const { username } = useParams();

  const query = useQuery<Player>({
    queryKey: [`player/${username}`],
    // refetchInterval: 1000, // Refetch every second
  });

  const { data, isLoading } = query;

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

  if (isLoading || !data) {
    return <div className={pageStyles.page}>Loading...</div>;
  }

  return (
    <div className={pageStyles.page}>
      <div className={profileStyles.userInfo}>
        {data.avatar && (
          <div>
            <img src={data.avatar} alt={`${data.username}'s Avatar`} />
          </div>
        )}
        <div>
          <div>
            👤 User: <ExternalLink url={data.url} label={data.username} />
          </div>
          {data.name && <div>✍ Name: {data.name}</div>}
          <div>
            🌍 Location:{" "}
            <ExternalLink url={data.country} label={data.location} />
          </div>
        </div>
      </div>
      <div className={profileStyles.container}>
        <div className={profileStyles.item}>
          <div>🚩 Joined in: {joinedInDate.toLocaleDateString()}</div>
          {timeSincelastOnline && (
            <div>
              <b>⏳ Last online: {timeSincelastOnline}</b>
            </div>
          )}
          <div>🏅 League: {data.league}</div>
          {data.title && <div>📋 Title: {data.title}</div>}
          {data.fide && <div>🎖 FIDE rating: {data.fide}</div>}
        </div>

        <div className={profileStyles.item}>
          <div>👥 Followers: {data.followers}</div>
          <div>🎤 Is streamer? {data.is_streamer ? "Yes" : "No"} </div>
          {data.streaming_platforms?.length > 0 && (
            <div>
              📃 Streaming Platforms:
              {data.streaming_platforms.map((platform) => (
                <div>{platform}</div>
              ))}
            </div>
          )}
          {data.twitch_url && (
            <div>
              💻 Twitch Url: <ExternalLink url={data.twitch_url} />
            </div>
          )}
        </div>

        <div className={profileStyles.item}>
          <div>📃 ID: {data.player_id}</div>
          <div>⭐ Status: {data.status}</div>
          <div>🔒 Is verified? {data.verified ? "Yes" : "No"} </div>
        </div>
      </div>

      <Link to={{ pathname: "/" }}>
        <b>↩ Go back to list</b>
      </Link>
    </div>
  );
};

export default Profile;
