import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import "./Styles/SettingsModals.css"
import "./Styles/SettingsMenu.css"
function UpdatePassword(props) {
    const [confirmPassValue, setValueConfirmPass] = useState('');
    const [newPassValue1, setValueNewPass1] = useState('');
    const [newPassValue2, setValueNewPass2] = useState('');
    const [isAllPassCorrect, setIsAllPassCorrect] = useState(0);
    const [isConfirmPassCorrect, setIsConfirmPassCorrect] = useState(0);
    //errors vars
    const [newPassValue1Error, setValueNewPass1Error] = useState(false);
    const [newPassValue2Error, setValueNewPass2Error] = useState(false);
    const [confirmPassValueError, setValueConfirmPassError] = useState(false);
    //modal
    const [buttonPopup, setButtonPopup] = useState(false);
    
    const  handleSubmit =(e) =>{
      e.preventDefault()
      setValueConfirmPassError(false);
      setValueNewPass1Error(false);
      setValueNewPass2Error(false);
      
      
      if(confirmPassValue && newPassValue1 && newPassValue2){
        if(confirmPassValue==="karim"){
          setIsConfirmPassCorrect(1)
          if(newPassValue1.length<6){
            setValueNewPass1Error(true);
          }
          else if(newPassValue1===newPassValue2){
            setIsAllPassCorrect(2);
            //add request to backed end here TODO***
            setButtonPopup(true);//show message
          }
          else{
            setIsAllPassCorrect(-2);
            //password does not match
            setValueNewPass2Error(true);
          }
        }
        else{
          setIsConfirmPassCorrect(-1);
          //old pass incorrect
          setValueConfirmPassError(true);
        }
      }
    }
    const styles = () => ({
      notchedOutline: {
        borderWidth: "3px",
        borderColor: "white !important"
      }
    });
    const handleClose = () => setButtonPopup(false);
    

  return ( 
    <div >
      <div >
         <form noValidate autoComplete='off' onSubmit={handleSubmit}>
           <div className="TextFieldStyling">

         <TextField 
         InputLabelProps={{className:props.darkMode &&('forceChangePasswordMUIDarkMode')} }
         onChange={(e)=> setValueConfirmPass(e.target.value)}
         id="confirmpass1"  
         label="Current password" 
         variant="outlined" 
         color="primary" 
         required   
         type="password"
         fullWidth
         error={confirmPassValueError}
         helperText={confirmPassValueError &&("The password you entered was incorrect.")}
         inputProps={{className:props.darkMode &&('forceChangePasswordMUIDarkMode') }}
         
         />
         </div>
         <div className="TextFieldStyling">
          <TextField 
          InputLabelProps={{className:props.darkMode &&('forceChangePasswordMUIDarkMode')} }
          onChange={(e)=> setValueNewPass1(e.target.value)}
          id="newpass1" 
          label="New password" 
          variant="outlined" 
          color="primary" 
          required 
          type="password" 
          fullWidth
          error={newPassValue1Error}
          helperText={newPassValue1Error &&("Your password needs to be at least 6 characters. Please enter a longer one.")}
          inputProps={{className:props.darkMode &&('forceChangePasswordMUIDarkMode') }}
          />
          
          </div>
          <div className="TextFieldStyling">
          <TextField 
          InputLabelProps={{className:props.darkMode &&('forceChangePasswordMUIDarkMode')} }
          onChange={(e)=> setValueNewPass2(e.target.value)}
          id="newpass2" 
          label="Confirm password" 
          variant="outlined" 
          color="primary" 
          required 
          type="password" 
          fullWidth
          error={newPassValue2Error}
          helperText={newPassValue2Error &&("Passwords do not match.")}
          inputProps={{className:props.darkMode &&('forceChangePasswordMUIDarkMode') }}
          />
          </div>
          
         <div style={{textAlign:'right',marginRight:15,marginTop:20}}>
            <Button 
              type="submit" 
              disabled={confirmPassValue.length===0 || newPassValue1.length===0 || newPassValue2.length===0}
              variant="contained"  
              className={props.darkMode &&('forceChangePasswordMUIDarkMode')} 
              style={{marginTop:20}}
            >
              save
            </Button>
            </div>
        </form>
        </div>
        <div>
          <Modal 
              open={buttonPopup}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              keepMounted
              >
                <div style={{verticalAlign:'middle'}}>
                <form className={!props.darkMode? 'protectYourLarsLight':'protectYourLarsDark'} onSubmit={handleSubmit}>
                      <Typography  className={!props.darkMode? "settingsModalHeaderCenteredLight":"settingsModalHeaderCenteredDark" } id="modal-modal-title" variant="h6" component="h2" >
                      New password saved!
                      </Typography>
                      <div style={{ textAlign:"center"}}>
                      <Button
                      variant="contained" 
                      style={{marginTop:7, width:200}}
                      onClick={handleClose}
                      >
                      Close
                      </Button>
                      </div>
                </form>
                </div>
          </Modal>
        </div>
        {/* {isAllPassCorrect===2 &&(<h3>Yessss</h3>)}
        {isAllPassCorrect===-2 &&(<h3>no new pass is not equal</h3>)}
        {isConfirmPassCorrect===-1 &&(<h3>wrong password</h3>)} */}

    </div>

     );
}
export default UpdatePassword;
