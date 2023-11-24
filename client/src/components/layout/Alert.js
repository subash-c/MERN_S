import PropTypes from "prop-types";
import {connect} from "react-redux";

const Alert = ({alerts}) => alerts  && alerts.length > 0 && alerts.map(alert =>
    <div className={`alert alert-${alert.alertType}`} key={alert.id}>
        {alert.msg}
    </div>
)

Alert.propTypes = {
    alerts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    alerts:state.alert
});
export default connect(mapStateToProps)(Alert);