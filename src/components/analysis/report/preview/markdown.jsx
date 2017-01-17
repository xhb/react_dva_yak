import React, { Component, PropTypes } from 'react';
import Remarkable from 'remarkable';
import _ from "underscore";

//功能：提供markdown语法浏览的组件
class MarkdownViewer extends Component {

  constructor(props){
    super(props);
  }

  render(){
    let md = new Remarkable({
      html:         true,        // Enable HTML tags in source
      xhtmlOut:     true,        // Use '/' to close single tags (<br />)
      breaks:       true,        // Convert '\n' in paragraphs into <br>
      typographer:  true,
    });
    let markdown = md.render(this.props.source);
    let markdownHtml = {__html: markdown}
    return <div dangerouslySetInnerHTML={markdownHtml} />;
  }
}

MarkdownViewer.PropTypes = {
  //markdown语法原始输入
  source: PropTypes.string
}

export default MarkdownViewer;
