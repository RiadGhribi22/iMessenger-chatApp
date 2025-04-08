import React from 'react'
import VoiceCall from '../icons/bigRightSide/VoiceChatComponent'
import VideoCall from '../icons/bigRightSide/VideoCallComponent'
import Files1 from '../icons/bigRightSide/ImageComponent'
import Files2 from '../icons/bigRightSide/VideosComponent'
import Files3 from '../icons/bigRightSide/PdfComponent'
import ArrowLeftComponent from '../icons/bigRightSide/ArrowLeftComponent'
import ButtonArrowComponent from '../icons/smallRightside/ButtonArrowComponent'

const friendInfo = ({ currentFriend, activeUser }) => {
    return (
        <div className="friend-info">
            <div className="button-go-back">
                <label htmlFor="dot"> <ButtonArrowComponent /></label>
            </div>
            <div className="image-name">
                <div className="image">
                    <img src={`${process.env.REACT_APP_HOST}/images/${currentFriend.image}`} alt="" />

                </div>{
                    activeUser && activeUser.length > 0 ?
                        activeUser.map((obj) =>
                            obj.userId === currentFriend._id ?
                                <div className="active-user">Active</div>
                                : ''
                        ) : ''
                }
                <div className="name">
                    {currentFriend.userName}
                </div>
            </div>
            <div className="calls">
                <div className="VoiceCall">
                    <VoiceCall />
                </div>
                <div className="VideoCall">
                    <VideoCall />
                </div>

            </div>
            <div className="files-chat">
                <h1 id="FilesTitle">Chat Files</h1>
                <div className="files-row">
                    <div className="files-row-icon">
                        <Files1 />
                    </div>
                    <div className="name-number">
                        <h2>
                            Images
                        </h2>
                        <h4>
                            13 files
                        </h4>
                    </div>
                    <h2 id="FilesTaille" >9.45 MB</h2>
                    <div className="button-show-more">
                        <ArrowLeftComponent />
                    </div>

                </div>
                <div className="files-row">
                    <div className="files-row-icon">
                        <Files2 />
                    </div>
                    <div className="name-number">
                        <h2>
                            Videos
                        </h2>
                        <h4>
                            2 files
                        </h4>
                    </div>
                    <h2 id="FilesTaille">46.66 MB</h2>
                    <div className="button-show-more">
                        <ArrowLeftComponent />
                    </div>

                </div>
                <div className="files-row">
                    <div className="files-row-icon">
                        <Files3 />
                    </div>
                    <div className="name-number">
                        <h2>
                            PDFs
                        </h2>
                        <h4>
                            18 files
                        </h4>
                    </div>
                    <h2 id="FilesTaille">3.41 MB</h2>
                    <div className="button-show-more">
                        <ArrowLeftComponent />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default friendInfo