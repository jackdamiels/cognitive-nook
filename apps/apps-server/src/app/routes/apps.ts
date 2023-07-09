import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { loadApplications } from '../applications-registry';

loadApplications();

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/apps',
    async function (request: FastifyRequest, reply: FastifyReply) {
      return { message: 'Hello API' };
    }
  );
}
