import { Sequelize } from 'sequelize-typescript';
import Course from "./models/course.model";
import Topic from "./models/topics.model";
import { db_host, db_name, db_password, db_user, DB_PORT, PDB_HOST, PDB_NAME, PDB_PASSWORD, PDB_PORT, PDB_USER } from './config';

const isProduction = process.env.NODE_ENV === 'production';



export const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  port: DB_PORT,
  dialect: "postgres",
  models: [__dirname + "/models"]
})

export const Database = new Sequelize(PDB_NAME, PDB_USER, PDB_PASSWORD, {
  host: PDB_HOST,
  port: PDB_PORT,
  dialect: "postgres",
  models: [__dirname + "/models"],
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
});

export const DB = () => {
    if (isProduction) {
      Database.authenticate()
        .then(async() => {
          console.log("connected to production database successfully!");
          try{
            await Database.sync()
          }catch(error) {
            console.log(error);
            
          }
        })
        .catch((error) => {
          console.log(error);
          
          console.log("DB connection for production failed");
        });
    } else {
      sequelize.authenticate()
        .then(async() => {
          console.log("connected to local database successfully!");

          try{
            await sequelize.sync()
          }catch(error) {
            console.log(error);
            
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("DB connection for local failed");
        });
    }
  };

Course.hasMany(Topic, {
  foreignKey: "course_id",
  as: "topics"
});

Topic.belongsTo(Course, {
  foreignKey: "course_id",
  as: "courses"
})
  