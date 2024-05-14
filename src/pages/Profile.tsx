import { Link, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { timeDifference } from "../utils/date";

enum Status {
  closed,
  "closed:fair_play_violations",
  basic,
  premium,
  mod,
  staff,
}

// Based on https://www.chess.com/news/view/published-data-api#pubapi-endpoint-games-archive
type Response = {
  "@id": string; // Do not display, doesn't seem like an url a end-user should see
  url: string;
  username: string;
  player_id: number;
  title?: string; // Optional
  status: Status;
  name?: string; // Optional
  avatar?: string; // Optional
  location?: string; // Optional
  country: string;
  joined: number; // timestamp
  last_online: number; // timestamp
  followers: number;
  is_streamer: boolean;
  twitch_url: string;
  fide: number;

  // Docs doesn't seem to be updated, they don't include some extra fields that sometimes are on the response:
  league: string;
  streaming_platforms: string[];
  verified: boolean;
};

const ExternalLink = ({ url }: { url: string }) => <a href={url}>{url}</a>;

const Profile = () => {
  const { username } = useParams();

  const query = useQuery<Response>({
    queryKey: [`player/${username}`],
  });

  const { data } = query;

  const joinedInDate = new Date(0);
  joinedInDate.setUTCSeconds(data?.joined || 0);

  const lastOnlineDate = new Date(0);
  lastOnlineDate.setUTCSeconds(data?.last_online || 0);

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
          <div>
            <b>
              Time since user was last online: {timeDifference(lastOnlineDate)}
            </b>
          </div>
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
