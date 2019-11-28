import { TimeRanges } from '../constants/constants';

const getTimeRangeByName = (name) => Object.values(TimeRanges).find((r) => r.name === name);

export { getTimeRangeByName };
