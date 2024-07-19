
const Marker = ({ lat, lng, text }) => {
    return (
        <div style={ {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '18px',
            height: '18px',
            background: '#000',
            border: '2px solid #fff',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)',
        } }>
            { text }
        </div>
    );
}

export default Marker;