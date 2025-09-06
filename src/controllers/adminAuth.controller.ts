import { NextFunction, Request, Response } from "express";
import { CreateUserDto, LoginUserDto } from "../dtos/users.dto";
import { RequestWithUser } from "../interfaces/auth.interface";
import { User } from "../interfaces/admin.interface";
import AuthService from "../services/adminAut.service";

class AdminAuthController {
  public authService = new AuthService();

  public getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllUsersData = await this.authService.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: "Admins retrieved successfully" });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findUserData = await this.authService.findUserById(userId);
      res.status(200).json({ data: findUserData, message: "Admin retrieved successfully" });
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: "Admin created successfully" });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: LoginUserDto = req.body;
      const { cookie, findUser, token } = await this.authService.login(userData);

      res.setHeader("Set-Cookie", [cookie]);
      res.status(200).json({ 
        data: { user: findUser, token }, 
        message: "Login successful" 
      });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData = { email: req.user.email };
      const logOutData = await this.authService.logout(userData);

      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
      res.status(200).json({ data: logOutData, message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  };

  public updateAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: Partial<CreateUserDto> = req.body;
      const updateAdminData = await this.authService.updateAdmin(userId, userData);
      res.status(200).json({ data: updateAdminData, message: "Admin updated successfully" });
    } catch (error) {
      next(error);
    }
  };

  public deleteAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteAdminData = await this.authService.deleteAdmin(userId);
      res.status(200).json({ data: deleteAdminData, message: "Admin deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default AdminAuthController;
