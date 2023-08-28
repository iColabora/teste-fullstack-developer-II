import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tracking from "../components/Tracking/Tracking";

function TemplatePage (props = null) {
    var page = {
        title: "...",
        tracking: []
    }

    if(props){
        page = {
            name: props.name,
            title: props.title,
            tracking: props.tracking,
        }
    }

    document.title = page.title + " | iColabora - Desafio 2 (Por Layon Endlich Rodrigues)";

    return (
        <>
            <ToastContainer />
            
            <div className="container">
                <h1>{page.title}</h1>
                <hr />
                <Tracking track={page.tracking}/>
            </div>

            {props.children}
        </>
    );
}

export default TemplatePage;