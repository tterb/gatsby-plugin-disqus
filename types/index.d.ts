import React from 'react';

type DisqusConfig = {
  url?: string;
  identifier?: string;
  title?: string;
};

type DisqusEmbedConfig = DisqusConfig & {
  language?: string;
  remoteAuthS3?: string;
  apiKey?: string;
};

declare module 'gatsby-plugin-disqus' {
  export interface DisqusEmbedProps {
    config?: DisqusEmbedConfig
    className?: string;
  }
  export class Disqus extends React.Component<DisqusEmbedProps, any> {}

  export interface CommentCountProps {
    config?: DisqusConfig;
    className?: string;
    placeholder?: string;
  }
  export class CommentCount extends React.Component<CommentCountProps, any> {}

  export interface CommentEmbedProps {
    commentId: string;
    showParentComment?: boolean;
    showMedia?: boolean;
    width?: number;
    height?: number;
  }
  export class CommentEmbed extends React.Component<CommentEmbedProps, any> {}
}
