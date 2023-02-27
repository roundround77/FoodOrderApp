import { Request, Response } from 'express';
import { CustomRequest } from '../interfaces/CustomResponse.interface';
import { removeFile } from '../services/base.service';
import productService from '../services/product.service';
import { responseError, responseSuccess, responseSuccessWithData } from './base.controller';

export class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const data = await productService.getAll(req.query);
      return responseSuccessWithData(res, data);
    } catch (error: any) {
      console.log(error);
      return responseError(res, error.message);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const data = await productService.getById(req.params.id);
      return responseSuccessWithData(res, data);
    } catch (error: any) {
      console.log(error);
      return responseError(res, error.message);
    }
  }

  async create(req: CustomRequest, res: Response) {
    try {
      const data = await productService.create(req.body, req.file?.path);
      if (req.file?.filename) removeFile(req.file?.filename);
      return responseSuccessWithData(res, data);
    } catch (error: any) {
      console.log(error);
      if (req.file?.filename) removeFile(req.file?.filename);
      return responseError(res, error.message);
    }
  }

  async updateById(req: Request, res: Response) {
    try {
      await productService.updateById(req.params.id, req.body, req.file?.path);
      if (req.file?.filename) removeFile(req.file.filename);
      return responseSuccess(res, 'Update product success');
    } catch (error: any) {
      console.log(error);
      if (req.file?.filename) removeFile(req.file.filename);
      return responseError(res, error.message);
    }
  }

  async deleteById(req: Request, res: Response) {
    try {
      await productService.deleteById(req.params.id);
      return responseSuccess(res, 'Delete product success');
    } catch (error: any) {
      console.log(error);
      return responseError(res, error.message);
    }
  }
}
