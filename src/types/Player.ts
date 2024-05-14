enum Status {
  closed,
  "closed:fair_play_violations",
  basic,
  premium,
  mod,
  staff,
}

// Based on https://www.chess.com/news/view/published-data-api#pubapi-endpoint-games-archive
export type Player = {
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
