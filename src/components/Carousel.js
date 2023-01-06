import '../styles/Carousel.css';
import React from 'react';

function Carousel({ images }) {
    const [currentImage, setCurrentImage] = React.useState(0)

    React.useEffect(() => {
        if (currentImage < 0) {
            setCurrentImage(images.length - 1)
        } else if (currentImage > images.length - 1) {
            setCurrentImage(0)
        } 
    }, [currentImage]);

    return (
        <div className="carouselContainer">
            {images[currentImage] === undefined ? 
                <div className="no_thumbnail"></div>
                :
                <img className="thumbnail" src={images[currentImage]} alt={images[currentImage].name}></img>
            }
            <div className="btn_prev" onClick={() => setCurrentImage(currentImage - 1)}>prev</div>
            <div className="btn_next" onClick={() => setCurrentImage(currentImage + 1)}>next</div>
        </div>
    )
}

export default Carousel;