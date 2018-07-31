import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Search from './search';
import List from './list';
import AsyncLoadComponet from '../containers/AsyncLoadComponet';

const LoadableErrorComponent = Loadable({
  loader: () => import('../components/error'),
  loading: () => (
    <div>
       Loading...
    </div>
  ),
});

const LoadErr = ({ message }) => (
  <LoadableErrorComponent message={message} />
);

class App extends Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  setValue = (val) => {
    const { searchItem } = this.props;
    searchItem(val.target.value);
  }

  render() {
    const {
      val, list, error, isLoading,
    } = this.props;
    return (
      <div>
        <LoadErr message={error} />
        <Search value={val} setValue={this.setValue} />
        <List filter={val} data={list} isLoading={isLoading} />
        <AsyncLoadComponet
          loadComponent={import('../components/about')}
          render={({ com, props }) => {
            if (!com) {
              return null;
            }
            const About = com;
            return <About {...props} />;
          }}
        />
      </div>);
  }
}
export default App;
