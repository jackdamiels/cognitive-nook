import { z } from 'zod';

export type ApplicationName = string;
export type FunctionName = string;
export type AppCallResult = Promise<Record<string, unknown>>;

export interface Application {
  name: ApplicationName;
  description: string;
  functions: {
    [key: FunctionName]: {
      run(data: Record<string, unknown>): AppCallResult;
    };
  };
}

const ApplicationSchema = z.object({
  name: z.string({ required_error: 'Application name is required' }),
  description: z.string({
    required_error: 'application description is required',
  }),
  // TODO(dhudek): type function interface
  functions: z.object({}),
});

export const validateApplicationSchema = (app: unknown) =>
  ApplicationSchema.safeParse(app);
