import { Link } from "react-router-dom";
// import "./ProjectCard.css";



function RolemodelCard(props) {


    const { rolemodelData } = props;
    const rolemodelLink = `/role-models/public/${rolemodelData.id}`;
    // const image = `${projectData.image_b64}` ?? "";


    return (
        <div className="rolemodel-card">
            {/* Card Image */}
            <div className="image-wrapper">
                <img src={rolemodelData.image} alt={`${rolemodelData.first_name}'s visual`} />
            </div>

            {/* Card Content */}
            <div className="rolemodel-content">
                <h3 className="rolemodel-name">{rolemodelData.first_name} {rolemodelData.last_name}</h3>
                <p className="rolemodel-role">{rolemodelData.current_role}</p>
            </div>

            {/* Button */}
            <Link to={rolemodelLink} className="action-button">
                Learn More
            </Link>
        </div>
    );
}

export default RolemodelCard;