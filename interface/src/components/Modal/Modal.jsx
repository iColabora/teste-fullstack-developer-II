export default function Modal ({isOpen = false, children}){
    if(isOpen){
        return (
            <div className="modal-backgroud">
                <div className="modal-container">
                    {children}
                </div>
            </div>
        );
    } else {
        return null;
    }
}