import './styles.css';

import { LeafletMouseEvent } from 'leaflet';
import React, { ChangeEvent, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from 'react-router-dom';

import { ErrorBoundary } from '../../components/Error/ErrorBoundary';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/API';
import { happyMapIcon } from '../../utils/MapIcon';

interface ISyntheticEvent {
	preventDefault(): void;
	stopPropagation(): void;
}

interface IPosition {
	latitude: number;
	longitude: number;
}

const CreateOrphanage = () => {
	const [position, setPosition] = useState<IPosition>({
		latitude: 0,
		longitude: 0,
	});
	const [name, setName] = useState('');
	const [about, setAbout] = useState('');
	const [instructions, setInstructions] = useState('');
	const [opening_hours, setOpningHours] = useState('');
	const [open_on_wekends, setOpeningOnWeekends] = useState(false);
	const [images, setImages] = useState<File[]>([]);
	const [previewImages, setPreviewImages] = useState<string[]>([]);

	const [error, setError] = useState(false)

	const history = useHistory();

	const handleMapClick = (event: LeafletMouseEvent) => {
		const { lat, lng } = event.latlng;
		setPosition({
			latitude: lat,
			longitude: lng,
		});
	};

	const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;

		const { files } = event.target;

		const selectedImages = Array.from(files);
		setImages(selectedImages);

		const selectedPreviewImages = selectedImages.map((image) => {
			return URL.createObjectURL(image);
		});
		setPreviewImages(selectedPreviewImages);
	};

	const handleSubmit = async (event: ISyntheticEvent) => {
		event.preventDefault();
		event.stopPropagation();
		const { latitude, longitude } = position;
		const data = new FormData();

		data.append('name', name);
		data.append('about', about);
		data.append('instructions', instructions);
		data.append('opening_hours', opening_hours);
		data.append('latitude', String(latitude));
		data.append('longitude', String(longitude));
		data.append('open_on_wekends', String(open_on_wekends));
		images.forEach((image) => data.append('images', image));

		const response = await api.post('orphanages', data);
		console.log(response);
		history.push('/app');
	};

	return (
		<div id="page-create-orphanage">
			<Sidebar />
			<main>
				<form onSubmit={handleSubmit} className="create-orphanage-form">
					<fieldset>
						<legend>Dados</legend>
						<Map
							center={[-27.2092052, -49.6401092]}
							style={{ width: `100%`, height: 280 }}
							zoom={15}
							onClick={handleMapClick}
						>
							<TileLayer
								url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
							/>

							{position.latitude !== 0 && (
								<Marker
									interactive={false}
									icon={happyMapIcon}
									position={[
										position.latitude,
										position.longitude,
									]}
								/>
							)}
						</Map>

						<div className="input-block">
							<label htmlFor="name">Nome</label>
							<input
								id="name"
								value={name}
								onChange={({ target }) => setName(target.value)}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="about">
								Sobre <span>Máximo de 300 caracteres</span>
							</label>
							<textarea
								id="name"
								maxLength={300}
								value={about}
								onChange={({ target }) =>
									setAbout(target.value)
								}
							/>
						</div>

						<div className="input-block">
							<ErrorBoundary
								render={() =>
									'Ocorreu um erro, por favor, insira apenas arquivos em formato .jpg ou .png'
								}
							>
								<label htmlFor="images">Fotos</label>
								<div className="images-container">
									{previewImages.map((image) => {
										return (
											<img
												key={image}
												src={image}
												alt={name}
											/>
										);
									})}
									<label
										htmlFor="image[]"
										className="new-image"
									>
										<FiPlus size={24} color="#15b6d6" />
									</label>
								</div>
							</ErrorBoundary>
						</div>
						<input
							multiple
							type="file"
							className="file"
							id="image[]"
							name="image"
							onChange={handleSelectImages}
						/>
					</fieldset>

					<fieldset>
						<legend>Visitação</legend>

						<div className="input-block">
							<label htmlFor="instructions">Instruções</label>
							<textarea
								id="instructions"
								value={instructions}
								onChange={({ target }) =>
									setInstructions(target.value)
								}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="opening_hours">
								Horário de funcionamento
							</label>
							<input
								id="opening_hours"
								value={opening_hours}
								onChange={({ target }) =>
									setOpningHours(target.value)
								}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="open_on_weekends">
								Atende fim de semana
							</label>

							<div className="button-select">
								<button
									type="button"
									className={open_on_wekends ? 'active' : ''}
									onClick={() => setOpeningOnWeekends(true)}
								>
									Sim
								</button>
								<button
									type="button"
									className={!open_on_wekends ? 'active' : ''}
									onClick={() => setOpeningOnWeekends(false)}
								>
									Não
								</button>
							</div>
						</div>
					</fieldset>

					<button className="confirm-button" type="submit">
						Confirmar
					</button>
				</form>
			</main>
		</div>
	);
};

export default CreateOrphanage;
