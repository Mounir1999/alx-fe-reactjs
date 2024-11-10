function UserProfile(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>Age: {props.age}</p>
            <p>Bio: {props.bio}</p> {/* Make sure this line is present */}
        </div>
    );
}

export default UserProfile;
