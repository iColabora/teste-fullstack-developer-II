import {Link} from 'react-router-dom';
import Home from '../../pages/Home/Home';

export default function Tracking({track = []}){
    return (
        <div className="tracking-container">
            <div className="tracking-item">
                <Link className="tracking-item" to="/">Início</Link>
            </div>
            {
                track.map((node, index) => (
                    <div className="tracking-item" key={index}>
                        &gt;
                        <Link className="tracking-item" to={node.to}>{node.label}</Link>
                    </div>
                ))
            }
        </div>
    );
}