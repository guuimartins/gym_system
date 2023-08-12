import { SetMetadata } from '@nestjs/common';

export const Roles = (...args: string[]) => SetMetadata('user.interface.ts', args);
