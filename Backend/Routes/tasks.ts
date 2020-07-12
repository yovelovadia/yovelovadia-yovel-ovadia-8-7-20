import express, { Request, Response, NextFunction } from "express";
import taskSchema from "../Schemas/tasks";
import checkJWT from "../checkJWT";

const Router = express.Router();
//creating task
Router.post(
  "/create",
  checkJWT,
  (req: Request, res: Response, next: NextFunction) => {
    // takes the data from the jwt and create a task based on the user id("binding" to him)
    const taskName: string = req.body.taskName;
    const userID: string = (<any>req).decoded.userId;
    const task = new taskSchema({
      taskName,
      userID,
    });
    task.save().then(() => {
      res.status(200).json({ message: "Task created" });
    });
  }
);

//getting all tasks
Router.get(
  "/gettasks",
  checkJWT,
  (req: Request, res: Response, next: NextFunction) => {
    const userID: number = (<any>req).decoded.userId;
    const admin: boolean = (<any>req).decoded.admin;
    taskSchema
      .find(admin ? {} : { userID }) // if user is admin he can see all tasks... therefore can mess with them as he wishes... he can also create(will bind to him)
      .select("taskName")
      .then((task) => {
        res.status(200).json({ task, admin });
      })
      .catch(() =>
        res.status(500).json({ error: "Error occured try again later" })
      );
  }
);

//delete task
Router.delete(
  "/:_id",
  checkJWT,
  (req: Request, res: Response, next: NextFunction) => {
    const _id: string = req.params._id;
    taskSchema
      .findByIdAndDelete({ _id })
      .then(() => res.status(200).json({ message: "Task deleted" }));
  }
);

//edit task
Router.put(
  "/edit",
  checkJWT,
  (req: Request, res: Response, next: NextFunction) => {
    const _id: string = req.body._id;
    const taskName: string = req.body.taskName;
    taskSchema.findOneAndUpdate({ _id }, { taskName, _id }).then(() => {
      res.status(200).json({ message: "Task updated" });
    });
  }
);

module.exports = Router;
