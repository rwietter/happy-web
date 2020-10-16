import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Spinner } from '../Spinner';

const Landing = lazy(() => import(`../../domain/Landing`));
const Orphanage = lazy(() => import(`../../domain/Orphanage`));
const OrphanageMap = lazy(() => import(`../../domain/OrphanageMap/index`));
const CreateOrphanage = lazy(() => import(`../../domain/CreateOrphanage/index`));

const Routes = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Spinner />}>
				<Switch>
					<Route path="/" exact component={Landing} />
					<Route path="/app" component={OrphanageMap} />
					<Route path="/orphanages/create" component={CreateOrphanage} />
					<Route path="/orphanages/:id" component={Orphanage} />
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
};

export { Routes };
