import { Request, Response } from 'express';
import { CustomRequest } from '../interfaces/CustomResponse.interface';
import orderService from '../services/order.service';
import { responseError, responseSuccess, responseSuccessWithData } from './base.controller';

export class OrderController {
  async getAll(req: Request, res: Response) {
    try {
      const data = await orderService.getAll(req.query);
      return responseSuccessWithData(res, data);
    } catch (error: any) {
      console.log(error);
      return responseError(res, error.message);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const data = await orderService.getById(req.params.id);
      return responseSuccessWithData(res, data);
    } catch (error: any) {
      console.log(error);
      return responseError(res, error.message);
    }
  }

  async getByUser(req: CustomRequest, res: Response) {
    try {
      const data = await orderService.getByUser(req.user?.uid);
      return responseSuccessWithData(res, data);
    } catch (error: any) {
      console.log(error);
      return responseError(res, error.message);
    }
  }

  async create(req: CustomRequest, res: Response) {
    try {
      const data = await orderService.create(req.body, req.user);
      return responseSuccessWithData(res, data);
    } catch (error: any) {
      console.log(error);
      return responseError(res, error.message);
    }
  }

  async updateById(req: CustomRequest, res: Response) {
    try {
      await orderService.updateById(req.params.id, req.body, req.user);
      return responseSuccess(res, 'Update order success');
    } catch (error: any) {
      console.log(error);
      return responseError(res, error.message);
    }
  }

  async deleteById(req: Request, res: Response) {
    try {
      await orderService.deleteById(req.params.id);
      return responseSuccess(res, 'Delete order success');
    } catch (error: any) {
      console.log(error);
      return responseError(res, error.message);
    }
  }
}
