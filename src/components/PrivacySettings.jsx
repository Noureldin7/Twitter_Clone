import React, { useState } from 'react';
import SettingsMenuOptions from './SettingsMenuOptions';
import PeopleIcon from '@mui/icons-material/People';
import "./Styles/SettingsMenuOptions.css"
import "./Styles/SettingsMenu.css"
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "./Styles/SettingsModals.css"
import { textAlign } from '@mui/system';


function PrivacySettings(props) {
    const privateAcc={
        privateVal:false
    }
    const [isClickedAudience,setAudienceActive]=useState(false);
    const [checked, setChecked] = React.useState(privateAcc.privateVal);
    const [buttonPopup, setButtonPopup] = useState(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    function clickedAudience(){
        setAudienceActive(true);
    }
    const handleChange = (event) => {
        if(checked===true)
        {
            setChecked(false);
        }
        else{
            setButtonPopup(true)
        }
        //make request to back end here
    };
    const handleClose = () => setButtonPopup(false);
    const  handleSubmit =(e) =>{
        e.preventDefault()
        setChecked(!checked)
        handleClose()
        //make request to backend
    }
    return ( 
        <div className="settingsSubMenu">
            {/* if nothing clicked 1*/}
            {isClickedAudience===false &&(<h1 className={!props.isDarkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Privacy and safety</h1>)}
            {isClickedAudience===false &&(<p className={!props.isDarkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" }>Manage what information you see and share on Larry.</p>)}
            {isClickedAudience===false &&(<h2 className={!props.isDarkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" } style={{marginTop:25}}>Your Larry activity</h2>)}
            {isClickedAudience===false &&(<div onClick={clickedAudience} ><SettingsMenuOptions id="11" darkMode={props.isDarkMode} active={isClickedAudience} Icon={PeopleIcon} text="Audience" subtext="Manage what information you allow other people on Twitter to see." isSubtextExist={true}/></div>)}
            {/* Audience clicked */}
            {isClickedAudience===true &&(<h2 className={!props.isDarkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Audience</h2>)}
            {isClickedAudience===true &&(<p className={!props.isDarkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" }>Manage what information you allow other people on Larry to see.</p>)}
            {isClickedAudience===true &&(
                <div>
                    <div style={{display: 'flex',alignItems: 'center'}}>
                        <div onClick={handleChange} className={!props.isDarkMode? "settingsMenuOptionsLight":"settingsMenuOptionsDark" }>
                            <div  style={{marginLeft: 10, fontWeight: 500, fontSize:18, display:'center'}}>Protect your Lars</div>
                            
                        </div>
                        <div className={!props.isDarkMode?`arrowIconLight`:`arrowIconDark `} >
                            <Checkbox {...label}
                            checked={checked}
                            onChange={handleChange}
                            />
                        </div>
                        <Modal 
                        open={buttonPopup}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        keepMounted
                        >
                          <form className={!props.isDarkMode? 'protectYourLarsLight':'protectYourLarsDark'} onSubmit={handleSubmit}>
                                <Typography className={!props.isDarkMode? "settingsModalHeaderLight":"settingsModalHeaderDark" } id="modal-modal-title" variant="h6" component="h2" >
                                Protect your Lars?
                                </Typography>
                                <Typography className={!props.isDarkMode? "settingsModalParagraphLight":"settingsModalParagraphDark" } id="modal-modal-description" sx={{ mt: 2 }}>
                                This will make them visible only to your Larry followers. 
                                </Typography>
                                <div style={{textAlign:"center"}}>
                                <Button 
                                type='submit'
                                variant="contained" 
                                className={props.isDarkMode &&('forceChangePasswordMUIDarkMode')} 
                                style={{marginTop:24, width:200}}
                                >
                                Protect
                                </Button>
                                </div>
                                <div style={{ textAlign:"center"}}>
                                <Button
                                style={{marginTop:7, width:200}}
                                onClick={handleClose}
                                >
                                Cancel
                                </Button>
                                </div>
                          </form>
                        </Modal>
                    </div>
                    <p className={!props.isDarkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" }>When selected, your Lars and other account information are only visible to people who follow you.<a className='App-link' href="https://help.twitter.com/en/safety-and-security/public-and-protected-tweets">Learn more</a></p>
                </div>
            )}
        </div>
     );
}

export default PrivacySettings;