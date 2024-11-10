function UserProfile(props) {
    return (
        <div style={{ border: '1px solid gray', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <h2 style={{ color: 'blue', fontSize: '24px', marginBottom: '5px' }}>{props.name}</h2>
            <p>Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span></p>
            <p style={{ color: 'gray', fontStyle: 'italic' }}>{props.bio}</p>
        </div>
    );
}

export default UserProfile;

