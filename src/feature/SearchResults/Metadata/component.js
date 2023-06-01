import { getMetadateString } from './helpers';
export const Metadata = ({ resultsLength, requestTime = 0.004 }) => (
  <p className="metadata">{getMetadateString(resultsLength, requestTime)}</p>
);
