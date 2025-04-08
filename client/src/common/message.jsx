import React from 'react'
import { useSelector } from 'react-redux'
import TypingComponent from '../icons/typing/TypingComponent'
import moment from 'moment'
import VideoMessage from '../common/Video'


const Message = ({ message, currentFriend, scrollRef, typingMessage, handlePdfDownload }) => {

    const { myInfo } = useSelector(state => state.auth)

    const handlePrint = (path) => {
        window.open(`${process.env.REACT_APP_HOST}/pdfs/${path}`, '_blank');
    };



    return (
        <>
            <div className="message-show">
                {
                    message && message.length > 0 ? message.map(m =>
                        m.senderId === myInfo.id ?
                            <div className="my-message" ref={scrollRef}>
                                <div className='image-message'>
                                    <div className="my-text">
                                        {
                                            m.message.text === '' && m.message.image ?
                                                <img src={`${process.env.REACT_APP_HOST}/images/${m.message.image}`} className='media-message' onClick={() => window.open(`/images/${m.message.image}`, '_blank')} alt=''/> :
                                                m.message.text === '' && m.message.video ?
                                                    <VideoMessage videoSrc={`${process.env.REACT_APP_HOST}/videos/${m.message.video}`} />

                                                    : m.message.text === '' && m.message.pdf ?
                                                        <div className='my-pdf-content'>
                                                            <h2>{m.message.pdf.pdfName}</h2>
                                                            <button onClick={() => handlePrint(m.message.pdf.pdfUrl)}>Show</button>
                                                        </div>
                                                        :
                                                        <p className="message-text">
                                                            {m.message.text}
                                                        </p>

                                        }
                                    </div>
                                </div>
                                {
                                    m.status === 'seen' ?
                                        <div className="time">
                                            seen  {moment(m.updatedAt).startOf('mini').fromNow()}
                                        </div>
                                        : <div className="time">
                                            {moment(m.createdAt).startOf('mini').fromNow()}
                                        </div>

                                }
                            </div>
                            :
                            <div className="fd-message" ref={scrollRef}>
                                <div className="image-message-time">
                                    <img src={`${process.env.REACT_APP_HOST}/images/${currentFriend.image}`} alt="" className='fnd_image' />
                                    <div className="message-time" >
                                        <div className="fd-text">
                                            {
                                                m.message.text === '' && m.message.image ?
                                                    <img src={`${process.env.REACT_APP_HOST}/images/${m.message.image}`} alt='' className='media-message' onClick={() => window.open(`/images/${m.message.image}`, '_blank')} /> :
                                                    m.message.text === '' && m.message.video ?
                                                        <VideoMessage videoSrc={`${process.env.REACT_APP_HOST}/videos/${m.message.video}`} />
                                                        : m.message.text === '' && m.message.pdf ?
                                                            <div className='fd-pdf-content'>
                                                                <h2>{m.message.pdf.pdfName}</h2>
                                                                <button onClick={() => handlePrint(m.message.pdf.pdfUrl)}>Show</button>
                                                            </div>
                                                            :
                                                            <p className="message-text">

                                                                {m.message.text}
                                                            </p>

                                            }
                                        </div>
                                        <div className="time">
                                            {moment(m.createdAt).startOf('mini').fromNow()}
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        :

                        <div className='friend_connect'>
                            <img src={`${process.env.REACT_APP_HOST}/images/${currentFriend.image}`} alt="" />

                            <h3>{currentFriend.userName} Connect You</h3>

                            <span> {moment(currentFriend.createdAt).startOf('mini').fromNow()}</span>

                        </div>


                }





            </div>


            {
                typingMessage && typingMessage.msg && typingMessage.senderId === currentFriend._id ?
                    <div className="typing-message">
                        <div className="fd-message" ref={scrollRef}>
                            <TypingComponent currentFriend={currentFriend} />
                        </div>

                    </div>
                    :
                    ''

            }



        </>
    )
}

export default Message