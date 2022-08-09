import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrls, deleteUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    getUrls()
    .then(data => {
      this.setState({urls: data.urls})
    })
  }

  addNewUrl = (newUrl) => {
    postUrls(newUrl)
    .then(data => {
      this.setState({urls: [...this.state.urls, data]})
    })
  }

  deleteUrl = (id) => {
    deleteUrl(id)
    .then(response => {
      if(response.ok){
        const filteredUrls = this.state.urls.filter(url => url.id !== id);
        this.setState({urls: filteredUrls})
      }
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1 className='page-title'>URL Shortener</h1>
          <UrlForm addUrl={this.addNewUrl}/>
        </header>
        <UrlContainer urls={this.state.urls} delete={this.deleteUrl}/>
      </main>
    );
  }
}

export default App;
