import React from 'react';

type DisqusConfig = {
  url?: string;
  identifier?: string;
  title?: string;
}

type DisqusEmbedProps = {
  config?: DisqusConfig & {
    language?: string;
    remoteAuthS3?: string;
    apiKey?: string;
  };
};

type CommentCountProps = {
  config?: DisqusConfig;
  className?: string;
  placeholder?: string;
}

type CommentEmbedProps = {
  commentId: string;
  showParentComment?: boolean;
  showMedia?: boolean;
  width?: number;
  height?: number;
}

declare class CommentCount extends React.Component<CommentCountProps, {}> {}
declare class CommentEmbed extends React.Component<CommentEmbedProps, {}> {}
declare class Disqus extends React.Component<DisqusEmbedProps, {}> {}

declare const Disqus: {
  CommentCount: React.ComponentType<CommentCountProps>;
  CommentEmbed: React.ComponentType<CommentEmbedProps>;
  Disqus: React.ComponentType<DisqusEmbedProps>;
}

export { CommentCount, CommentEmbed, Disqus };
export default Disqus;
