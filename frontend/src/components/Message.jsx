import PropTypes from 'prop-types'; 

import { Alert } from 'react-bootstrap';

function Message({ variant, children }) {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    );
}

Message.propTypes = {
    variant: PropTypes.string.isRequired, // Validate variant prop
    children: PropTypes.node.isRequired, // Validate children prop
};

export default Message;
