import React, {useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine} from 'react-chat-engine' ;
import {auth} from '../components/firebase' ;
import {useAuth} from '../contexts/AuthContext' ;
import axios from 'axios';

export default function Chats() {
    const didMountRef = useRef(false)
    const [ loading, setLoading ] = useState(true)
    const { user } = useAuth()
    const history = useHistory()

    const handleLogout = async() => {
        await auth.signOut();

        history.push('/');
        
    }
    async function getFile(url) {
        let response = await fetch(url);
        let data = await response.blob();
        return new File([data], "test.jpg", { type: 'image/jpeg' });
      }

      useEffect(() => {
        if (!didMountRef.current) {
          didMountRef.current = true
    
          if (!user || user === null) {
            history.push("/")
            return
          }
    

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "56d44953-8c58-4273-bb74-8da7aabc3354",
                "user-name": user.email,
                "user-secret" : user.uid,
            }

        })
        .then(() => {
            setLoading(false);
        })
        .catch(e => {
            let formdata = new FormData()
            formdata.append('email', user.email)
            formdata.append('username', user.email)
            formdata.append('secret', user.uid)

            getFile(user.photoURL)
            .then(avatar => {
             formdata.append('avatar', avatar, avatar.name);

             axios.post(
                'https://api.chatengine.io/users/',
                formdata,
             {  headers: {"private-key": "af3f4352-92b7-485f-99e6-0ac980c69a55" }}
             )
             .then(() => setLoading(false))
             .catch(e => console.log('e', e.response))
            })


        })
    }

    }, [user, history]);
    if (!user || loading) return 'Loading...' ;
    return(
        <div className = "chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Fastext

                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                    </div>

            </div>

            <ChatEngine
            height = "calc(100vh - 66px)"
            projectID = "56d44953-8c58-4273-bb74-8da7aabc3354"
            userName = {user.email}
            userSecret = {user.uid}
            />
        </div>
    );


}


