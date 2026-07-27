import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { env } from '../../../shared/infra/config/env.config';

export abstract class EmployeeGatewayHttp {
  abstract getById(id: string): Promise<GetEmployeeByIdOutput | null>;
}

@Injectable()
export class EmployeeGateway implements EmployeeGatewayHttp {
  async getById(id: string): Promise<GetEmployeeByIdOutput | null> {
    try {
      const response = await axios.get<GetEmployeeByIdOutput>(
        `${env.urlApi}/employee/${id}`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }
}

export type GetEmployeeByIdOutput = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  deletedAt: Date | null;
};
