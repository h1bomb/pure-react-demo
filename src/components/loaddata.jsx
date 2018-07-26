import { Component } from 'react';

class LoadData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    const { url } = this.props;
    if (!url) {
      throw new Error('url must set some value!');
    }
    fetch(url).then(res => res.json()).then((data) => {
      this.setState({
        data,
        isLoading: false,
      });
    });
  }

  render() {
    const { data, isLoading } = this.state;
    const { children } = this.props;
    return (children(data, isLoading));
  }
}

export default LoadData;
