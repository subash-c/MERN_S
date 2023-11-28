import {connect} from "react-redux";
import PropTypes from "prop-types";
import auth from "../../reducers/auth";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute =(props) =>{
    console.log(props.auth.isAuthenticated,props.auth.loading)
    return (!props.auth.isAuthenticated && !props.auth.loading)? (<Navigate to={"/login"} />):(<Outlet/>)

}


PrivateRoute.prototype={
    auth: PropTypes.func.isRequired
}
const mapStateToProps = state =>(
    {
        auth:state.auth
    }
)

export default connect(mapStateToProps)( PrivateRoute);