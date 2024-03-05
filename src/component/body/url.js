import React from 'react';
import ChildComponent from './ChildComponent';

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://localhost:7266',
    };
  }

  render() {
    return <ChildComponent url={this.state.url} />;
  }
}

export default ParentComponent;