import './style.css';

import React, { Component, ReactNode } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface State {
	hasError: boolean;
	error: string;
	info: string;
}
interface Props {
	render: (error: string, info: string) => ReactNode;
	fullPage?: ReactNode;
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: ``, info: `` };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: any, info: any) {
		console.log(error, info);
		this.setState({ hasError: true, error, info });
	}

	render() {
		const { children, render, fullPage } = this.props;
		if (this.state.hasError) {
			return (
				<div className={fullPage ? 'full-page' : 'intern-component'}>
					<div className="error-message">
						<FiAlertTriangle
							className="error-message-icon"
							style={{ margin: '0 20px 0 0' }}
						/>
						<h1>
							{render(this.state.error, this.state.info)}!{}
							{!fullPage && (
								<Link to="/" className="go-initial">
									Ir para o início
								</Link>
							)}
						</h1>
					</div>
				</div>
			);
		}
		return children;
	}
}

export { ErrorBoundary };
