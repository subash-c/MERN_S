import {Navigate, Outlet} from "react-router-dom";
import {connect} from "react-redux";

const ClickingRoute=(props) => {
    console.log("Aloow pass->",props)
    return <>
        {
            props.allowResetPassword?(<Outlet/>):(<Navigate to={"/login"}/>)
        }
    </>
}



const mapStateToProps = state => (
    {
        allowResetPassword:state.auth.allowResetPassword

    }
)

export default connect(mapStateToProps)(ClickingRoute);