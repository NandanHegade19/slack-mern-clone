import React from 'react'
import "./Message.css";
import { useStateValue } from './StateProvider';

function Message({ message, timestamp, user, userImg }) {
    //const [{ user }] = useStateValue();
    return (
        <div className="message">
            <img src={userImg} alt="ProfilePic" />
            <div className="message__info">
                <h4>
                    {user}{" "}
                    <span className="message__timestamp">
                        {new Date(parseInt(timestamp)).toUTCString()}
                    </span>
                </h4>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
