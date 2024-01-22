import "@styles/modal-spinner.css"

const ModalSpinner = ({ isLoading }) => {
    if (!isLoading) return null;
  
    return (
      <div className="spinner-modal">
        <div className="spinner"></div>
      </div>
    );
};
  
  export default ModalSpinner;