import '../styles/Modal.css';
import React from 'react';
import Carousel from './Carousel';

function Modal({ isShowing, hide, carInfos }) {
    return (
        <div className={"modalContainer " + (isShowing ? 'opened' : 'closed')}>
            <div className="hide_btn" onClick={hide}>Back to homepage</div>

            <div className="infos" key={carInfos.id}>
                <div className="thumbnailContainer">
                    <Carousel
                        images={[carInfos.url_picture, carInfos.url_picture2]} 
                    />
                </div>
                <div className="infosContainer">
                    <span className="date">Posted on {new Date(carInfos.modified).toLocaleDateString("fr-BE")}</span>
                    <p className="description">Reference : {carInfos.id}</p>
                    <p className="description">Category : {carInfos.category_id}</p>
                    <h3 className="name">{carInfos.name} - {carInfos.model}</h3>
                    <ul>
                        <li>{carInfos.KM}km</li>
                        <li>{carInfos.fuel}</li>
                        <li>{carInfos.Year}</li>
                    </ul>
                    <p className="description">{carInfos.description}</p>
                    <div className="priceContainer">
                        <p>Achetez pour <span>{carInfos.price}</span></p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Modal;