import React from 'react';

export interface Disqus extends React.Component {
  config: {
    identifier: string;
    title: string;
    url?: string;
    language?: string;
    remoteAuthS3?: string;
    apiKey?: string;
  };
}

export interface CommentCount {
  config: {
    identifier: string;
    title: string;
    url?: string;
  };
  placeholder?: string;
}

export interface CommentEmbed {
  commentId: string;
  width?: number;
  height?: number;
  showMedia?: boolean;
  showParentComment?: boolean;
}
