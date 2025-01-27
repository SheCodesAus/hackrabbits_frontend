import { Link } from "react-router-dom";
// import "./ProjectCard.css";



function RolemodelCard(props) {


    const { rolemodelData } = props;
    const rolemodelLink = `/role-models/public/${rolemodelData.id}`;
    // const image = `${projectData.image_b64}` ?? "";


    return (

        <div className="rolemodel-card">
            <Link to={rolemodelLink}>
                <h3>{rolemodelData.first_name + " " + rolemodelData.last_name} </h3>
                <p>{rolemodelData.current_role}</p>
                <div className="image-wrapper">
                    <img src={rolemodelData.image} alt="rolemodel visual" />
                </div>
            </Link>


        </div>

    );
}

export default RolemodelCard;