import PropTypes from 'prop-types';
import { getMetadateString } from './helpers';

export const Metadata = ({ resultsLength, requestTime }) => (
  <p className="metadata">{getMetadateString(resultsLength, requestTime)}</p>
);

Metadata.propTypes = {
  resultsLength: PropTypes.number.isRequired,
  requestTime: PropTypes.number
};
