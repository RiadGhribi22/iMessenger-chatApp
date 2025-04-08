import React, { useEffect, useState, useRef } from 'react'
import SettingsButton from '../icons/leftSide/ButtonSettingsComponent'
import SearchButton from '../icons/PathComponent'
import Logo from '../icons/LogoComponent'
import Friend from '../common/friend'
import RightSide from './rightSide'
import { useDispatch, useSelector } from "react-redux";
import { getFriend, messsageSend, getMessage, imageSend, videoSend, pdfSend, seenMessage00, updateMessage00 } from '../store/action/messengerAction'
import { userLogout } from '../store/action/authAction'
import { SOCKET_MESSAGE } from '../store/types/messengerType'
import { toast } from 'react-toastify';
import useSound from 'use-sound'
import { FaSignOutAlt } from "react-icons/fa";
import NotificationSound from '../audio/notification.mp3'
import SendingSound from '../audio/sending.mp3'


import { io } from 'socket.io-client';


const Messenger = () => {

    const dispatch = useDispatch();
    const [notificationsPlay] = useSound(NotificationSound)
    const [sendingPlay] = useSound(SendingSound)





    const { friends, message, mesageSendSuccess, message_get_success } = useSelector(state => state.messenger)
    const { myInfo } = useSelector(state => state.auth)
    const [currentFriend, setCurrentFriend] = useState('');
    const [newMessage, setNewMessge] = useState('');
    const [activeUser, setActiveUser] = useState(['']);
    const [socketMessage, setSocketMessge] = useState('');
    const [typingMessage, setTypingMessge] = useState('');
    const [isConvChecked, setIsConvChecked] = useState(false);





    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {

        socket.current = io(`ws://${process.env.REACT_APP_SOCKET}`)
        socket.current.on('getMessage', (data) => {
            setSocketMessge(data);
        })
        socket.current.on('typingMessageGet', (data) => {
            setTypingMessge(data);
        })
        socket.current.on('msgSeenResponse', msg => {
            dispatch({
                type: 'SEEN_MESSAGE',
                payload: {
                    msgInfo: msg
                }
            })
        })
        socket.current.on('msgUnSeenResponse', msg => {
            dispatch({
                type: 'UNSEEN_MESSAGE',
                payload: {
                    msgInfo: msg
                }
            })
        })
        socket.current.on('seenSuccess', data => {
            dispatch({
                type: 'SEEN_SUCCESS_01',
                payload: data
            })
        })
    }, [])

    useEffect(() => {
        if (socketMessage && currentFriend) {
            if (socketMessage.senderId === currentFriend._id &&
                socketMessage.reseverId === myInfo.id) {
                dispatch({
                    type: SOCKET_MESSAGE,
                    payload: {
                        message: socketMessage
                    }
                })
                dispatch(seenMessage00(socketMessage))
                socket.current.emit('messageSeen', socketMessage)
                dispatch({
                    type: 'UPDATE_FRIEND_MESSAGE',
                    payload: {
                        msgInfo: socketMessage,
                        status: 'seen',
                        updatedAt: new Date().toISOString()
                    }
                })
            }

        }

        setSocketMessge('')


    }, [socketMessage])


    useEffect(() => {

        socket.current.emit('addUser', myInfo.id, myInfo)
    }, [])

    useEffect(() => {

        socket.current.on('getUser', (users) => {

            const filterUser = users.filter(u => u.userId !== myInfo.id)
            console.log(filterUser)

            setActiveUser(filterUser)
        })
    }, [])







    const inputHandle = (e) => {
        setNewMessge(e.target.value);

        socket.current.emit('typingMessage', {
            senderId: myInfo.id,
            reseverId: currentFriend._id,
            msg: e.target.value
        })

    }


    useEffect(() => {

        if (socketMessage && socketMessage.senderId !== currentFriend._id &&
            socketMessage.reseverId === myInfo.id
        ) {
            notificationsPlay()
            toast.success(`${socketMessage.senderName} send New Message `)
            dispatch(updateMessage00(socketMessage))
            socket.current.emit('unseenMessage', socketMessage)
            dispatch({
                type: 'UPDATE_FRIEND_MESSAGE',
                payload: {
                    msgInfo: socketMessage,
                    status: 'unseen'
                }
            })
        }

    }, [socketMessage])

    const sendMessage = (e) => {
        e.preventDefault();
        sendingPlay();
        const data = {
            senderName: myInfo.userName,
            reseverId: currentFriend._id,
            message: newMessage ? newMessage : '🥲'
        }

        socket.current.emit('typingMessage', {
            senderId: myInfo.id,
            reseverId: currentFriend._id,
            msg: ''
        })

        dispatch(messsageSend(data))
        setNewMessge('')

    }


    useEffect(() => {
        if (mesageSendSuccess) {
            socket.current.emit('sendMessage', message[message.length - 1]);
            dispatch({
                type: 'UPDATE_FRIEND_MESSAGE',
                payload: {
                    msgInfo: message[message.length - 1],
                }
            })
            dispatch({
                type: 'MESSAGE_SEND_SUCCESS_CLEAR'
            })
        }
    }, [mesageSendSuccess]);



    useEffect(() => {

        dispatch(getFriend())

    }, [])






    useEffect(() => {
        dispatch(getMessage(currentFriend._id))
        if (friends.length > 0) {

        }
    }, [currentFriend?._id])




    useEffect(() => {

        if (message.length > 0) {
            if (message[message.length - 1].senderId !== myInfo.id && message[message.length - 1].status !== 'seen') {
                dispatch({
                    type: 'UPDATE',
                    payload: {
                        id: currentFriend._id
                    }
                })
                socket.current.emit('seen', { senderId: currentFriend._id, reseverId: myInfo.id })
                dispatch(seenMessage00({ _id: message[message.length - 1]._id }))
            }
        }
        dispatch({
            type: 'MESSAGE_GET_SUCCESS_CLEAR',

        })
    }, [message_get_success])



    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        // for last message print 
    }, [message])


    const emojisSend = (emo) => {

        setNewMessge(`${newMessage}` + emo)

        socket.current.emit('typingMessage', {
            senderId: myInfo.id,
            reseverId: currentFriend._id,
            msg: emo
        })
    }

    const imageSend00 = (e) => {


        if (e.target.files.length !== 0) {
            sendingPlay()

            const imageName = e.target.files[0].name;
            const newImageName = Date.now() + imageName



            const formData = new FormData()

            formData.append('senderName', myInfo.userName);
            formData.append('newImageName', newImageName);
            formData.append('reseverId', currentFriend._id);
            formData.append('image', e.target.files[0]);


            dispatch(imageSend(formData))


        }


    }
    const videoSend00 = (e) => {


        if (e.target.files.length !== 0) {
            sendingPlay()

            const videoName = e.target.files[0].name;
            const newVideoName = Date.now() + videoName;



            const formData = new FormData()

            formData.append('senderName', myInfo.userName);
            formData.append('newVideoName', newVideoName);
            formData.append('reseverId', currentFriend._id);
            formData.append('video', e.target.files[0]);


            dispatch(videoSend(formData))


        }


    }
    const pdfSend00 = (e) => {


        if (e.target.files.length !== 0) {
            sendingPlay()

            const pdfName = e.target.files[0].name;
            const newPdfName = Date.now() + pdfName;



            const formData = new FormData()

            formData.append('senderName', myInfo.userName);
            formData.append('newPdfName', newPdfName);
            formData.append('reseverId', currentFriend._id);
            formData.append('pdf', e.target.files[0]);


            dispatch(pdfSend(formData))


        }


    }
    const handlePdfDownload = (name, path) => {
        try {
            const link = document.createElement('a');
            link.href = `${process.env.REACT_APP_HOST}/pdfs/${path}`; 
            link.setAttribute('download', name); 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };


    const [hide, setHide] = useState(true);

    const Logout = () => {
        dispatch(userLogout())
        socket.current.emit('logout', myInfo.id)
    }


    const handleConvChange = () => {
        setIsConvChecked(true);
    };

    const handleGoBackChange = () => {
        setIsConvChecked(false);
        setCurrentFriend('')
    };



    return (

        <div className="messenger">

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

                <div className="col-3">

                    <div className="left-side">
                        <div className="top">
                            <div className="Logo">
                                <Logo />
                            </div>

                            <div className="profileUser">
                                <div className="image-name">

                                    <div className="image">
                                        <img src={`${process.env.REACT_APP_HOST}/images/${myInfo.image}`} alt="test" />
                                    </div>
                                    <div className="name">
                                        <h3>{myInfo.userName}</h3>
                                    </div>
                                </div>

                                <div className="icons">
                                    <div className="icon" onClick={() => setHide(!hide)}>
                                        <SettingsButton />
                                    </div>

                                    <div className={hide ? "theme_logout" : "theme_logout show"}>

                                        <div className="logout" onClick={Logout}>
                                            <FaSignOutAlt /> Logout
                                        </div>


                                    </div>





                                </div>

                            </div>
                        </div>
                        <div className="friend-search">
                            <div className="search">
                                <input type="text" placeholder='search ' className='form-control' />
                                <SearchButton />

                            </div>
                        </div>
                        <div className="friends">


                            {
                                friends && friends.length > 0 ?
                                    friends.map((fd) =>
                                        <div className={`hover-friend ${currentFriend._id === fd.fdInfo._id ? "active" : " "}`}
                                            onClick={() => setCurrentFriend(fd.fdInfo)}>
                                            <label htmlFor="conv">
                                                <Friend myId={myInfo.id} fd={fd} activeUser={activeUser} />
                                            </label>
                                        </div>



                                    ) : 'No Friend'
                            }
                        </div>
                    </div>
                </div>
                {
                    currentFriend ? <RightSide
                        currentFriend={currentFriend}
                        inputHandle={inputHandle}
                        sendMessage={sendMessage}
                        newMessage={newMessage}
                        message={message}
                        scrollRef={scrollRef}
                        emojisSend={emojisSend}
                        imageSend00={imageSend00}
                        videoSend00={videoSend00}
                        pdfSend00={pdfSend00}
                        handlePdfDownload={handlePdfDownload}
                        activeUser={activeUser}
                        typingMessage={typingMessage}
                        handleGoBackChange={handleGoBackChange}
                        handleConvChange={handleConvChange}
                        isConvChecked={isConvChecked}

                         /> : <h1 className="noOneSelected">Select Your Friend</h1>

                }
            </div>

        </div>
    )
}

export default Messenger