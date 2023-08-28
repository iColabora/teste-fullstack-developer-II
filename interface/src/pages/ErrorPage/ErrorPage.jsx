import { Link } from "react-router-dom";

function ErrorPage () {
    return (
        <div className="fullscreem-backgroud">
            <div className="fullscreem-centralized">
                <h1>Oops...</h1>
                <p>A página que você está tentando acessar não existe.</p>
                <Link to="/">Voltar ao início</Link>
            </div>
        </div>
    )
}

export default ErrorPage;