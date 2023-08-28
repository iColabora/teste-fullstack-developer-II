import {Link} from 'react-router-dom';
import Tracking from "../../components/Tracking/Tracking";

function Home () {
    return (
        <>
            <div className="container">
                <h1>iColabora - Desafio 2</h1>
                <hr />
                <Tracking/>
            </div>

            <div className="container">
                <Link to="/formularios">Formulários</Link>
            </div>
        </>
    )
}

export default Home;