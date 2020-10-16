import './styles.css';

import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/Logo.svg';


const Landing = () => {
	return (
		<div id="page-landing">
			<div className="content-wrapper">
				<img src={Logo} alt="Happy logotipo" />
				<main>
					<h1>Leve felicidade para o mundo</h1>
					<p>Visite orfanatos e mude o dia de muitas crianças.</p>
				</main>
				<div className="location">
					<strong>Porto Alegre</strong>
					<span>Rio Grande do Sul</span>
				</div>
				<Link to="/app" className="enter-app">
					<FiArrowRight size={26} />
				</Link>
			</div>
		</div>
	);
};

export default Landing;
