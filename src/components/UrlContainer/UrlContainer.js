import React from 'react';
import './UrlContainer.css';

const UrlContainer = props => {
  const urlEls = props.urls.map(url => {
    return (
      <div className="url" key={url.id}>
        <h3 className='url-title'>{url.title}</h3>
        <a className='url-short-link' href={url.short_url} target="blank">{url.short_url}</a>
        <p className='url-long-link'>{url.long_url}</p>
        <button className='delete-button' onClick={() => {props.delete(url.id)}}>Delete</button>
      </div>
    )
  });

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
