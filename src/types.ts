export interface WebhookRequestBody {
  username?: string;
  avatar_url?: string;
  content?: string;
  embeds?: Embed[];
  allowed_mentions?: AllowedMentions;
}

export interface Embed {
  color?: number;
  author?: EmbedAuthor;
  title?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  fields?: EmbedField[];
  thumbnail?: EmbedThumbnail;
  image?: EmbedImage;
  footer?: EmbedFooter;
}

export interface EmbedAuthor {
  name?: string;
  url?: string;
  icon_url?: string;
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface EmbedThumbnail {
  url?: string;
}

export interface EmbedImage {
  url?: string;
}

export interface EmbedFooter {
  text?: string;
  icon_url?: string;
}

export interface AllowedMentions {
  parse?: ('roles' | 'users' | 'everyone')[];
  roles?: string[];
  users?: string[];
}
