/**
 *
 * Event handling to connect/emit different components.
 *
 */

import mitt from "mitt";

const eventBus = mitt();
export default eventBus;
