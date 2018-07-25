import React, { Component } from 'react';

class AsyncLoadComponet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      com: null,
    };
  }

  componentDidMount() {
    const { loadComponent } = this.props;
    loadComponent.then((about) => {
      this.setState({
        com: about.default,
      });
    }).catch((err) => {
      throw err;
    });
  }

  render() {
    const { render } = this.props;
    const { com } = this.state;
    return (
      <div>
        {render({ com, props: this.props })}
      </div>
    );
  }
}

export default AsyncLoadComponet;
