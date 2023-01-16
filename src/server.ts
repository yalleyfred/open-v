// import App from '@/app';
// import AuthRoute from '@routes/auth.route';
// import AdminAuthRoute from '@routes/admin.route';
// import IndexRoute from '@routes/index.route';
// import CourseRoute from '@routes/course.route';
// import TopicRoute from '@routes/topics.route';
// import validateEnv from '@utils/validateEnv';
// import { DB } from './Database';
import App from "./app";
import IndexRoute from "./routes/index.route";

// validateEnv();
// DB();

const app = new App([ new IndexRoute()]);

app.listen();
