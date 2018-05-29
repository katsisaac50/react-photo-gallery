import React from 'react';
import Gallery, { Photo } from 'react-photo-gallery';

const ExampleBasic = ({photos, columns}) => {
    return (
      <div>
        <h2>Basic</h2>
        <Gallery photos={photos} columns={columns}>
          {image => (
            <Photo image={image} />
          )}
        </Gallery>
      </div>
    );
}

export default ExampleBasic;
