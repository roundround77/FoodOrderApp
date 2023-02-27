import { Request, Response } from 'express';
import { CustomRequest } from '../interfaces/CustomResponse.interface';
import { removeFile } from '../services/base.service';
import restaurantService from '../services/restaurant.service';
import { responseError, responseSuccess, responseSuccessWithData } from './base.controller';

export class RestaurantController {
  async getAll(req: Request, res: Response) {
    try {
      const data = await restaurantService.getAll();
      return responseSuccessWithData(res, data);
    } catch (error: any) {
      console.log(error);
      return responseError(res, error.message);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const data = await restaurantService.getById(req.params.id);
      return responseSuccessWithData(res, data);
    } catch (error: any) {
      console.log(error);
      return responseError(res, error.message);
    }
  }

  async create(req: CustomRequest, res: Response) {
    try {
      const data = await restaurantService.create(req.body, req.file?.path);
      if (req.file?.filename) removeFile(req.file.filename);
      return responseSuccessWithData(res, data);
    } catch (error: any) {
      console.log(error);
      return responseError(res, error.message);
    }
  }

  async updateById(req: Request, res: Response) {
    try {
      await restaurantService.updateById(req.params.id, req.body, req.file?.path);
      if (req.file?.filename) removeFile(req.file.filename);
      return responseSuccess(res, 'Update restaurant success');
    } catch (error: any) {
      console.log(error);
      return responseError(res, error.message);
    }
  }

  async deleteById(req: Request, res: Response) {
    try {
      await restaurantService.deleteById(req.params.id);
      return responseSuccess(res, 'Delete restaurant success');
    } catch (error: any) {
      console.log(error);
      return responseError(res, error.message);
    }
  }
}
