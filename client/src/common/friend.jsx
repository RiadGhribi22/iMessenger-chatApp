import React from 'react'

import moment from 'moment'

const friend = (props) => {

    const activeUser = props.activeUser;
    const { fdInfo, msgInfo } = props.fd;
    const myId = props.myId;


    return (
        <div className="friend">
            <div className="friend-image">
                <div className="image">
                    <img src={`${process.env.REACT_APP_HOST}/images/${fdInfo.image}`} alt="friend" />

                    {
                        activeUser && activeUser.length > 0 ?
                            activeUser.map((obj) =>
                                obj.userId === fdInfo._id ?
                                    <div className="active_icon"></div>
                                    : ''
                            ) : ''
                    }
                </div>
            </div>
            <div className="friend-name-seen">
                <div className="friend-name">
                    <h4>{fdInfo.userName}</h4>
                    {msgInfo && msgInfo.message.text ?
                        msgInfo && msgInfo.senderId === myId ?
                            <p>You : {msgInfo.message.text}</p>

                            :

                            msgInfo.status !== 'seen' ?
                                <p className='new_message'>{msgInfo.message.text}</p>
                                : <p>him : {msgInfo.message.text}</p>



                        :
                        msgInfo && msgInfo.message.image ?
                            msgInfo.status !== 'seen' && msgInfo.reseverId === myId ?
                                <p className='new_message' >Send a Photo</p>
                                :
                                <p>Send a Photo</p>
                            :
                            msgInfo && msgInfo.message.video ?
                                msgInfo.status !== 'seen' && msgInfo.reseverId === myId ?
                                    <p className='new_message' >Send a Video</p>
                                    :
                                    <p>Send a Video</p>
                                :
                                msgInfo && msgInfo.message.pdf ?
                                    msgInfo.status !== 'seen' && msgInfo.reseverId === myId ?
                                        <p className='new_message' >Send a PDF</p>
                                        :
                                        <p>Send a PDF</p>
                                    :
                                    <p>Connect you</p>



                    }
                </div>
                <div className="last-message-date">


                    {

                        msgInfo ?

                            msgInfo.status === 'unseen' ?
                                msgInfo.reseverId === myId ?

                                    <div className="newMessage">
                                        1
                                    </div>
                                    : <h5>{moment(msgInfo.createdAt).startOf('mini').fromNow()}</h5>

                                : <h5>{moment(msgInfo.createdAt).startOf('mini').fromNow()}</h5>


                            : <h5>{moment(fdInfo.createdAt).startOf('mini').fromNow()}</h5>



                    }





                </div>
            </div>
        </div>
    )
}

export default friend