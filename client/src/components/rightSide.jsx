import React from 'react'
import CallIcon from '../icons/topSideIcons/VoiceChatComponent'
import VideoCallIcon from '../icons/topSideIcons/VideoCallComponent'
import Message from '../common/message'
import MessageSend from '../common/messageSend'
import FriendInfo from './friendInfo'
import ArrowButtonLeft from '../icons/topSideIcons/ButtonArrowComponent00'

const rightSide = (props) => {

    const { currentFriend, inputHandle, newMessage, sendMessage, message, scrollRef, emojisSend, imageSend00, videoSend00, pdfSend00, handlePdfDownload, activeUser, typingMessage , isConvChecked ,handleConvChange , handleGoBackChange } = props;

    return (
        <>

            <div className="col-9">
                <div className="right-side">
                    <input type="checkbox" id="dot" />
                    <div className="row">
                        <input
                            type="checkbox"
                            id="conv"
                            checked={isConvChecked}
                            onChange={handleConvChange}
                        />
                        <input
                            type="checkbox"
                            id="goBack"
                            checked={!isConvChecked}
                            onChange={handleGoBackChange}
                        />
                        <div className="col-8">
                            <div className="message-send-show">
                                <div className="header">
                                    <div className="image-name">
                                        <div className="image">
                                            <img src={`${process.env.REACT_APP_HOST}/images/${currentFriend.image}`} alt="" />
                                            {
                                                activeUser && activeUser.length > 0 ?
                                                    activeUser.map((obj) =>
                                                        obj.userId === currentFriend._id ?
                                                            <div className="active_icon"></div>
                                                            : ''
                                                    ) : ''
                                            }
                                        </div>
                                        <div className="name">
                                            <h3>{currentFriend.userName}</h3>
                                        </div>
                                    </div>
                                    <div className='icons'>
                                        <div className="icon">
                                            <CallIcon />

                                        </div>
                                        <div className="icon">
                                            <VideoCallIcon />

                                        </div>
                                        <label htmlFor="goBack">
                                            <div className="icon controls" >
                                                <ArrowButtonLeft />

                                            </div>
                                        </label>

                                    </div>
                                </div>

                                <Message message={message} currentFriend={currentFriend}
                                    scrollRef={scrollRef}
                                    typingMessage={typingMessage}
                                    handlePdfDownload={handlePdfDownload} />
                                <MessageSend
                                    inputHandle={inputHandle}
                                    newMessage={newMessage}
                                    sendMessage={sendMessage}
                                    emojisSend={emojisSend}
                                    imageSend00={imageSend00}
                                    videoSend00={videoSend00}
                                    pdfSend00={pdfSend00}
                                />
                            </div>
                        </div>

                        <div className="col-4">
                            <FriendInfo currentFriend={currentFriend} activeUser={activeUser} />
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default rightSide