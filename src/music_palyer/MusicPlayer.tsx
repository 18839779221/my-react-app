import './MusicPlayer.css'
// import 'img/iconfont.js'

export function MusicPlayer(props: {
    className?: string,
}) {
    return (
        <div className={`player-main ${props.className || ""}`}>
        <audio>
            <source>
            </source>
            Your browser does not support the <code>audio</code> element.
        </audio>
    </div>
    );
}