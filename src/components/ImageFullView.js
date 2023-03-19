import React from 'react';

import photos from '../fakeData/photos';

const ImageFullView = (props) => {
    const {
        openModal,
        selected,
        closeModal,
        goNextOrPrev,
        imgLoaded,
        setImgLoaded,
    } = props;
    const selectedPhoto = photos[selected];
    return (
        <div
            id="fullImageModal"
            className={'modal ' + (openModal ? 'show' : 'hide')}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <button className="btn back-btn" onClick={closeModal}>
                        <span>&#8678;</span>
                        <span className="back-btn-text">Go Back</span>
                    </button>
                    <div className="photographer-info">
                        <address className="name">
                            <b>Captured by: </b>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={`https://www.instagram.com/${selectedPhoto.user.instagram_username}`}
                            >
                                {selectedPhoto.user.name}
                            </a>
                        </address>
                    </div>
                </div>
                <div className="modal-body">
                    <div className="slideshow-container">
                        {imgLoaded ? null : (
                            <div className="loader">
                                <p>Loading image, please wait...</p>
                            </div>
                        )}
                        <div
                            className="photoSlides fade"
                            style={imgLoaded ? {} : { display: 'none' }}
                        >
                            <img
                                src={selectedPhoto.urls['full']}
                                alt={`${selectedPhoto.alt_description}`}
                                onLoad={() => setImgLoaded(true)}
                            />
                            {selectedPhoto.description ? (
                                <div className="image-text">
                                    {selectedPhoto.description}
                                </div>
                            ) : null}
                        </div>

                        <button
                            className="prev"
                            onClick={() => {
                                goNextOrPrev(selected - 1);
                            }}
                        >
                            ❮
                        </button>
                        <button
                            className="next"
                            onClick={() => {
                                goNextOrPrev(selected + 1);
                            }}
                        >
                            ❯
                        </button>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="likes-follow">
                        <div className="likes">
                            <i className="fa fa-thumbs-up share"></i>
                            <b>{selectedPhoto.likes}</b>
                        </div>
                        {(selectedPhoto.user.instagram_username ||
                            selectedPhoto.user.twitter_username) && (
                            <div className="follow">
                                <b>Follow: </b>
                                {selectedPhoto.user.instagram_username && (
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={`https://www.instagram.com/${selectedPhoto.user.instagram_username}`}
                                    >
                                        <i className="fab fa-instagram-square share"></i>
                                    </a>
                                )}
                                {selectedPhoto.user.twitter_username && (
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={`https://www.twitter.com/${selectedPhoto.user.twitter_username}`}
                                    >
                                        <i className="fab fa-twitter-square share"></i>
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageFullView;
