import "./HomePage.css";
import BackgroundSlideshow from "../components/BackgroundSlideshow";

function HomePage() {
    const { rolemodels, isLoading, error } = useRolemodels();
    // will use the api for get rolemodel cards here 

    if (isLoading) {
        return (<p>loading...</p>);
    }

    if (error) {
        return (<p>Error: {error.message}</p>);
    }


    return (
        <>


            {/* Hero Section */}

            <BackgroundSlideshow />
            <div id="app" className="featured_rolemodels">
                <div className="sheinspires_header">
                    <div className="sheinspires_header_description">
                        <h1>She Inspires!</h1>
                        <p>nice content about website in 1-2 sentence</p>
                    </div>
                </div>
            </div>


            {/* Search  bar */}

            {/* sign_buttons (she inspires, to be inspired , ) */}

            {/* rolemodel cards Section */}


        </>
    );
}

export default HomePage;



