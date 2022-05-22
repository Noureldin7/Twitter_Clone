import React, { useEffect, useState } from "react";
import "../Profile/Styles/MyFollowing.css";
import CreateCard from "../Profile/CreateCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Styles/SuggestedAccounts.css";
/**
 * component to show the user suggested accounts he could follow them.
 * @component
 * return (
 * <div>
 *      <div>Who to follow</div>
 *      <div>user1</div>
 *      <div>Follow</div>
 *      ...
 *   
 * </div>
 * )
 *  
 */
function SuggestedAccounts() {
    let userID = localStorage.getItem("userId");
    const [myFollowing, setMyFollowing] = useState([]);
    useEffect(() => {
      axios
      .get(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/suggestedAccounts`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Error");
        } else {
          setMyFollowing(res.data.suggestedAccounts);
          console.log(res.data.suggestedAccounts);
        }
      });
  },[]);

    return (
        <div className="SuggestedAccPage">
            <div className="SuggestedAccContainer">
                <div className="SuggestedAccHeader">Who to follow</div>
                {myFollowing.map((following) => (
                    <CreateCard randomUser={true} contact={following} />
                ))}  
            </div>
            <div className="SuggestedAccFooter">© 2022 Larry, Inc.</div>
        </div> 
     );
}

export default SuggestedAccounts;


