import React from 'react';
import Gallery, { Photo } from 'react-photo-gallery';

const ExampleBasic = ({photos, columns}) => {
    return (
      <div>
        <h2>Basic</h2>
        <Gallery images={photos} columns={columns}>
          {props => (
            <Photo {...props} />
          )}
        </Gallery>
      </div>
    );
}

export default ExampleBasic;
