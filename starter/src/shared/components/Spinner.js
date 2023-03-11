import './Spinner.css'
import ReactDom from 'react-dom'
const SpinnerContainer = () => {
    return <div className="spinner-container"><div className="loading-spinner"></div></div>;
};
const Spinner = () => { 
        return (
            <>
                {ReactDom.createPortal(<SpinnerContainer />, document.getElementById('spinner'))}
            </>
            
    )
}

export default Spinner;