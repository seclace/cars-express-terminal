import './pre-start'; // Must be the first import
import { ApiServerApp } from './apps/api-server/api-server-app';

const apiServer = new ApiServerApp();
apiServer.setup().then(server => server.start());
