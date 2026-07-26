import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { env } from '../../../shared/infra/config/env.config';

export type GetEmployeeByIdOutput = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  deletedAt: Date | null;
};

@Injectable()
export class EmployeeGateway {
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
