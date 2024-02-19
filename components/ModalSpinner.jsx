import "@styles/modal-spinner.css"

const ModalSpinner = ({ isLoading }) => {
    if (!isLoading) return null;
  
    return (
      <div className="spinner-modal flex flex-col">
        <div className="spinner"></div>
        <span className="bg-stone-200 font-bold  mt-2" >
          Will redirect <br/> when finished uploading...
        </span>
      </div>
    );
};
  
  export default ModalSpinner;