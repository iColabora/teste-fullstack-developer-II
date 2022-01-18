import { FaTextHeight, FaTextWidth, FaEquals } from 'react-icons/fa';


export default function Selector({ handleAddField }) {
    return (
        <div id="selector" className="flex center">
            <p>Tipos de campos</p>
            <div className="selector-types">
                <div className="selector-type">
                    <div className="selector-type-overlay" onClick={() => handleAddField("text")} ></div>
                    <FaTextHeight />
                    <p>Texto simples</p>
                </div>
                <div className="selector-type">
                <div className="selector-type-overlay" onClick={() => handleAddField("textarea")} ></div>
                    <FaTextWidth />
                    <p>Tento grande</p>
                </div>
                <div className="selector-type">
                <div className="selector-type-overlay" onClick={() => handleAddField("combo")} ></div>
                    <FaEquals />
                    <p>Combo box</p>
                </div>
            </div>
        </div>
    )
}