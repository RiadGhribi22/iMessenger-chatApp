import React from 'react'
import ButtonSend from '../icons/inputMessage/SendButtonComponent'
import Attachment from '../icons/inputMessage/PaperclipComponent'
import Emoji from '../icons/inputMessage/IconawesomeSmileComponent'
import Images from '../icons/inputMessage/attachmentIcons/ImageComponent'
import Videos from '../icons/inputMessage/attachmentIcons/VideosComponent'
import Files from '../icons/bigRightSide/PdfComponent'
const messageSend = ({ inputHandle, newMessage, sendMessage, emojisSend, imageSend00 , videoSend00 ,pdfSend00}) => {
    const emojis = [
        '😀', '😂', '🥲', '🙁',
        '😍', '🥳', '😇', '☺️', '😎',
        '😍', '🥳', '😇', '☺️', '😎',
        '😍', '🥳', '😇', '☺️', '😎',
    ]
    return (
        <div className="message-send-section">
            <input type="checkbox" id='emoji' />
            <input type="checkbox" id='attachment' />
            <div className="message-type">
                <input type="text" id="message" name='message' onChange={inputHandle} value={newMessage} placeholder='Enter your message here' className="form-control" />
                <div className="file hover-emoji">
                    <label htmlFor="emoji"><Emoji /></label>
                </div>
                <div className="file hover-attachment">
                    <label htmlFor="attachment"><Attachment /></label>
                </div>
                <div className="file hover-send" onClick={sendMessage}>
                    <ButtonSend />
                </div>
            </div>
            <div className="emoji-section">
                <div className="emoji">
                    {
                        emojis.map(e => <span onClick={() => emojisSend(e)}>{e}</span>)
                    }
                </div>
            </div>
            <div className="attachment-section">
                <div className="attachment">
                    <label htmlFor="pic" className="attachment-row">
                        <div className="attachment-icon">
                            <Images />
                        </div>
                        <p>Images</p>
                    </label>
                    <input
                        type="file"
                        id="pic"
                        accept='image/*'
                        className="form-control"
                        onChange={imageSend00}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="attachment">
                    <div className="attachment-row">
                        <label htmlFor="vid" className="attachment-row">
                            <div className="attachment-icon">
                                <Videos />
                            </div>
                            <p>Videos</p>
                        </label>
                    </div>
                    <input
                        type="file"
                        id="vid"
                        accept='video/*'
                        className="form-control"
                        onChange={videoSend00}
                        style={{ display: 'none' }}
                    />


                </div>
                <div className="attachment">
                    <div className="attachment-icon">
                        <div className="attachment-row">
                            <label htmlFor="pdf" className="attachment-row">

                                <div className="attachment-icon">
                                    <Files />
                                </div>
                                <p>PDF</p>
                            </label>

                        </div>
                        <input
                        type="file"
                        id="pdf"
                        accept='application/pdf'
                        className="form-control"
                        onChange={pdfSend00}
                        style={{ display: 'none' }}
                    />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default messageSend