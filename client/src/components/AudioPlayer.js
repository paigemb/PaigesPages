import {useState} from 'react';
import useSound from 'use-sound';
import heart from '../music/heart.png';



const AudioPlayer = () => {
    
    const [isActive, setIsActive] = useState(false);
    // const [play, {stop}] = useSound(theTunes)
    var src = '../music/theTunes.mp3'
    var song = new Audio('../music/theTunes.mp3');
    song.play();
    

    

    return(
        <>
        <div className = "music-container">
            <img src= {heart} alt="heart"/>
            </div>
            </>
    )
};
export default AudioPlayer