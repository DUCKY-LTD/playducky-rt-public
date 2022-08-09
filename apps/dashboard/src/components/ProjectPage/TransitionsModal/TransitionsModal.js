import * as React from 'react';
import clsx from 'clsx';
import { Box, styled } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import Fade from '@mui/material/Fade';
import Button from './Button/Button';
import CustomModal from "./CustomModal/CustomModal";

const BackdropUnstyled = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'MuiBackdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  -webkit-tap-highlight-color: transparent;
`;

const style = (width) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    width: width,
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: 24,
    padding: '10px 17px 10px 17px',
});



export default function TransitionsModal({btnName, btnBgColor, gameName, shortDescription, fullDescription, handleCtrTest,
                                             link, gpBundleId, iosBundleId, iosAppId, type, editGameHandler, modalWidth, btnSize, handleCpiTest}) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button size={btnSize} name={btnName} bgColor={btnBgColor} onClick={handleOpen}/>
            <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    components={{ Backdrop }}
            >
                <Fade in={open} timeout={300}>
                    <Box sx={style(modalWidth)}>
                        <CustomModal type={type} gameName={gameName} shortDescription={shortDescription} fullDescription={fullDescription}
                                     link={link} gpBundleId={gpBundleId} iosBundleId={iosBundleId} iosAppId={iosAppId}
                                     handleClose={handleClose} editGameHandler={editGameHandler}
                                     handleCpiTest={handleCpiTest} handleCtrTest={handleCtrTest}
                        />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
