import './styles.css';

import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';

import lacationIcon from '../../assets/images/lacation-icon.svg';
import { api } from '../../services/API';
import { happyMapIcon as markerIcon } from '../../utils/MapIcon';

const token = () => {
	const mapToken = `https://api.mapbox.com/styles/v1/mapbox/
	light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
	return mapToken;
};

interface IOrphanage {
	id: number;
	latitude: number;
	longitude: number;
	name: string;
}

const OrphanageMap = () => {
	const mapboxToken = token();

	const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

	const getOrphanagesData = () => {
		try {
			api.get(`orphanages`).then((resp) => {
				const { data } = resp;
				setOrphanages(data);
			});
		} catch (e) {
			throw new Error('An error occurred while processing the data request')
		}
	};

	useEffect(getOrphanagesData, []);

	return (
		<div id="page-orphanages">
			<aside>
				<header>
					<img src={lacationIcon} alt="location" />
					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita :)</p>
				</header>
				<footer>
					<strong>Porto Alegre</strong>
					<span>Rio Grande do Sul</span>
				</footer>
			</aside>
			<Map
				center={[-27.7529715, -53.0566417]}
				style={{ width: `100%`, height: `100%` }}
				zoom={15}
			>
				<TileLayer url={mapboxToken} />
				{orphanages.map((orphanage) => {
					const { id, name, latitude, longitude } = orphanage;
					return (
						<Marker
							key={id}
							icon={markerIcon}
							position={[latitude, longitude]}
						>
							<Popup
								className="map-poup"
								minWidth={240}
								maxWidth={240}
								closeButton={false}
							>
								<span>{name}</span>
								<Link
									className="button-popup"
									to={`/orphanages/${id}`}
								>
									<FiArrowRight size={20} />
								</Link>
							</Popup>
						</Marker>
					);
				})}
			</Map>
			<Link to="/orphanages/create" className="create-orphanage">
				<FiPlus size={26} />
			</Link>
		</div>
	);
};

export default OrphanageMap;
