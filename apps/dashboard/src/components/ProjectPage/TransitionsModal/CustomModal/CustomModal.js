import Delete from "./Delete";
import Experiment from "./Experiment/Experiment";
import Edit from "./Edit/Edit";




export default function CustomModal ({type, gameName, shortDescription, fullDescription, link, handleCtrTest,
                                         gpBundleId, iosBundleId, iosAppId, handleClose, editGameHandler, handleCpiTest})  {
    if (type === 'edit'){
        return (
            <Edit gameName={gameName} handleClose={handleClose} editGameHandler={editGameHandler}
                  shortDescription={shortDescription} fullDescription={fullDescription} link={link}
                  gpBundleId={gpBundleId} iosBundleId={iosBundleId} iosAppId={iosAppId}
            />
        )
    }

    if (type === 'delete') {
        return (
            <Delete gameName={gameName} handleClose={handleClose}/>
        )
    }

    if (type === 'newExperiment') {
        return (
            <Experiment gameName={gameName} handleClose={handleClose}
            handleCpiTest={handleCpiTest} handleCtrTest={handleCtrTest}/>
        )
    }
}