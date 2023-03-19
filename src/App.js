import React, { useEffect, useState } from 'react';

import './App.css';
import photos from './fakeData/photos';
import LazyLoading from './shared/LazyLoading';
import ImageFullView from './components/ImageFullView';

let limitedPhotos = photos.slice(0, 5);

export default function App() {
    // Component states
    const [size, setSize] = useState('thumb');
    const [selected, setSelected] = useState(null);
    const [sliceStart, setSliceStart] = useState(0);
    const [slicedPhotos, setSlicedPhotos] = useState(limitedPhotos);
    const [showFullImg, setShowFullImg] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);

    // Component variables
    const limit = 5;
    const target = document.querySelector('#img-container');
    const options = {
        threshold: 1,
    };

    useEffect(() => {
        if (sliceStart > 0) {
            const startIndex = sliceStart;
            const endIndex =
                sliceStart + limit > photos.length
                    ? photos.length
                    : sliceStart + limit;
            const data = photos.slice(startIndex, endIndex);
            setSlicedPhotos((prevState) => [...prevState, ...data]);
        }
    }, [sliceStart]);

    const openImageInFullView = (selectedIndex, image) => {
        setShowFullImg(true);
        setSelected(selectedIndex);
        document.body.style.overflowY = 'hidden';
    };

    function plusSlides(next) {
        let nextIndex = next;
        if (next > photos.length - 1) {
            nextIndex = 0;
        }

        if (next < 0) {
            nextIndex = photos.length - 1;
        }
        setImgLoaded(false);
        setSelected(nextIndex);
    }

    const closeFullImageView = () => {
        setShowFullImg(false);
        setImgLoaded(false);
        document.body.style.overflowY = 'scroll';
    };

    useEffect(() => {
        setSelected(0);
    }, []);

    return (
        <div className="app">
            <div className="app-inner">
                <h1 className="title">
                    Photos courtesy of Unsplash and it's users
                </h1>
                <div className="container photo-inner-container">
                    {slicedPhotos.length > 0 && (
                        <LazyLoading
                            target={target}
                            callback={() => {
                                if (sliceStart < photos.length) {
                                    setSliceStart(() => sliceStart + 5);
                                }
                            }}
                            options={options}
                        >
                            {slicedPhotos.map((p, index) => (
                                <div
                                    className="display-flex card-img"
                                    id={
                                        index === slicedPhotos.length - 1
                                            ? 'img-container'
                                            : null
                                    }
                                    key={p.id}
                                >
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            openImageInFullView(index, p);
                                        }}
                                    >
                                        <img
                                            src={p.urls[size]}
                                            alt={`Taken by ${p.user.name}`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </LazyLoading>
                    )}
                </div>
                {showFullImg && (
                    <ImageFullView
                        openModal={showFullImg}
                        selected={selected}
                        closeModal={closeFullImageView}
                        goNextOrPrev={plusSlides}
                        imgLoaded={imgLoaded}
                        setImgLoaded={setImgLoaded}
                    />
                )}
            </div>
        </div>
    );
}
