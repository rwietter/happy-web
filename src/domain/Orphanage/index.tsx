import './styles.css';

import React, { useEffect, useState } from 'react';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import { Sidebar } from '../../components/Sidebar';
import { Spinner } from '../../components/Spinner';
import { api } from '../../services/API';
import { happyMapIcon } from '../../utils/MapIcon';

interface IOrphanage {
	id: number;
	latitude: number;
	longitude: number;
	name: string;
	about: string;
	instructions: string;
	open_on_wekends: boolean;
	opening_hours: string;
	images: Array<{
		url: string;
		id: number;
	}>;
}

interface IRouteParams {
	id: string;
}

const Orphanage = () => {
	const [orphanage, setOrphanage] = useState<IOrphanage>();
	const [activeImageIdx, setActiveImageIdx] = useState(0);

	const { id } = useParams<IRouteParams>();

	useEffect(() => {
		(async function getDataFromOrphanage() {
			const { data } = await api.get(`orphanages/${id}`);
			setOrphanage(data);
		})();
	}, [id]);

	if (!orphanage) return <Spinner />;

	return (
		<div className="page-orphanage">
			<Sidebar />
			<main>
				<div className="orphanage-details">
					<img
						src={orphanage.images[activeImageIdx].url}
						alt={orphanage.name}
					/>

					<div className="images">
						{orphanage.images.map(({ url, id }, idx) => {
							return (
								<button
									key={id}
									className={
										activeImageIdx === idx ? 'active' : ''
									}
									type="button"
									onClick={() => setActiveImageIdx(idx)}
								>
									<img src={url} alt={orphanage.name} />
								</button>
							);
						})}
					</div>

					<div className="orphanage-details-content">
						<h1>{orphanage.name}</h1>
						<p>{orphanage.about}</p>

						<div className="map-container">
							<Map
								center={[
									orphanage.latitude,
									orphanage.longitude,
								]}
								zoom={16}
								style={{ width: `100%`, height: 280 }}
								dragging={false}
								touchZoom={false}
								zoomControl={false}
								scrollWheelZoom={false}
								doubleClickZoom={false}
							>
								<TileLayer
									url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
								/>
								<Marker
									interactive={false}
									icon={happyMapIcon}
									position={[
										orphanage.latitude,
										orphanage.longitude,
									]}
								/>
							</Map>

							<footer>
								<a
									rel="noopner noreferrer"
									target="_blank"
									href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
								>
									Ver rotas no Google Maps
								</a>
							</footer>
						</div>

						<hr />

						<h2>Instruções para visita</h2>
						<p>{orphanage.instructions}</p>

						<div className="open-details">
							<div className="hour">
								<FiClock size={32} color="#15B6D6" />
								{orphanage.opening_hours}
							</div>
							{orphanage.open_on_wekends ? (
								<div className="open-on-weekends">
									<FiInfo size={32} color="#39CC83" />
									Atendemos <br />
									fim de semana
								</div>
							) : (
								<div className="open-on-weekends dont-open">
									<FiInfo size={32} color="#ff669d" />
									Não atendemos <br />
									fim de semana
								</div>
							)}
						</div>

						{/* <button type="button" className="contact-button">
							<FaWhatsapp size={20} color="#FFF" />
							Entrar em contato
						</button> */}
					</div>
				</div>
			</main>
		</div>
	);
};

export default Orphanage;
