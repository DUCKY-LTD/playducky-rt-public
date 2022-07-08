import Delete from "./Delete";
import Experiment from "./Experiment/Experiment";
import Edit from "./Edit/Edit";




export default function CustomModal ({type, gameName, handleClose, editGameHandler})  {
    if (type === 'edit'){
        return (
            <Edit gameName={gameName} handleClose={handleClose} editGameHandler={editGameHandler}/>
        )
    }

    if (type === 'delete') {
        return (
            <Delete gameName={gameName} handleClose={handleClose}/>
        )
    }

    if (type === 'newExperiment') {
        return (
            <Experiment gameName={gameName} handleClose={handleClose}/>
        )
    }
}