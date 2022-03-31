import React ,{ useState } from "react";
import "./Styles/tweet.css";
import Button from "./dropDownButton"

function Tweet(props){



    return(
    <div className="TweetDiv ">
        <textarea id="1" className="form-control" aria-label="With textarea" maxLength="280" placeholder="What's Happening" onChange={props.onChangeHandeler}></textarea>
        <Button />  
    </div>
);
}

export default Tweet;


