import axios from "axios";
import React, { useState } from "react";
import { auth, googleAuthProvider } from "./configureMeFirebase";
import { signInWithPopup, User } from "firebase/auth"

export function AuthDemoStart(): JSX.Element {
    const [lastAPIReply, setLastAPIReply] = useState<string>("");
    const [user, setUser] = useState <User | null>();

    async function handleFetchTimeClicked() {
        const reply = await axios.get("http://localhost:4000/");
        setLastAPIReply(reply.data);
    }

    async function handleFetchWisdomClicked() {
        //This SHOULD be hard to get, eventually.
        const reply = await axios.get("http://localhost:4000/wisdom");
        setLastAPIReply(reply.data);
    }

    async function handleSignInClicked() {
        const userCredentials = await signInWithPopup(auth, googleAuthProvider);
        const retrievedUser: User = userCredentials.user;
        setUser(retrievedUser);
    }

    async function handleSignOutClicked() {
        auth.signOut();
        setUser(null);
    }

    return (
        <div>
            <h2>Auth Demo</h2>

            <button onClick={handleSignInClicked}>Sign in</button>
            <button onClick={handleSignOutClicked}>Sign out</button>
                {user?.photoURL && 
                    <>
                        <div>Signed in: {user?.displayName}</div> 
                        <img src={user?.photoURL} alt="userprofileimg" />
                    </>
                }
            <hr />
            <h3>Talk to the API</h3>
            <button onClick={handleFetchTimeClicked}>Fetch Time</button>
            <button onClick={handleFetchWisdomClicked}>Fetch Ancient Wisdom!</button>
            <h4>Last successful reply from API</h4>
            <div>{lastAPIReply}</div>
            <br />
            <i>(also check console for any failures)</i>

            <hr />

        </div>
    );
}

