import './App.css';
import {Container} from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer';
import DataTable from './DataTable';

function App() {
    return (
		<>
			<Header/>
			<main>
				<Container>
					<p> </p>
					<DataTable/>
				</Container>
			</main>
			<Footer/>
		</>
    );
}

export default App;
